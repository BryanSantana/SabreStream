import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Linking } from 'react-native';

const StripeSetup = () => {
  const [connectedAccountId, setConnectedAccountId] = useState(null);
  const [onboardingUrl, setOnboardingUrl] = useState('');

  const createStripeAccount = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/account', {
        method: 'POST',
      });
      const { account } = await response.json();
      setConnectedAccountId(account);
      console.log(account)
      const onboardingResponse = await fetch('http://localhost:5001/api/account/onboarding_link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountId: account }),
      });

      const { url } = await onboardingResponse.json();
      setOnboardingUrl(url);
      Linking.openURL(url);
    } catch (error) {
      console.error('Error setting up Stripe account:', error);
    }
  };

  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      if (url.includes('refresh')) {
        console.log('Handle refresh here');
      } else if (url.includes('return')) {
        console.log('Handle return here');
      }
    };

    Linking.addEventListener('url', handleDeepLink);

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Up Your Stripe Account</Text>
      <Button title="Sign Up" onPress={createStripeAccount} />
      <Button title="Skip For Now" onPress={() => { }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default StripeSetup;

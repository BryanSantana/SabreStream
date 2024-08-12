import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Linking } from 'react-native';

const StripeSetup = ({navigation, route}) => {
  const [connectedAccountId, setConnectedAccountId] = useState(null);
  const [onboardingUrl, setOnboardingUrl] = useState('');
  const { userId, clubId } = route.params;

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
    const handleDeepLink = (event) => {
      const url = event.url;
      console.log('Deep link URL:', url);

      if (url.startsWith('sabrestream://')) {
        // Handle the deep link here
        if (url.includes('refresh')) {
          Alert.alert('Redirected from the refresh URL');
        } else if (url.includes('return')) {
          navigation.navigate('TierScreen', {
            accountId: connectedAccountId,
            userId,
            clubId,
          });
        }
      }
    };

    // Add event listener for deep linking
    const linkingSubscription = Linking.addEventListener('url', handleDeepLink);

    // Check if the app was opened via deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      // Cleanup the event listener on unmount
      linkingSubscription.remove();  // Use remove() on the subscription object
    };
  }, [connectedAccountId, userId, clubId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Up Your Stripe Account</Text>
      <Button title="Sign Up" onPress={createStripeAccount} />
      <Button title="Skip For Now" onPress={() => { 
      navigation.navigate('TierSetup', {
      connectedAccountId,
      userId,
      clubId
    });
  }} />

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

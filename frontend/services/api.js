const BASE_URL = 'http://localhost:5001/api'; // Replace with your API URL

const registerUser = async (userData) => {
  try {
    console.log(userData)
    link = `${BASE_URL}/users/register`
    const response = await fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    console.log(response)
    if (response.ok){
      const user = await response.json();
      return user;
  } else{
    console.error('Error registering user:', response.statusText);
    throw new Error('Error registering user');
  }
 } catch (error) {
    console.error('Error registering user:', error);
    throw error;
}
}

const registerClub = async (clubData) => {
  try {
    link = `${BASE_URL}/clubs`
    const response = await fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clubData)
    });
    if (response.ok){
      const club = await response.json();
      return club;
  } else{
    console.error('Error registering club:', response.statusText);
    throw new Error('Error registering club');
  }
 } catch (error) {
    console.error('Error registering club:', error);
    throw error;
}
}


const createAnnouncement = async (announcementData) => {
  console.log(announcementData)
  try {
      const response = await fetch(`${BASE_URL}/announcements`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(announcementData)
      });
      console.log(response)
      if (response.ok) {
          const annnouncement = await response.json();
          return annnouncement;
      } else {
          console.error("hereeeee")
          console.error('Error creating announcement:', response.statusText);
          throw new Error('Error creating announcement');
      }
  } catch (error) {
      console.error('Error creating announcement:', error);
      throw error;
  }
};

const getEventsByClubId = async (clubId) => {
    try {
    link = `${BASE_URL}/events/${clubId}`
      const response = await fetch(link, {
        method: 'GET'
      });
      
      if (response.ok) {
        const events = await response.json();
        return events;
      }
     
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  };

  const getAnnouncementsByClubId = async (clubId, userId)=> {
    try{
     link = `${BASE_URL}/announcements/${clubId}?userId=${userId}`
     const response = await fetch (link, {
        method: 'GET'
     });
     if (response.ok) {
        const announcements = await response.json();
        return announcements;
     }
    } catch (error) {
        console.error('Error fetching announcements', error)
    }
      }

      const createEvent = async (eventData) => {
        try {
          console.log(eventData)
            const response = await fetch(`${BASE_URL}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });
    
            if (response.ok) {
                const event = await response.json();
                return event;
            } else {
                console.error('Error creating event:', response.statusText);
                throw new Error('Error creating event');
            }
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    };

   
  const likeAnnouncement = async (likeData) => {
    try {
      const response = await fetch(`${BASE_URL}/announcements/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(likeData)
      });
      if (response.ok) {
        const like = await response.json();
        return like;
      } else {
        throw new Error('Error liking announcement');
      }
    } catch (error) {
      console.error('Error liking announcement:', error);
      throw error;
    }
  };

const unlikeAnnouncement = async (likeData) => {
    try {
      const response = await fetch(`${BASE_URL}/announcements/unlike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(likeData)
      });
      if (response.ok) {
        const unlike = await response.json();
        return unlike;
      } else {
        throw new Error('Error unliking announcement');
      }
    } catch (error) {
      console.error('Error unliking announcement:', error);
      throw error;
    }
  };

  const completeOnboarding = async (stripeAccountId) => {
    try {
      const response = await fetch('http://localhost:5001/api/completeOnboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stripeAccountId,
          userId: currentUser.id, 
          clubId: currentClub.id, 
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to complete onboarding');
      }
  
      const data = await response.json();
      console.log('Onboarding complete:', data);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  export const deleteEvent = async (eventId) => {
    const response = await fetch(`http://localhost:5001/api/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  };
  

  
  export {getEventsByClubId, getAnnouncementsByClubId, createEvent, createAnnouncement, likeAnnouncement, unlikeAnnouncement, registerClub, registerUser, completeOnboarding};

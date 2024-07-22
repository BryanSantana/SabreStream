const BASE_URL = 'http://localhost:5001/api'; // Replace with your API URL


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

  const getAnnouncementsByClubId = async (clubId) => {
    try{
     link = `${BASE_URL}/announcements/${clubId}`
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
  export {getEventsByClubId, getAnnouncementsByClubId};

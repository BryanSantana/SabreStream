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
  
  export {getEventsByClubId, getAnnouncementsByClubId, createEvent, createAnnouncement};

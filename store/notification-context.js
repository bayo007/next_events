import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext({ ///this is needed from the layout component
  notification: null, // { title, message, status }
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

//notification data is an object

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);  // do this function after 3 seconds
      }, 3000);

      return () => {
        clearTimeout(timer);  //clear the timeout function
      };
    }
  }, [activeNotification]); //this runs when the active Notification updates

  //notification data is an object
  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);  //ActiveNotification becomes the data from newsletter-registration
  }

  function hideNotificationHandler() {
    setActiveNotification(null);  //ActiveNotification becomes empty
  }

  const context = {  //this is the context object referring to the create context above
    notification: activeNotification,
    showNotification: showNotificationHandler, //line 15 of  .../component/input/newsleter-registration
    hideNotification: hideNotificationHandler, //the context calls the hudenotificationhandler function as it is stated initially at the top,line 6
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;


//showNotificatio is a context that runs the showNotificationHandler function 
//and this sets the activenotification to the object given to it from newsletter-registration, 
//this object from the newsletter-registration becomes the notificationData.
//the notificationData is passed to the activeNotification and also its key is 'notification' line 40
//this is then accessed in the layout
//the 'notification' ued in the layout has ppties of the showNotification yused in the newslettter-registration
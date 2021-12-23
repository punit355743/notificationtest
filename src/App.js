import { useEffect, useState } from "react";
import OneSignal from "react-onesignal";
import "./App.css";

function App() {

  const [heading,setHeading] = useState('');
  const [content,setContent] = useState('');

  useEffect(() => {
    OneSignal.init({
      appId: "7b91a212-d72b-4465-9c90-ede7bcf0ed3b"
    });

    OneSignal.addListenerForNotificationOpened(() => {
      console.log("hi");
    });

    OneSignal.on("addListenerForNotificationOpened", function (event) {
      console.log("Notification Clicked", event);
    });

    OneSignal.on("notificationDisplay", function (event) {
      console.log("OneSignal notification displayed:", event);
      setHeading(event.heading);
      setContent(event.content);
    });
    OneSignal.on("notificationDismiss", function (event) {
      console.log("OneSignal notification dismissed:", event);
    });
  }, []);

  // OneSignal.on('notificationDisplay', function(event) {
  //   console.warn('OneSignal notification displayed:', event);
  // });

  const onHandleTag = (tag) => {
    console.log("Tagging");
    OneSignal.sendTag("tech", tag).then(() => {
      console.log("tagged");
    });
  };

  return (
    <div className="App">
      <h1> React one signal push notification demo</h1>
      <div className='mycontent-style'>
      <h2><b>Title:</b> {heading} </h2>
      <h2><b>Message:</b> {content} </h2>
      </div>
      <button onClick={() => onHandleTag("react")}>Click</button>
    </div>
  );
}

export default App;

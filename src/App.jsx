import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls,MeshWobbleMaterial } from "@react-three/drei";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { useSpeechSynthesis } from 'react-speech-kit';
import { MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react"
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./components/chat.css";
import { AvatarTalk } from "./components/AvatarTalk";
import { Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { publish } from "./events";
import { Male_jaddu } from "./components/Male_jaddu";
import { LipSyncMen3 } from "./components/LipSyncMen3";
import { HeroModel } from "./components/Hero";
import { AbhishekModel } from "./components/Abhishek";
import { Abhishek2Model } from "./components/Abhishek2";
import { Abhishek3Model } from "./components/Abhishek3";
import { Abhishek4Model } from "./components/Abhishek4";
import { PointLight } from 'three';


function App() {

  const [isanimationduration, asetAnimationDuration] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [typing, setTyping] = useState(false)
  const speak = useSpeechSynthesis({
    onEnd: () => {
      console.log("Ended----------")
      var data = {
        talk: false,
        animationDuration: 0
      }
      publish("startAnimation", data)
    }
  });
  const [messages, setMessages] = useState([
    {
      message: "Chatbot",
      sender: "ChatGPT"
    }
  ])

  const [latestChatGPTMessage, setLatestChatGPTMessage] = useState(null);


  const handlesend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }

    const newMessages = [...messages, newMessage]
    setMessages(newMessages)
    setTyping(true)
    setIsSpeaking(true);

    await processMessageToChatGPT(newMessages)
  }

  async function processMessageToChatGPT(chatMessages) {

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === 'ChatGPT') {
        role = "assistant";

      } else {
        role = "user"
      }
      return { role: role, content: messageObject.message }
    })

    //////////

    const systemMessage = {
      role: "system",
      content: "explain  concepts like 15 years old"
    }

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]

    }

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      console.log(data.choices[0].message.content);

      setMessages(
        [...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }]
      );
      const spokenMessage = data.choices[0].message.content;

      const latestMessage = spokenMessage
      setLatestChatGPTMessage(latestMessage);
      console.log("speak", speak)
      speak.speak({ text: latestMessage })
      const animationDuration = Math.max(1, spokenMessage.length);
      var data = {
        talk: true,
        animationDuration
      }
      publish("startAnimation", data)
      // window.dispatchEvent("startAnimation",animationDuration)

      setTyping(false);
      asetAnimationDuration(animationDuration);
    })


  }
  function onENd() {
    console.log("END")
  }



  return (
    <>
{/* camera={{ position: [0, 4, 10], fov: 50 }} */}
      <Canvas shadows  className="border border-rounded rounded-4"   shadowMap camera={{ position: [0, 4, 10], fov: 50 }}>
        <color attach="background" args={["DarkSlateGray"]} />
        <pointLight position={[10, 10, 10]} castShadow />
        <spotLight position={[0, 6, 0]} intensity={1} angle={Math.PI / 4} penumbra={0.8} castShadow={true} />
        <ambientLight />
       {/* <OrbitControls/> */}
        <Suspense fallback={null}>
          <mesh >
          <MeshWobbleMaterial
          color="white"
          speed={1}
          factor={0.6}
        />
            {/* <AvatarTalk shouldTalk={isSpeaking} setAnimationDuration={isanimationduration}   /> */}
           {/* <Abhishek2Model  shouldTalk={isSpeaking} setAnimationDuration={isanimationduration}  scale={2}/> */}
           <Abhishek4Model shouldTalk={isSpeaking} setAnimationDuration={isanimationduration} position={[0,0.5,.9,8]} scale={2}/>
           {/* <Abhishek3Model  shouldTalk={isSpeaking} setAnimationDuration={isanimationduration} scale={2} /> */}
            {/* <Male_jaddu position={[0,3,.6,5]} scale ={28}/> */}
            {/* <LipSyncMen3 shouldTalk={isSpeaking} setAnimationDuration={isanimationduration} scale={22}/> */}
            {/* <HeroModel shouldTalk={isSpeaking} setAnimationDuration={isanimationduration} scale={22}/> */}
          </mesh>
        </Suspense>
        
        <Environment preset='sunset' />

        <Html position={[-1.7, 0, 2]}  >
          <div  className="maindiv" >
               <MessageList typingIndicator={typing ? <TypingIndicator content="...typing" /> : null } style={{backgroundColor:"DarkSlateGray"}} >
                  {messages.map((message,i)=>{
                    return <Message key={i} model={message}/>
                  })}
                </MessageList>
                <MessageInput placeholder="Ask your Query---" onSend={handlesend} className="my-message-input"  />
          </div>
          {/* <div className="maindiv"> */}
            {/* Replace MessageList with a custom div for displaying messages */}
            {/* <div className="custom-message-list" style={{ backgroundColor: "DarkSlateGray" }}>
              {messages.map((message, i) => {
                return <div key={i} className="custom-message"><div className="sender">{message.sender} </div> <div className="reply">{message.message}</div></div>;
              })}
            </div> */}

            {/* Display a custom typing indicator div based on the 'typing' state */}
            {/* {typing && <div className="custom-typing-indicator">...typing</div>} */}

            {/* Replace MessageInput with a custom input for sending messages */}
            {/* <input
              type="text"
              placeholder="Ask your Query---"
              onKeyPress={(e) => e.key === "Enter" && handlesend(e.target.value)}
              className="my-message-input"
            />
          </div> */}
        </Html>
      </Canvas>



    </>

  );
}

export default App;

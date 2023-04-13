import Image from 'next/image';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {ChatList, Button, Input, MessageBox} from 'react-chat-elements';
import {useRouter} from 'next/router';
import ChatServices from '../../services/ChatServices';
import {AiFillInfoCircle} from 'react-icons/ai';
import {ImCross} from 'react-icons/im';
import logo from '../../../public/logo/jjmall_logo.png';
import chatGroup from '../../../public/chat-group-icon.png';
import InputMessages from '@component/Messages/InputMessages';
import Loading from '@component/preloader/Loading';
import {SidebarContext} from '@context/SidebarContext';

import {io} from 'socket.io-client';

import {UserContext} from '@context/UserContext';
import axios from 'axios';
import NavBarTop from '@layout/navbar/NavBarTop';
import Navbar from '@layout/navbar/Navbar';
import MobileChat from '@component/Messages/MobileChat';
import DesktopChat from '@component/Messages/DesktopChat';
import MobileFooter from '@layout/footer/MobileFooter';

const chat = () => {
  // variable
  let socket = useRef(undefined);
  const scrollRef = useRef();
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [newMessage, setMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [showMembers, setShowMembers] = useState(null);
  const [persons, setPersons] = useState([]);
  const [sent, setSent] = useState(false);
  const [image, setImage] = useState(null);
  const [messageAssets, setMessageAssets] = useState([]);

  const {
    state: {userInfo},
  } = useContext(UserContext);

  const {isLoading, setIsLoading} = useContext(SidebarContext);

  // functions

  //get all conversations
  const getAllChats = async () => {
    try {
      const response = await ChatServices.getAllChats();
      response.data.map(cvs => {
        if (cvs.messages.find(msg => msg?.user?.username === userInfo?.user?.username)) {
          console.log("j'ai trouvé");
          if (!conversations.find(elt => elt.id === cvs.id)) {
            setConversations(prev => [...prev, cvs]);
          }
        } else {
          console.log("je n'ai pas trouvé");
        }
      });
      // console.log('response for conversations', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // open a conversations
  const openChat = async cvs => {
    setShowMembers(null);
    setCurrentChat(cvs);
    // console.log('cvs id ', cvs.id);
    try {
      const response = await ChatServices.getChatById(cvs.id);
      setMessages(msgs => response.data.messages);

      const responseAssets = await ChatServices.getAllMessageAssets();
      setMessageAssets(responseAssets.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    members(cvs.id);
  };

  // get members of a chat
  const members = async id => {
    try {
      const response = await ChatServices.getPersonsInChat(id);
      setPersons(response.data.data);
      // console.log('person response', response.data.da);
    } catch (error) {
      console.log(error);
    }
  };

  // hide the list of the people in a chat
  const hideMembers = () => {
    setShowMembers(null);
  };

  // send a message
  const sendMessage = async (message, file, chat_code) => {
    if (message) {
      // console.log('func sendMessage', message);
      socket.current.emit('sendMessage', {data: {message, chat_code}}, error => {
        //Sending message to the backend
        if (error) {
          console.log('on emit send message', error);
        }
      });
      setMessage('');
      setSent(true);
    } else if (file) {
      try {
        // console.log('file data ', file);
        let fileData = new FormData();
        let dataJson = {message: 640};
        fileData.append('files.paths', file);
        fileData.append('data', JSON.stringify(dataJson));
        const response = await ChatServices.sendMessageAsset(fileData);
        let message_assets_id = response.data.id;
        // console.log('fileId response ', message_assets_id);
        socket.current.emit('sendMessage', {data: {message: 'file message', chat_code, message_assets_id}}, error => {
          //Sending message to the backend
          if (error) {
            console.log('on emit send media', error);
          }
        });
      } catch (error) {
        console.log('massah !', error);
      }

      // const formDataArray = Array.from(formData.entries());
      // console.log('formdata ', formDataArray);
    } else {
      alert("Message can't be empty");
    }
    setImage(null);
  };

  // handle input changes
  const handleChange = e => {
    setMessage(e.target.value);
  };

  // scroll on send msg
  useEffect(() => {
    if (isLoading) {
      return;
    } else {
      if (scrollRef.current) {
        const scrollHeight = scrollRef.current.scrollHeight;
        const clientHeight = scrollRef.current.clientHeight;
        const maxScrollTop = scrollHeight - clientHeight;
        const newScrollTop = maxScrollTop + 50; // Scroll down an additional 100 pixels
        scrollRef.current.scrollTo({top: newScrollTop, behavior: 'smooth'});
        // scrollRef.current?.scrollIntoView({behavior: 'smooth'});
      }
    }
  }, [messages, currentChat, messageAssets, scrollRef?.current?.scrollHeight]);

  useEffect(() => {
    if (!userInfo) {
      router.push('/');
    } else {
      // socket.current = io(process.env.NEXT_PUBLIC_API_BASE_JJMALL_URL?.replace('/api', ''), {
      //   auth: {token: userInfo?.jwt},
      // }); //Connecting to socket.io backend

      socket.current = io('https://api.jjmall.store', {
        auth: {token: userInfo?.jwt},
      }); //Connecting to socket.io backend

      getAllChats();

      // socket.current.
      socket.current.on('error', error => console.log('socket manager error', error));

      socket.current.on('message', async data => {
        //Listening for a message connection
        // console.log('the message sent to group suscribers', data);
        // console.log('test currentChat on Message ', currentChat);
        // setMessages(prev => [...prev, {...data}]);
        try {
          // console.log('currentchat id ', currentChat.id);
          setIsLoading(true);
          const response = await ChatServices.getChatById(currentChat?.id);
          setMessages(response.data.messages);

          const responseAssets = await ChatServices.getAllMessageAssets();
          setMessageAssets(responseAssets.data);

          setIsLoading(false);
          // console.log('new messages on message ', messages);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      });
    }

    // return () => {
    //   if (socket.current) socket.current.disconnect();
    // };
  }, [sent, currentChat, messageAssets]);

  return (
    <>
      <DesktopChat
        messages={messages}
        newMessage={newMessage}
        conversations={conversations}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        showMembers={showMembers}
        setShowMembers={setShowMembers}
        persons={persons}
        image={image}
        setImage={setImage}
        messageAssets={messageAssets}
        handleChange={handleChange}
        sendMessage={sendMessage}
        hideMembers={hideMembers}
        openChat={openChat}
        isLoading={isLoading}
        userInfo={userInfo}
      />
      <MobileChat
        messages={messages}
        newMessage={newMessage}
        conversations={conversations}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        showMembers={showMembers}
        setShowMembers={setShowMembers}
        persons={persons}
        image={image}
        setImage={setImage}
        messageAssets={messageAssets}
        handleChange={handleChange}
        sendMessage={sendMessage}
        hideMembers={hideMembers}
        openChat={openChat}
        isLoading={isLoading}
        userInfo={userInfo}
      />
      <MobileFooter />
    </>
  );
};

export default chat;

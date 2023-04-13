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
      setConversations(response.data);
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
    // <Layout title="chat" description="This is chat page">
    <div className="flex flex-col h-screen">
      <>
        <NavBarTop />
        <Navbar />
      </>
      <div className="bg-white w-screen overflow-x-hidden h-full flex">
        {/* chatlist-container */}
        <div className="flex-auto md:w-1/3 lg:border-b md:border-[#288a36] md:border-b-0 xl:flex-shrink-0 md:border-r bg-white h-auto">
          <div className="flex items-center gap-3 p-2 mb-1 cursor-pointer bg-[#288a36]">
            <div className="h-8 sm:h-12 w-8 sm:w-12 rounded-full overflow-hidden  flex items-center justify-center">
              <Image src={logo} width={'100%'} height={'100%'} />
            </div>
            <span className="text-[1rem] text-white font-bold">JJMALL</span>
          </div>
          {conversations.map((cvs, id) => {
            return (
              <div onClick={() => openChat(cvs)} key={id}>
                <ChatList
                  dataSource={[
                    {
                      avatar: 'https://cdn.pixabay.com/photo/2020/05/29/13/26/icons-5235125_960_720.png',
                      alt: 'Group',
                      title: cvs.code,
                      subtitle: cvs.messages[0].message,
                      date: new Date(),
                      unread: cvs.messages.length,
                    },
                  ]}
                />
              </div>
            );
          })}
        </div>

        {/* chatbox */}
        <div className={`hidden h-full md:flex-auto md:w-2/3 md:justify-btween md:flex-col md:flex`}>
          {/* topbar chat */}
          {currentChat && (
            <div className="flex sm:items-center justify-between py-3 border-b border-gray-200 p-3 pl-4">
              <div className="flex items-center space-x-4 ">
                <div className="flex items-center justify-center h-12 sm:h-14 w-12 sm:w-14 p-1 border rounded-full border-gray-300">
                  <Image width={'100%'} height={'100%'} src={chatGroup} className="rounded-full cursor-pointer" />
                </div>

                <div className="flex flex-col leading-tight">
                  <div className="mt-1 text-[1.2rem] flex items-center">
                    <span className="text-gray-700 mr-3">{currentChat?.code}</span>
                    <span className="text-green-500">
                      <svg width={10} height={10}>
                        <circle cx={5} cy={5} r={5} fill="currentcolor" />
                      </svg>
                    </span>
                  </div>
                  <div className="w-[16rem] overflow-hidden flex">
                    <div className="w-4/5 overflow-hidden">
                      {persons.map((person, i) => (
                        <span className="text-[.6rem] ml-[.3rem]">
                          {person?.attributes?.user?.data?.attributes?.person?.data?.attributes?.first_name},
                        </span>
                      ))}
                    </div>
                    <div className="w-1/5">
                      <span className="ml-[.1rem] text-[.5rem]">...</span>
                    </div>
                  </div>
                </div>
              </div>
              <div onClick={() => setShowMembers(true)}>
                <AiFillInfoCircle className="text-[2rem] text-[#288a36] cursor-pointer" />
              </div>
            </div>
          )}

          {currentChat ? (
            <>
              {/* messages */}
              <div className="flex  flex-col w-full overflow-y-auto bg-white" ref={scrollRef}>
                {showMembers && (
                  <div className="flex flex-col absolute w-80 h-96 mb-2 overflow-y-auto rounded shadow-lg bg-gray-100 top-[13rem] right-20 z-10">
                    <div className="text-center text-[1.3rem] py-4 mb-2 sticky top-0 w-full text-gray-500 p-2 border-b border-gray-300 bg-white">
                      {persons.length} Members
                      <div className="absolute top-3 right-3" onClick={() => hideMembers()}>
                        <ImCross className="text-red-600 text-[1rem] cursor-pointer z-20" />
                      </div>
                    </div>
                    {persons.map((person, i) => (
                      <div className="flex items-center gap-3 border-b border-emerald-200 mb-1 p-1 px-2 cursor-pointer" key={i}>
                        <span className="leading-none font-bold font-serif text-white h-8 sm:h-10 w-8 sm:w-10 rounded-full bg-emerald-500 flex items-center justify-center">
                          {person?.attributes?.user?.data?.attributes.person.data.attributes.first_name[0]}
                        </span>
                        <span className="text-[1rem] text-gray-700">
                          {person?.attributes?.user?.data?.attributes?.person?.data.attributes.first_name +
                            ' ' +
                            person?.attributes?.user?.data.attributes.person.data.attributes.last_name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {messages.map((message, i) => {
                  let assetUrl = [];
                  if (message?.message_assets?.length > 0) {
                    assetUrl = messageAssets.filter(elt => elt.id === message?.message_assets[0]?.id);

                    if (
                      message?.message_assets[0]?.id === assetUrl[0]?.id &&
                      assetUrl[0]?.attributes?.paths.data[0].attributes.formats !== null
                    ) {
                      return (
                        <div key={i}>
                          <MessageBox
                            position={message?.user?.username === userInfo?.user?.username ? 'right' : 'left'}
                            type={'photo'}
                            title={
                              message?.user?.person?.first_name
                                ? message?.user?.person?.first_name + ' ' + message?.user?.person?.last_name
                                : ''
                            }
                            data={{
                              uri: assetUrl[0]?.attributes?.paths.data[0].attributes.formats?.small?.url,
                            }}
                          />
                        </div>
                      );
                    }

                    if (
                      message?.message_assets[0]?.id === assetUrl[0]?.id &&
                      assetUrl[0]?.attributes?.paths.data[0].attributes.formats === null
                    ) {
                      return (
                        <div key={i}>
                          <MessageBox
                            position={message?.user?.username === userInfo?.user?.username ? 'right' : 'left'}
                            type={'video'}
                            title={
                              message?.user?.person?.first_name
                                ? message?.user?.person?.first_name + ' ' + message?.user?.person?.last_name
                                : ''
                            }
                            data={{
                              videoURL: assetUrl[0]?.attributes?.paths.data[0].attributes.url,
                              status: {
                                click: true,
                                loading: 0.5,
                                download: true,
                              },
                            }}
                          />
                          {/* <>
                            <MessageBox
                              position={message?.user?.username === userInfo?.user?.username ? 'right' : 'left'}
                              title={
                                message?.user?.person?.first_name
                                  ? message?.user?.person?.first_name + ' ' + message?.user?.person?.last_name
                                  : ''
                              }
                              type="text"
                              text={` message?.message ${assetUrl[0]?.attributes?.paths.data[0].attributes.url}`}
                              date={message?.createdAt}
                            />
                          </> */}
                        </div>
                      );
                    }
                  }

                  return (
                    <div key={i}>
                      <MessageBox
                        position={message?.user?.username === userInfo?.user?.username ? 'right' : 'left'}
                        title={
                          message?.user?.person?.first_name
                            ? message?.user?.person?.first_name + ' ' + message?.user?.person?.last_name
                            : ''
                        }
                        type="text"
                        text={message?.message}
                        date={message?.createdAt}
                      />
                    </div>
                  );
                })}
                {/* <div ref={scrollRef} /> */}
              </div>

              <div className={` ${currentChat ? '' : 'pointer-events-none select-none'} flex items-center bg-gray-300 p-1`}>
                <div className="typing-area w-full bg-white  h-14 pr-4 ">
                  {/* <Input placeholder="" multiline={true} onChange={handleChange} defaultValue={''} /> */}
                  {/* <Button text={'Send'} onClick={() => sendMessage(newMessage, currentChat.code)} title="Send" /> */}
                  <InputMessages
                    value={newMessage}
                    handleChange={handleChange}
                    sendMessage={sendMessage}
                    chatCode={currentChat.code}
                    setCurrentChat={setCurrentChat}
                    currentChat={currentChat}
                    image={image}
                    setImage={setImage}
                  />
                </div>
              </div>
            </>
          ) : (
            <span className="md:text-[2rem] md:text-green-500 md:text-center md:m-auto">No conversations opened</span>
          )}
        </div>
      </div>
    </div>
    // </Layout>
  );
};

export default chat;

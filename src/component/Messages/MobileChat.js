import Image from 'next/image';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {ChatList, Button, Input, MessageBox} from 'react-chat-elements';
import {AiFillInfoCircle} from 'react-icons/ai';
import {ImCross} from 'react-icons/im';
import logo from '../../../public/logo/jjmall_logo.png';
import chatGroup from '../../../public/chat-group-icon.png';
import InputMessages from '@component/Messages/InputMessages';

const MobileChat = ({
  messages,
  newMessage,
  conversations,
  currentChat,
  setCurrentChat,
  showMembers,
  setShowMembers,
  persons,
  image,
  setImage,
  messageAssets,
  handleChange,
  sendMessage,
  hideMembers,
  openChat,
  isLoading,
  userInfo,
}) => {
  const scrollRef = useRef();
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
  return (
    <div className="md:hidden max-w-screen-md overflow-x-hidden flex items-center gap-7 h-screen">
      <div className="w-[200vw] flex items-center justify-between relative h-full">
        <div className={`w-screen absolute top-0 ${currentChat ? ' left-[-120vh]' : ' left-0'}`}>
          {/* chatlist-container */}
          <div className=" bg-white h-auto w-full">
            <div className="flex items-center gap-3 p-3 mb-1 cursor-pointer bg-[#288a36]">
              <div className="h-11 sm:h-12 w-11 sm:w-12 rounded-full overflow-hidden  flex items-center justify-center">
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
        </div>

        <div className={`w-screen h-full flex flex-col items-center absolute ${currentChat ? ' right-0' : ' right-[-120vh]'}`}>
          {/* topbar chat */}
          {currentChat && (
            <div className="flex items-center border-b border-gray-200 p-2 w-full fixed top-0 z-20 bg-white">
              <div className="flex items-center justify-between w-[90%] pl-5">
                <div className="w-1/5">
                  <div className="flex items-center justify-center h-10 w-10 border rounded-full border-gray-300">
                    <Image
                      width={'100%'}
                      height={'100%'}
                      src={'https://cdn.pixabay.com/photo/2020/05/29/13/26/icons-5235125_960_720.png'}
                      className="rounded-full cursor-pointer w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-col leading-tight w-4/5">
                  <div className="mt-1 text-[1.2rem] flex items-center">
                    <span className="text-gray-700 mr-2 text-[1rem]">{currentChat?.code}</span>
                    <span className="text-green-500">
                      <svg width={10} height={10}>
                        <circle cx={5} cy={5} r={5} fill="currentcolor" />
                      </svg>
                    </span>
                  </div>
                  <div className="overflow-x-hidden flex items-center justify-start w-full">
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
              <div className="w-[10%]" onClick={() => setShowMembers(true)}>
                <AiFillInfoCircle className="text-[1rem] text-[#288a36] cursor-pointer" />
              </div>
            </div>
          )}

          {currentChat ? (
            <>
              {/* messages */}
              <div className="flex flex-col w-full overflow-y-auto bg-white relative pt-20 pb-2" ref={scrollRef}>
                {showMembers && (
                  <div className="flex flex-col fixed z-20 w-60 h-[20rem] mb-2 overflow-y-auto rounded shadow-lg bg-gray-100 top-[2rem] right-5">
                    <div className="text-center text-[1rem] mb-2 sticky top-0 w-full text-gray-500 p-2 border-b border-gray-300 bg-white">
                      {persons.length} Members
                      <div className="absolute top-3 right-3" onClick={() => hideMembers()}>
                        <ImCross className="text-red-600 text-[1rem] cursor-pointer z-20" />
                      </div>
                    </div>
                    {persons.map((person, i) => (
                      <div className="flex items-center gap-2 border-b border-emerald-200 mb-1 p-1 cursor-pointer" key={i}>
                        <span className="leading-none font-bold font-serif text-white h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
                          {person?.attributes?.user?.data?.attributes.person.data.attributes.first_name[0]}
                        </span>
                        <span className="text-[.7rem] text-gray-700">
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

              <div className={` ${currentChat ? '' : 'pointer-events-none select-none'} flex items-center bg-gray-300 p-1 w-screen mb-16`}>
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
            <span className="md:text-[1rem] md:text-green-500 md:text-center md:m-auto">No conversations opened</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileChat;

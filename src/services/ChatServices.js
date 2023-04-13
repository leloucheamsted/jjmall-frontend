import axios from 'axios';
import requests from './httpJJmallServices';

const ChatServices = {
  getAllChats() {
    return requests.get('/chats');
  },
  getChatById(id) {
    return requests.get(`/chats/${id}`);
  },
  getUsersInChat(id) {
    return requests.get(`/chats-has-users?filters[chat][id]=${id}&populate[0]=user`);
  },

  getPersonsInChat(id) {
    let config = {
      url: `${process.env.NEXT_PUBLIC_API_BASE_JJMALL_URL}/chats-has-users?filters[chat][id]=${id}&populate[user][populate]=person`,
      method: 'get',
      headers: {
        Authorization:
          'Bearer 014bdef5ea89115ae1b9a0dc983138b953916407e066d0e1633b6fc68f4ab79e96d6b9ece046c8893306f47fc4ee55447c130fa69fc45de69927d7db8b21134c4d2fd710bc9d96b46e826681d1dd1ab4222cb1a932dfbaca81ac44cac77abff7332cf10b5453e133f691d2b68c10d27d4f10111c7eeac661e8ae4da419903bd0',
      },
    };
    // return requests.get(`/chats-has-users?filters[chat][id]=${id}&populate[user][populate]=person`);
    return axios(config);
  },

  getMessagesInChat(id) {
    return requests.get(
      `/messages?filters[chat][id]=${id}&pagination[pageSize]=200&populate[message_assets][populate]=paths&populate=user`,
    );
  },

  getAllMessageAssets() {
    return requests.get(`/message-assets?populate=paths&pagination[pageSize]=200`);
  },

  sendMessageAsset(fileData) {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    return requests.post('/message-assets', fileData, headers);
  },
};

export default ChatServices;

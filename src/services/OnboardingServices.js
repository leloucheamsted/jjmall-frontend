import requests from './httpJJmallServices';

const OnboardingServices = {
  
  userLogin(body) {
    let headers={"Accept": "application/json","Content-Type":"application/json"};
    return requests.post('/auth/local', body,headers);
  },

  verifyEmailAddress(body) {
    return requests.post('/auth/send-email-confirmation', body);
  },

  // userRegister(token, body) {
  //   return requests.post(`/auth/local/register/${token}`, body);
  // },
  userRegister(body) {
    let headers={"Accept": "application/json","Content-Type":"application/json"};
    return requests.post('/auth/local/register', body,headers);
  },
  signUpWithProvider(body) {
    return requests.post('/auth/local/register', body);
  },
  addProduct(body) {
    let headers={"Accept": "application/json","Content-Type":"application/json"};
    return requests.post('/products', body,headers);
  },
  addPerson(body) {
    return requests.post('/peoples', body);
  },
  getPersonByUser(userId){
    return requests.get(`/peoples?filters[user][id]=${userId}&populate[]=user&populate[]=picture`);
  },
  updatePerson(id,body){
    return requests.put(`/peoples/${id}`,body);
  },
  addAnswer(body) {
    return requests.post('/answers', body);
  },
  addSecurityQuestion(body) {
    return requests.post('/security-questions', body);
  },
  forgetPassword(body) {
    return requests.post('/auth/forgot-password', body);
  },

  resetPassword(body) {
    return requests.post('/auth/reset-password', body);
  },
  confirmationCode(body){
    return requests.post('auth/confirmation',body)
    // return requests.get(`/confirmations?filters[code]=${dico['code']}&filters[type]=${dico['type']}&filters[status]=new`);
  },
  changePassword(body,token) {
    let headers={headers:{
      "Accept":"application/json",
      "Authorization":`Bearer ${token}`,
      "Content-Type":"application/json"
    }};
    return requests.post('/auth/change-password', body,headers);
  },

  updateUser(id, body) {
    return requests.put(`/users/${id}`, body);
  },
};

export default OnboardingServices;
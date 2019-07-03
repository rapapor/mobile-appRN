import axios from 'axios';

class API {
  constructor(apiURL) {
    this.baseURL = apiURL
    this.state = {
      token: '',
    }
  }

  login(user){
    return axios.post(`${this.baseURL}/auth/`,
    user)
    .then(res => {
      return res.data
    }).catch(error => {
      return error
    })
  }

  getInfo(token) {
    return axios.get(`${this.baseURL}/userInfo`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      }).catch(error => {
        return error
      })
  }
  createAlert(token, propertyId, dataToSend ){
    return axios.post(`${this.baseURL}/properties/${propertyId}/alerts`,dataToSend, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      }})
      .then(res => {
        return res
      }).catch(error => {
        return error
      })
  }
}
function createAPI() {
  const apiURL = 'https://ffr-api.herokuapp.com'
  return new API(apiURL);
}

const api = createAPI();
export default api;

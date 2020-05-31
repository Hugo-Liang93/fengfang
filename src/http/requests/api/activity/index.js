import axios from '../../../axios/index.js'

export default {
  saveActivity (activity) {
    return axios.post('api/Activity/saveInfo', activity)
  },
  getActivityByCompany (company) {
    return axios.get('api/Activity/getActivityByCompany', company)
  }
}
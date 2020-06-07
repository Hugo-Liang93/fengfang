import axios from '../../../axios/index.js'

export default {
  saveActivity (activity) {
    return axios.post('api/Activity/saveInfo', activity)
  },
  getActivityByCompany (company) {
    return axios.post('api/Activity/getActivityByCompany', company)
  },
  listActivity () {
    return axios.get('api/Activity/listActivity')
  },
  updateActivity (activity) {
    return axios.post('api/Activity/updateInfo', activity)
  },
  removeActivityById (activityId) {
    return axios.post('api/Activity/deleteInfo', activityId)
  }
}
import axios from '../../../axios/index.js'

export default {
  saveAccountInfo (user) {
    return axios.post('api/user-management/userAccountInfo', user)
  },
  saveUserInfo (user) {
    return axios.post('api/user-management/userUserInfo', user)
  },
  saveUserSocialInfo (user) {
    return axios.post('api/user-management/userUserSocialInfo', user)
  },
  clockIn (clockIn) {
    return axios.post('api/user/clockin', clockIn)
  },
  getClockInListByMonth (userId) {
    return axios.get(`api/user/clockin/${userId}`)
  },
  addUser (user) {
    return axios.post('api/user-management/user-add', user)
  },
  removeUser (user_id) {
    return axios.get(`api/user-management/user-del/${user_id}`)
  },
  uploadAvatar (param, user_id) {
    return axios.post(`api/user-management/upload/avatar/${user_id}`, param)
  },
  getTodayClockInList (user_id) {
    return axios.get(`/api/clockin/getTodayClockin/${user_id}`)
  },
  getRoles () {
    return axios.get('api/filter/get-roles')
  },
  getCompanys () {
    return axios.get('api/filter/get-companys')
  },
  getDepts () {
    return axios.get('api/filter/get-depts')
  }
}

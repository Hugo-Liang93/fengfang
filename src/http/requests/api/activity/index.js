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
  },
  getCommentByActivityId (activityId) {
    return axios.get(`api/Activity/comment/${activityId}`)
  },
  getLikePostByActivityId (activityId) {
    return axios.get(`api/Activity/likepost/${activityId}`)
  },
  changeLiked (activityId, user_id) {
    return axios.get(`api/Activity/changelinked/${activityId}/${user_id}`)
  },
  postMsg (activityId, user_id, commentbox) {
    return axios.post(`api/Activity/postComment/${activityId}/${user_id}`, {'comment': commentbox})
  },
  getAllComment () {
    return axios.get('api/Activity/getComments')
  },
  updateCommentStatus (type, obj) {
    return axios.post(`api/Activity/Comments/${type}`, obj)
  },
  delComment (obj) {
    return axios.post('api/Activity/delComment', obj)
  }
}
import activityAPI from '../../http/requests/api/activity/index.js'

export default {
  getActivityByCompany ({ commit }, company) {
    return new Promise((resolve, reject) => {
      activityAPI.getActivityByCompany(company)
        .then((response) => {
          commit('SET_ACTIVITY_LIST', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeActivity ({ commit }, activityId) {
    return new Promise((resolve, reject) => {
      activityAPI.removeActivityById(activityId).then((response) => {
        commit('REMOV_ACTIVITY', activityId)
        resolve(response)
      }).catch((error) => { reject(error) })
    })
  }
}
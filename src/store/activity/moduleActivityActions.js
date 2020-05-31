import userAPI from '../../http/requests/api/user/index.js'

export default {
  clockIn (context, clockIn) {
    return new Promise((resolve, reject) => {
      console.log(clockIn)
      userAPI.clockIn(clockIn)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  clickInListByMonth ({ commit }, user_id) {
    return new Promise((resolve, reject) => {
      userAPI.getClockInListByMonth(user_id)
        .then((response) => {
          //调用在获取所有用户数据的时候
          commit('SET_CLOCKIN_LIST', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
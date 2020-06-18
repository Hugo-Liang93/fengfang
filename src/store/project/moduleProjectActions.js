import projectAPI from '../../http/requests/api/project/index.js'

export default {
  listProject ({ commit }) {
    return new Promise((resolve, reject) => {
      projectAPI.listProject()
        .then((response) => {
          commit('SET_PROJECT_LIST', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  listDetail ({ commit }) {
    return new Promise((resolve, reject) => {
      projectAPI.getDetail()
        .then((response) => {
          commit('SET_DETAIL_LIST', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeProject ({ commit }, projectId) {
    return new Promise((resolve, reject) => {
      projectAPI.removeProject(projectId).then((response) => {
        commit('REMOV_PROJECT', projectId)
        resolve(response)
      }).catch((error) => { reject(error) })
    })
  },
  removeDetail ({ commit }, detailId) {
    return new Promise((resolve, reject) => {
      projectAPI.removeDetail(detailId).then((response) => {
        commit('REMOV_DETAIL', detailId)
        resolve(response)
      }).catch((error) => { reject(error) })
    })
  }
}
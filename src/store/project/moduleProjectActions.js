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
  removeProject ({ commit }, projectId) {
    return new Promise((resolve, reject) => {
      projectAPI.removeProject(projectId).then((response) => {
        commit('REMOV_PROJECT', projectId)
        resolve(response)
      }).catch((error) => { reject(error) })
    })
  }
}
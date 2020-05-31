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
  }
}
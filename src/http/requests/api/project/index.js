import axios from '../../../axios/index.js'

export default {
  initProject (project) {
    return axios.post('api/project/initProject', project)
  },
  listProject () {
    return axios.post('api/project/listProject')
  }
}
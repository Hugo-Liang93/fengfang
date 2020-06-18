import axios from '../../../axios/index.js'

export default {
  initProject (project) {
    return axios.post('api/project/initProject', project)
  },
  updateProject (project) {
    return axios.post('api/project/updateProject', project)
  },
  listProject () {
    return axios.get('api/project/listProject')
  },
  getFilesByProjectId (projectId) {
    return axios.get(`/api/project/getFiles/${projectId}`)
  },
  downLoadFile (fileName) {
    return axios.post('/api/download/', fileName, {responseType: 'blob'})
  },
  getPic () {
    return axios.get('/api/project/getPic/')
  },
  removeProject (projectId) {
    return axios.post('/api/project/delete', projectId)
  },
  saveDetail (detail) {
    return axios.post('api/Detail/saveDetail', detail)
  },
  getDetail () {
    return axios.get('/api/Detail/getDetail')
  },
  removeDetail (detailId) {
    console.log(detailId)
    return axios.post('/api/Detail/delete', detailId)
  }
}
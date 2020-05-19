import axios from '../../axios.js'
import router from '../../router.js'

axios.interceptors.response.use(function (response) {
  return response 
}, function (error) {
  const { response } = error
  if (response && response.status === 401) {
    router.push('/pages/login')
  }
  return Promise.reject(error)
})
    
export default axios

// axios
import axios from 'axios'

//'http://localhost:8080'
const baseURL = ''

export default axios.create({
  baseURL,
  // You can add your headers here
  headers: { 'Content-Type':'application/json'}
})

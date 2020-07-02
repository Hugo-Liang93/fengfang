// axios
import axios from 'axios'

//'http://localhost:8080'
const baseURL = 'http://localhost:8080'

export default axios.create({
  baseURL,
  // You can add your headers here
  headers: { 'Content-Type':'application/json'}
})

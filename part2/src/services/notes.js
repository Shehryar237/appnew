import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

//note: newObject is not currecnty utilized, just here for future proof.
const update = (id, newObject) => {
  const request = axios.patch(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)//response.data will be note passed from backen app.patch
}
//update will return us note itself

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}
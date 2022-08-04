import http from '../interface'
export default {
  get(url,data){
    return http({url,data,method:'GET'})
  },
  post(url,data){
    return http({url,data,method:'POST'})
  },
  put(url,data){
    return http({url,data,method:'PUT'})
  }
}
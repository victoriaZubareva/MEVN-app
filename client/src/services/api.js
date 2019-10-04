import axios from 'axios'

// экспортируем библиотеку как функцию с предустановленной 
// настройкой - базовым адресом запроса по умолчанию (на сервер)
export default () => {
  return axios.create({
    baseURL: 'http://localhost:8081'
  })
}
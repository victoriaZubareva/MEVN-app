import api from './api' // настроенный axios

// экспортируем модуль как объект, у которого каждый метод для определенного случая
export default {
  fetchPosts() {
    return api().get('posts') // получаем записи с сервера, axios умеет склеивать адреса, получаем http://localhost:3001/posts
  },
  addNewPost(params) { // в качестве аргументов передаем путь и данные params, которые axios отправит express'у
    return api().post('posts', params)
  },
  getPost(params) {
    return api().get(`/posts/${params.id}`)
  },
  updatePost(params) {
    return api().put(`/posts/${params.id}`, params)
  },
  deletePost(id) {
    return api().delete(`/posts/${id}`)
  }
}

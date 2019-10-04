const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// фиксируем что все данные которые будут записываться в базу данных,
// должны быть объектами и иметь текстовое поле title и description
const PostSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  description: {
    type: String
  }
})

// создаем модель PostModel, библиотека mongoose прикручивает к ней методы save(), remove(), find() и другие
const PostModel = mongoose.model('posts', PostSchema)

// экспортируем созданную модель, с помощью нее мы будем создавать и сохранять данные в базу
module.exports = PostModel
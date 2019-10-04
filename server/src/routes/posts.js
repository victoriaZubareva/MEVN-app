//--- файл содержит все действия связанные с маршрутом /posts ---//

const express = require('express');
const router = express.Router();
const Post = require('../models/post-model'); //подключим модель PostModel



// обработка операции CREATE - создание и запись в базу данных
router.post('/posts', (req, res) => {
  const post = new Post({ // функция обратного вызова создает новый объект post при помощи модели Post
    title: req.body.title,
    description: req.body.description // title и description -> приходят со стороны клиента значения поля body объекта request
  })
  post.save((err, data) => { // записываем в базу данных
    if (err) {
      console.log(err)
    } else {
      res.send({
        success: true,
        message: `Post with ID_${data._id} saved successfully!`
      })
    }
  })
})



// чтение всех данных из базы данных, операция READ
router.get('/posts', (req, res) => { 
  Post.find({}, 'title description', (err, posts) => {
    if (err) {
      console.log(err)
    } else {
      res.send({ posts: posts}) // находим все записи в базе данных и возвращаем методом send
    }
  })
})



// получение единичной записи
router.get('/posts/:id', (req, res) => {
  Post.findById(req.params.id, 'title description', (err, post) => { // просим вернуть только поля title description 
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(post)
    }
  })
})

// обновление единичной записи
router.put('/posts/:id', (req, res) => {
  Post.findById(req.params.id, 'title description', (err, post) => {
    if (err) {
      console.log(err)
    } else {
      if (req.body.title) { // если с клиента пришло значение поля title
        post.title = req.body.title
      }
      if (req.body.description) {
        post.description = req.body.description
      }
      post.save(err => { // записываем обновленный post снова в базу данных
        if (err) {
          res.sendStatus(500)
        } else {
          res.sendStatus(200)
        }
      })
    }
  })
})


// удаление записей в базе данных, операция DELETE
router.delete('/posts/:id', (req, res) => {
  Post.remove({ _id: req.params.id }, err => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})


module.exports = router
const express = require('express')
const bodyParser = require('body-parser') // парсить приходящие со стороны клиента данные
const cors = require('cors')
const morgan = require('morgan') // ведение логов
const config = require('./src/config/config') // файл с собственными конфигурациями
const mongoose = require('mongoose') // библиотека для типизации и верификации данных записываемых в mongodb
mongoose.Promise = global.Promise // замена промиса библиотеки mongoose нативным промисом Node.js

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(require('./src/routes/posts')) // подключим файл с маршрутами

// подключаем mongoose к mongodb и запускаем сервер express
mongoose.connect(config.dbURL, config.dbOptions)

mongoose.connection // прослушиваем подключение
  .once('open', () => {
    console.log('Mongoose - successful connection...')
    app.listen(process.env.PORT || config.port, () => { // запуск сервера
      console.log(`Server start on port ${config.port}...`)
    })
  })
  .on('error', error => console.warn(error))

 /* 
// создаем маршрут до страницы со всеми записями posts
app.get('/posts', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
})*/
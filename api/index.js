const express = require('express')
const cors = require('cors')

const data = require('./data')

const server = express()

server.use(cors())

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, UPDATE, PUT');
  next();
});

server.get('/gyms', (req, res) => {
  res.json(data.gyms)
})

server.listen(3000, () => {
  console.log('Server is listening on port 3000')
})



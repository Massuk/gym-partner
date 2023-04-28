const express = require('express')
const cors = require('cors')

const data = require('./data')

const server = express()

server.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT']
}));

server.get('/gyms', (req, res) => {
  res.json(data.gyms)
})

server.listen(3000, () => {
  console.log('Server is listening on port 3000')
})

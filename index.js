const express = require('express')
const app = express()
const port = 3000
const { MongoClient } = require('mongodb');

require('dotenv').config();


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
const express = require('express')
const app = express()
const port = 3000
const cors = require("cors");

app.use(cors());

app.get('/hi_all', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const express = require('express')
const request = require('request')

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/parkinglist', (req, res, next) => {
  request(
    { url: `https://parkos.nl/ajax/locationSearchJSON/?location=parkeren-schiphol&arrival=${req.query.from}&arrivalTime=12%3A00&departure=${req.query.to}&departureTime=12%3A00&sort_f=price&sort_w=asc` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: 'Error' })
      }

      res.json(JSON.parse(body))
    }
  )
})

// export the server middleware
module.exports = {
  path: '/api',
  handler: app
}

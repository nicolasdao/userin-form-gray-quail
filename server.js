const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')

//app.use(cors())
app.use('/dev', express.static('src'))
app.use('/prod', express.static('dist'))

app.get('/dev', function(req, res) {
	res.sendFile(path.join(__dirname + '/index-dev.html'))
})

app.get('/prod', function(req, res) {
	res.sendFile(path.join(__dirname + '/index-prod.html'))
})

app.get('/success', (req,res) => res.status(200).send('WELCOME'))

app.listen(8080)
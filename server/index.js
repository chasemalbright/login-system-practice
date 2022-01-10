const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/users.models')

mongoose.connect('mongodb://localhost:27017/loginSystem')
console.log(mongoose.connection.readyState)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Connection to db successful");
})

app.use(cors())
app.use(express.json())

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({status: 'ok'})
    } catch (err){
        res.json({status: 'error', error: 'bad data'})
    }
})

app.post('/api/login', async (req, res) => {

    const user = await User.findOne({email: req.body.email, password: req.body.password})
    
    if (user){
        return res.json({status: 'ok', user: 'true'})
    } else {
        return res.json({status: 'error', user: 'false'})
    }

})

app.listen(5000, () => {
    console.log("Listening on port 5000")
})

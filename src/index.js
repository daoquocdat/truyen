const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const db = require('./config/db/server')
const multer = require('multer')

// Connect to DB
db.connect();


const app = express()
const port = process.env.PORT || 5000

const route = require('./routes')

const bodyParser = require('body-parser')
app.use(express.static(path.join(__dirname, 'public')))
// HTTP logger
app.use(morgan('combined'))

// Template engine
app.engine('hbs', handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b   
        }
    })
)
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// Route init
route(app)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Listen on enviroment port or 5000
app.listen(port,  () => console.log(`listen on port http://localhost:${port}`))
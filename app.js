const express = require('express')
const port = 3000
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')

const app = express()

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
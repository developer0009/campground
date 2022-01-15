const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use(express.urlencoded({ extended: true }))
const Campground = require('./models/Campground')
const method = require('method-override')
const { render } = require('express/lib/response')
const ejsMate = require('ejs-mate')
app.engine('ejs', ejsMate);
app.use(method('_method'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', async function (req, res) {
    const result = await Campground.find({})
    res.render('home.ejs', { result })
})
app.get('/campgrounds/new', async function (req, res) {
    res.render('new.ejs')
})
app.post('/', async function (req, res) {
    const add = new Campground(req.body.campground)
    await add.save()
    res.redirect('/')
})
app.get('/campgrounds/creator', function (req, res) {
    res.render('creator.ejs')
})
const options = [true, false]
app.get('/campground/:id/edit', async function (req, res) {
    const { id } = req.params
    const campground = await Campground.findById(id)
    res.render('update.ejs', { campground, options })
})
app.get('/campgrounds/:id', async function (req, res) {
    const { id } = req.params
    const campground = await Campground.findById(id)
    res.render('show.ejs', { campground })
})
app.put('/campgrounds/:id', async function (req, res) {
    const { id } = req.params
    await Campground.findByIdAndUpdate(id, req.body.campground)
    res.redirect(`/campgrounds/${id}`)
})
app.delete('/campgrounds/:id', async function (req, res) {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/')
    //render means sending a file in a response 
    //redirect means a refresh
})

app.listen(3000, function () {
    console.log('listening at : 3000')
})
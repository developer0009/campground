
const mongoose = require('mongoose');
const cities = require('./loc');
const { places, descriptors } = require('./cities');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            price: `${Math.floor(Math.random() * 100) + 50}$`,
            available: Math.floor(Math.random() * 2) > 0 ? true : false,
            image: `https://source.unsplash.com/collection/483251`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam ad fugiat expedita maxime voluptas maiores eos, quod, distinctio animi excepturi iure quis numquam quo adipisci debitis tenetur ab aliquam veniam?'
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})

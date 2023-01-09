const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'ejs');

async function run()
{
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb://localhost:27017/new_database');
    }catch(err)
    {
        console.log(err);
    }
}

run();
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
    title: String,
    image: String
});

const Blog = mongoose.model('Blog', BlogPost);


app.get('/', async (req, res) => {
    const blogs = await Blog.find();
    // const {name="User"} = req.query
    res.render('index', {blogs})
});


app.listen(3000, () => {
    console.log("App Running in port 3000");
})
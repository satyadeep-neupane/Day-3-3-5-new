const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const uuid = require('uuid').v4;

app.use(express.json());
app.use(fileUpload());
app.use(express.static('uploads'));

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

app.get('/blog', async function (req, res) {
    const blogs = await Blog.find({});
    const { name="User" } = req.query
    const html = `
        <h1>Hello - ${name}</h1>
        <img src="http://127.0.0.1:3000/images/bok2.png">
        <h2>Bye</h2>
    `;
    res.send(html);
    // res.send(blogs);
})

function getStoragePath(path)
{
    return `./uploads${path}`
}

function getFileName(file, folder)
{
    return `/${folder}/${uuid()}.${file.name.split(".").pop()}`;
}

app.post('/blog', async function(req, res) {
    const fileName = getFileName(req.files.image, 'images');
    req.files.image.mv(getStoragePath(fileName), async (err) => {
        if(err) {
            res.send("Error");
        }


        req.body.image = fileName;
        const blog = new Blog(req.body);
        await blog.save();
        res.send(blog);
    });
})

app.listen(3000);

const express = require('express')
const app = express()
const mongoose = require('mongoose');
const mailer = require('./mailer');

app.use(express.static('uploads'))

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
  author: String,
  title: String,
  body: String,
  date: Date
});

const Blog = mongoose.model('Blog', BlogPost);


app.get('/blog', async function (req, res) {
  const blogs = await Blog.find({"age": "Test1"});
    res.send(blogs);
})

app.post('/blog', async function (req, res) {
    const blog = new Blog({"title": "Test1"});
    await blog.save();
    await mailer.sendMail({
        from: "test@test.com",
        to: "new@test.com",
        subject: "Title",
        html: `
        Dear user,
        <br>
        Welcome!!
        <br>
        Regards,
        `
    })
      res.send(blog);
  })

app.listen(3000)
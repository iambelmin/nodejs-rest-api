const http = require('http')
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('./controllers/postController');
require('dotenv').config()

const PORT = process.env.PORT || 8080



const server = http.createServer((req, res) => {
    if(req.url.match(/\/api\/posts\/?$/) && req.method == "GET") {
        getAllPosts(req, res);
    } else if(req.url.match(/\/api\/posts\/?$/) && req.method == "POST") {
        createPost(req, res);
    } else if(req.url.match(/\/api\/posts\/([0-9])+/) && req.method == "GET") {
        const id = req.url.split('/')[3];
        getPostById(req, res, id);
    }  else if(req.url.match(/\/api\/posts\/([0-9])+/) && req.method == "PUT") {
        const id = req.url.split('/')[3];
        updatePost(req, res, id);
    }  else if(req.url.match(/\/api\/posts\/([0-9])+/) && req.method == "DELETE") {
        const id = req.url.split('/')[3];
        deletePost(req, res, id);
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Path not found'}))
    }
});


server.listen(PORT, () => console.log(`Server started at port ${PORT}`))
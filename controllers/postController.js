const Post = require('../models/postModel')
const { v4: uuidv4 } = require('uuid');
const { getBodyData } = require('../helpers');
// @method GET
// @route /api/posts/
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll()

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(posts))
    } catch (error) {
        console.error(error)
    }
};

// @method GET
// @route /api/posts/:id
const getPostById = async (req, res, id) => {
    try {
        const post = await Post.findById(id)
        
        if(!post) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Post not found'}))
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(post))
        }
    } catch (error) {
        console.error(error);
    }
};


// @method POST
// @route /api/posts/
const createPost = async (req, res) => {
    try {
        const data = await getBodyData(req);
        const newPost = {
            id: uuidv4(),
            ...JSON.parse(data)
        }
        
        const post = await Post.create(newPost);

        res.writeHead(201, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify(post))
    } catch (error) {
        console.error(error);        
    }
}


// @method PUT
// @route /api/posts/:id
const updatePost = async (req, res, id) => {
    try {
        const oldPost = await Post.findById(id);
        
        if(!oldPost) {
             res.writeHead(404, {'Content-Type': 'application/json'})
             res.end(JSON.stringify({message: 'Post not found'}))
        } else {
            const data = await getBodyData(req);
            const newData = JSON.parse(data);

            const newPost = {
                title: newData.title || oldPost.title,
                body: newData.body || oldPost.body
            }

            const postnew = await Post.update(newPost, id);

            res.writeHead(201, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(postnew))
        }
        
    } catch (error) {
        console.error(error);        
    }
}

// @method DELETE
// @route /api/posts/:id

const deletePost = async (req, res, id) => {
    try {   
        const post = await Post.findById(id);

        if(!post) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Post not found'}))
        } else {
            
            const post = await Post.deletePost(id);
            res.writeHead(200, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(post));
        }
    } catch(error) {
        console.error(error);
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}
const posts = require('../data/posts')
const fs = require('fs');
const { writeDataToFile, getBodyData } = require('../helpers')
const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(posts);
    });
};
 
const findById = (id) => {
    return new Promise((resolve, reject) => {
        const post = posts.find((p) => p.id == id)
        resolve(post);
    });
}

const create = (post) => {
    return new Promise((resolve, reject) => {
        posts.push(post);

        writeDataToFile(posts);

        resolve(post);
    });
};

const update = (post, id) => {
    return new Promise((resolve, reject) => {
        const index = posts.findIndex((p) => p.id == id);
        posts[index] = {id, ...post};
        writeDataToFile(posts);
        resolve(posts[index]);
    });
}

const deletePost = (id) => {
    return new Promise((resolve, reject) => {
        const deleted = posts.filter((p) => p.id != id);
        writeDataToFile(deleted);
        resolve(deleted);
    });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    deletePost
}
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

module.exports = {
    findAll,
    findById,
    create
}
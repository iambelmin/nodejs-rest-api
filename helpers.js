const fs = require('fs');


const writeDataToFile = (body) => {

    fs.writeFileSync('data/posts.json', JSON.stringify(body), 'utf-8', (err) => {
        if(err) {
            console.error(err)
        }
    })        
}



const getBodyData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let rawData = ""
            req.on('data', (chunk) => rawData += chunk.toString())
            req.on('end', () => resolve(rawData))
        } catch(error) {
            reject(error)
        }
    })
}


module.exports = {
    writeDataToFile,
    getBodyData
}


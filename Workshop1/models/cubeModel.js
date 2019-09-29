const fs = require('fs');
const path = require('path');

class Cube {
    constructor(id, name, description, image, difficult) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.difficult = difficult;
    }

    get cube() {
        return {
            "id": this.id,
            "name": this.name,
            "description": this.description,
            "image": this.image,
            "difficult": this.difficult,
        }

    }
}

module.exports = {
    createCube: function createCube(id, name, description, imageURL, difficult) {
        let currCube = new Cube(id, name, description, imageURL, difficult);

        let cubeJson = currCube.cube;
        let oldFile = '';

     let cubesDB = require( '../config/database.json');

        cubesDB.push(cubeJson);

        fs.writeFile(path.normalize(path.join(__dirname , '../config/database.json')) , JSON.stringify(cubesDB) , (err) => {
            if(err) throw err;
            console.log('Edited !');
        })


    }
};
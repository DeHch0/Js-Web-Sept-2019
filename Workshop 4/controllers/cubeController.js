const cubeModel = require('../models/Cube');
const accessoryModel = require('../models/Accessors');
const userController = require('../controllers/userController');


function getCreateCube(req, res) {
    userController.auth(req, res).then(data => {
        console.log(data);
        res.render('create', { layout: 'create' });
    }).catch((e) => {
        console.log(e);
        res.redirect('/login');
    });

}

function postCreateCube(req, res) {
    userController.auth(req, res).then(data => {
        cubeModel.create({
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficulty: req.body.difficultyLevel,
            creator: data.id,
        });
    }).catch(console.log);

    res.redirect('/');
}

function getDetails(req, res) {

    userController.auth(req, res).then(data => {
        console.log(data);

    }).catch((e) => {
        console.log(e);
        res.redirect('/login');
    });

    cubeModel.findById(req.params.id)
        .populate('accessories')
        .then((cube) => {

            res.render('details', {
                layout: 'details',
                id: cube.id,
                name: cube.name,
                description: cube.description,
                imageUrl: cube.imageUrl,
                difficulty: cube.difficulty,
                accessor: cube.accessories
            });
        }).catch((e) => {
            console.log(e);
            res.redirect('/error');
        });
}

function getCreateAccessory(req, res) {
    userController.auth(req, res).then(data => {
        res.render('createAccessory', { layout: 'createAccessory' });
    }).catch(e => {
        console.log(e);
        res.redirect('/login')
    })
}

function postCreateAccessory(req, res) {
    accessoryModel.create({
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: req.body.difficultyLevel,
        cubes: []
    }).catch((e) => {
        console.log(e);
        res.redirect('/error');
    });

    res.redirect('/');
}

function getAttachAccessory(req, res) {
    userController.auth(req, res).then(data => {
        cubeModel.findById(req.params.id).then((cube) => {

            accessoryModel.find({ _id: { $nin: [...cube.accessories] } }).then((accessors) => {

                console.log(accessors);

                res.render('attach', {
                    layout: 'attach',
                    id: cube.id,
                    name: cube.name,
                    imageUrl: cube.imageUrl,
                    accessor: accessors,
                });
            }).catch((e) => {
                console.log(e);
                res.redirect('/error');
            });
        }).catch((e) => {
            console.log(e);
            res.redirect('/error');
        });
    }).catch(e => {
        console.log(e);
        res.redirect('/login');
    })
}

function postAttachAccessory(req, res) {

    cubeModel.updateOne({ _id: req.params.id }, { $push: { accessories: req.body.accessory } }).then(() => {
        console.log('Cube is Edited !');
    }).catch((e) => {
        console.log(e);
        res.redirect('/error');
    });

    accessoryModel.updateOne({ _id: req.body.accessory }, { $push: { cubes: req.params.id } }).then(() => {
        console.log('Accessories are Edited !');
    }).then(() => {
        res.redirect(`/details/${req.params.id}`);
    }).catch((e) => {
        console.log(e);
        res.redirect('/error');
    });
}

async function getEditCube(req, res) {
    userController.auth(req, res).then(data => {
        cubeModel.findById(req.params.id)
            .then(cube => {
                console.log(cube);

                res.render('edit', {
                    layout: 'edit',
                    id: cube.id,
                    name: cube.name,
                    description: cube.description,
                    imageUrl: cube.imageUrl,
                    difficulty: cube.difficulty,
                    accessor: cube.accessories
                });

            })
            .catch(e => {
                console.log(e);
            });
    }).catch(e => {
        console.log(e);
        res.redirect('/login');
    })
}

function postEditCube(req, res) {
    console.log(req.body);

    cubeModel.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                difficulty: req.body.difficulty,
            }
        }).then((data) => console.log('cube has been edited !'))
        .catch((e) => console.log('cube update error !'));

}

function getRemoveCube(req, res) {
    userController.auth(req, res).then(data => {
        console.log(req.params.id);

        cubeModel.findById(req.params.id).then(cube => {
            console.log(cube);
            res.render('delete', {
                layout: 'delete',
                id: cube.id,
                name: cube.name,
                description: cube.description,
                imageUrl: cube.imageUrl,
                difficulty: cube.difficulty,
                accessor: cube.accessories
            });
        }).catch(e => {
            console.log(e);
        });

    }).catch(e => {
        console.log(e);
        res.redirect('/login');
    })
}

function postRemoveCube(req, res) {
    console.log(req.params.id);
    cubeModel.findByIdAndDelete(req.params.id).then(data => {
        console.log('cube deleted successfully !');
    }).catch(e => {
        console.log('cube delete error !');
    });

    res.redirect('/');
}


module.exports = {
    getCreateCube,
    postCreateCube,
    getDetails,
    getCreateAccessory,
    postCreateAccessory,
    getAttachAccessory,
    postAttachAccessory,
    getEditCube,
    postEditCube,
    getRemoveCube,
    postRemoveCube,
};
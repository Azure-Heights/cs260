const express = require('express');
const bodyParser = require("body-parser");


/***** multer config *****/

const multer = require('multer')
const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize: 10000000
    }
});


/***** mongoose config *****/

const mongoose = require('mongoose');

const abilitySchema = new mongoose.Schema({
    name: String,
    // TODO: allow for requests to pass this as a comma separated string
    tags: [{type: String}],
    description: String,
});
const Ability = mongoose.model('Ability', abilitySchema);

const moveSchema = new mongoose.Schema({
    name: String,
    type: String,
    damage: String,
    // TODO: allow for requests to pass this as a comma separated string
    tags: [{type: String}],
    description: String,
});
const Move = mongoose.model('Move', moveSchema);

const speciesSchema = new mongoose.Schema({
    name: String,
    types: [{type: String}],
    description: String,
    abilities: [{type: String}],
    moves: [{type: String}],
    health: Number,
    attack: Number,
    defense: Number,
    special_attack: Number,
    special_defense: Number,
    speed: Number,
});
const Species = mongoose.model('Species', speciesSchema);

mongoose.connect('mongodb://localhost:27017/pta', {
    useNewUrlParser: true
});

// const specimenSchema = new mongoose.Schema({
//     name: String,
//     speciesName: String,
//     nature: String,
//     abilities: [{type: String}],
//     moves: [{type: String}],
//     hp: Number,
//     atk: Number,
//     def: Number,
//     spa: Number,
//     spd: Number,
//     spe: Number,
// });
// const Specimen = mongoose.model('Specimen', specimenSchema);


/***** API definition *****/

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/api/moves', async (req, res) => {
    var tags = req.body.tags;
    if (typeof tags == String)
        tags = tags.split(', ');

    const move = new Move({
        name: req.body.name,
        type: req.body.type,
        tags: tags,
        damage: req.body.damage,
        description: req.body.description,
    });
    try {
        await move.save();
        res.send(move);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/moves', async (req, res) => {
    try {
        let moves = await Move.find();
        res.send(moves);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/moves/:id', async (req, res) => {
    var tags = req.body.tags;
    if (typeof tags == String)
        tags = tags.split(', ');

    try {
        let move = await Move.findOne({
            _id: req.params.id
        });
        move.name = req.body.name;
        move.type = req.body.type;
        move.tags = tags;
        move.damage = req.body.damage;
        move.description = req.body.description;
        move.save()
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/moves/:id', async (req, res) => {
    try {
        await Move.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/api/abilities', async (req, res) => {
    var tags = req.body.tags;
    if (typeof tags == String)
        tags = tags.split(', ');

    const ability = new Ability({
        name: req.body.name,
        tags: tags,
        damage: req.body.damage,
        description: req.body.description,
    });
    try {
        await ability.save();
        res.send(ability);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/abilities', async (req, res) => {
    try {
        let abilities = await Ability.find();
        res.send(abilities);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/abilities/:id', async (req, res) => {
    var tags = req.body.tags;
    if (typeof tags == String)
        tags = tags.split(', ');

    try {
        let ability = await Ability.findOne({
            _id: req.params.id
        });
        ability.name = req.body.name;
        ability.tags = tags;
        ability.description = req.body.description;
        ability.save();
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/abilities/:id', async (req, res) => {
    try {
        await Ability.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/api/species', async (req, res) => {
    const species = new Species({
        name: req.body.name,
        types: req.body.types,
        description: req.body.description,
        abilities: req.body.abilities,
        moves: req.body.moves,
        health: req.body.health,
        attack: req.body.attack,
        defense: req.body.defense,
        special_attack: req.body.special_attack,
        special_defense: req.body.special_defense,
        speed: req.body.speed,
    });
    try {
        await species.save();
        res.send(species);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/species', async (req, res) => {
    try {
        let species = await Species.find();
        res.send(species);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/species/:id', async (req, res) => {
    try {
        let species = await Species.findOne({
            _id: req.params.id
        });
        species.name = req.body.name;
        species.types = req.body.types;
        species.description = req.body.description;
        species.abilities = req.body.abilities;
        species.moves = req.body.moves;
        species.health = req.body.health;
        species.attack = req.body.attack;
        species.defense = req.body.defense;
        species.special_attack = req.body.special_attack;
        species.special_defense = req.body.special_defense;
        species.speed = req.body.speed;
        species.save();
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/species/:id', async (req, res) => {
    try {
        await Species.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});



/***** run server *****/

app.listen(3000, () => console.log('Server listening on port 3000!'));

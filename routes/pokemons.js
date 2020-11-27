const express = require('express');
const router = express.Router();
const fs = require('fs');
const validate = require('../validation');

router.use(express.json())

//Find file
const args = process.argv.slice(2);
const filename = args.find((element) => {
    return element.endsWith(".json")
})



//Get all the pokemons
router.get('/', (req, res) => {
    //
    function getAllPokemon() {
        if (!filename) {
            return res.status(400).send("Sorry the data is missing...")
        }
        let file = fs.readFile(filename, 'utf8', (err, data) => {
            file = JSON.parse(data);
            res.json(file);
        })

    }
    getAllPokemon()

})

//Get a specific pokemon
router.get('/:id', (req, res) => {
    function getPokemon() {

        let file = fs.readFile(filename, 'utf8', (err, data) => {
            file = JSON.parse(data);

            //Validation
            if (!file[req.params.id - 1]) {
                return res.status(400).send("Sorry the pokemon you tried to get is missing...")
            }
            const pokemon = file[req.params.id - 1]
            res.json(pokemon);
        })


    }
    getPokemon()

})

//Create a pokemon
router.post('/', (req, res) => {
    function createPokemon() {
        //Validation
        const { error } = validate(req.body)
        if (error) {
            res.status(400).send(error.details[0].message)
        }
        let file = fs.readFile(filename, 'utf8', (err, data) => {
            file = JSON.parse(data);


            //Pokemon 
            const pokemon = {
                id: file.length + 1,
                name: req.body.name,
                type: req.body.type,
                base: req.body.base
            }

            //Response New File
            file.push(pokemon);
            res.json(file);

            //Overwrite existing file
            const newFile = JSON.stringify(file);
            console.log(newFile);
            fs.writeFile(filename, newFile, 'utf8', (err) => {
                if (err) {
                    console.error("There was an error when overwriting the file")
                }
                console.log('Mission done..')

            })
        })

    }
    createPokemon();



})

//Update a pokemon
router.put('/:id', (req, res) => {
    function updatePokemon() {
        //Validation
        const { error } = validate(req.body)
        if (error) {
            res.status(400).send(error.details[0].message)
        }

        let file = fs.readFile(filename, 'utf8', (err, data) => {
            file = JSON.parse(data);


            //Pokemon 
            let pokemon = file[req.params.id - 1];
            pokemon.name = req.body.name;
            pokemon.type = req.body.type;
            pokemon.base = req.body.base;

            //Response New File
            file.push(pokemon)
            res.json(file);

            //Overwrite existing file
            const newFile = JSON.stringify(file);
            console.log(newFile);
            fs.writeFile(filename, newFile, 'utf8', (err) => {
                if (err) {
                    console.error("There was an error when overwriting the file")
                }
                console.log('Mission done..')

            })



        })

    }
    updatePokemon();

})

//Remove a pokemon
router.delete('/:id', (req, res) => {
    function deletePokemon() {
        let file = fs.readFile(filename, 'utf8', (err, data) => {
            file = JSON.parse(data);

            if (!file[req.params.id - 1]) {
                return res.status(400).send("Sorry the data you tried to delete is missing...")
            }

            //Delete the pokemon from the file
            file.splice((req.params.id - 1), 1)

            //Response New File
            res.json(file);
            console.log(file);

            //Overwrite existing file
            const newFile = JSON.stringify(file);
            console.log(newFile);
            fs.writeFile(filename, newFile, 'utf8', (err) => {
                if (err) {
                    console.error("There was an error when delete a chunk the file")
                }
                console.log('Mission done..')

            })



        })

    }
    deletePokemon();

})


module.exports = router;
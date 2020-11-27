const express = require('express');
const app = express();
const pokemons = require('./routes/pokemons');

app.use('/pokemons', pokemons)

//Find the port
const args = process.argv.slice(2);


//Port
const localPort = args.find((element) => {
    return element.startsWith("42")
})

const port = process.env.PORT || localPort;
app.listen(port, () => {
    console.log(`My app is listening on port ${port}....`);
})
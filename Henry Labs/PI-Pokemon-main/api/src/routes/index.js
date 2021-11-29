const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
// const Pokemon = require('../models/Pokemon');   // LO COMENTÉ PERO VENÍA POR DEFECTO
const {Pokemon, Type} = require('../db') // al de arriba lo reemplacé por este.
const { response } = require('../app');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//En esta función traigo 20 + 20 pokemons 

const getApiInfo = async () => {
    const apiUrl1 = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const apiUrl2 = await axios.get(apiUrl1.data.next);
    const apiInfo1 = await apiUrl1.data.results.map(el => axios.get(el.url));
    const apiInfo2 = await apiUrl2.data.results.map(el  => axios.get(el.url) ) 
    const apiInfoTotal = apiInfo1.concat(apiInfo2);
    const allData = await Promise.all(apiInfoTotal);
    
    const pokemonsData = allData.map(el => {
        return {
            name: el.data.name,
            id: el.data.id,
            types: el.data.types.map(type => ({
                name: type.type.name,
                id: type.slot
            })),
            img: el.data.sprites.other.home.front_default,
            hp: el.data.stats[0].base_stat,
            attack: el.data.stats[1].base_stat,
            defense: el.data.stats[2].base_stat,
            speed: el.data.stats[5].base_stat,
            height: el.data.height,
            weight: el.data.weight
        }
    })
    // console.log(pokemonsData);
    return pokemonsData;
 }



const getDbInfo = async () => {
    return await Pokemon.findAll({
    include: {
        model: Type,
        attributes: ['name'],
        through: {
            attributes: [],
        }
    }
    })
}


const getAllPokemons = async () => {
    let pokemons = await getApiInfo();
    let dbInfo = await getDbInfo();
    const infoTotal = pokemons.concat(dbInfo);
    return infoTotal;
}


router.get('/pokemons' , async (req, res) => {
    const name = req.query.name
    let pokemonsTotal = await getAllPokemons();
    let infoRutaPrincipal = pokemonsTotal.map(el => {
        return {
            name: el.name, 
            types: el.types,
            img: el.img
        }
    })
    if(name){
        let pokemonName = await infoRutaPrincipal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        pokemonName ?
        res.send(pokemonName) :
        res.status(404).send("This Pokemon doesn't exist");
        info   
    }else {
        res.send(infoRutaPrincipal);
    
    }
})

router.get('/pokemons/:id', async (req, res) => {
    const id = req.params.id;
    const pokemonsTotal = await getAllPokemons();
    if (id) {
        let pokemonId= pokemonsTotal.filter(pokemon => pokemon.id === parseInt(id));
        pokemonId.length?
        res.status(200).send(pokemonId):
        res.status(404).send("This Pokemon doesn't exist");
    }

})


router.get('/types' , async (req, res) => {
    const apiTypes = await axios.get('https://pokeapi.co/api/v2/type'); //Trae los types de la API
    const typesInfo = apiTypes.data.results.map(el => el.name)                                  
        typesInfo.forEach(el => {                               
            Type.findOrCreate({                                 // Crea los valores en la db
                where: {name: el}
            }) 
        })
        const allTypes = await Type.findAll();                  // busca en la tabla Type de la db
        res.send(allTypes);                                     // devuelve los types desde la db
    // console.log(typesInfo);
})

router.post('/pokemons', async (req,res) => {
let {                    
    name,
    types,
    img,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    createdInDb
} = req.body         // Se trae la info por body

let pokemonsCreated = await Pokemon.create ({    // Crea el pokemon con esos datos
    name,
    img,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    createdInDb
})
let typeDb = await Type.findAll({             // Se trae los types guardados anteriormente en la db
    where: {name: types}
})
pokemonsCreated.addType(typeDb)               // Agrega los types
res.send('Pokemon created successfully')
})


    




module.exports = router;

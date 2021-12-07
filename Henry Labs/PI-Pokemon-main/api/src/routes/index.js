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
            id: el.id, 
            types: el.types,
            img: el.img,
            attack: el.attack,
            createdInDb: el.createdInDb

        }
    })
    if(name){
        let pokemonName = await infoRutaPrincipal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        pokemonName ?
        res.send(pokemonName) :
        res.status(404).send("This Pokemon doesn't exist");
        // info  //(problema) 
    }else {
        res.send(infoRutaPrincipal);
    
    }
});

router.get('/pokemons/:id', async (req, res) => {
    const id = req.params.id;
    const pokemonId = await getAllPokemons();
    if (id) {
        let pokemonI;
        if (id.length > 1 ){

            pokemonI= pokemonId.filter(pokemon => pokemon.id === (id));

        } else {
            pokemonI= pokemonId.filter(pokemon => pokemon.id === parseInt(id));  

        }
        pokemonI.length?
        res.status(200).send(pokemonI):
        res.status(404).send("This Pokemon doesn't exist");  
    }
});


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
});


//------------------------------------------------------------------------------------------------------
// INTENTO 1 (TRAE TODA LA INFO + LOS TYPES EN LA BASE DE DATOS, PERO NO APARECE EN EL LOCALHOST))
router.post('/pokemons', async (req,res) => {

let {types} = req.body         // Se trae la info por body
    
let pokemonsCreated = await Pokemon.create ({    // Crea el pokemon con esos datos
    name: req.body.name.toLowerCase(),
    img: req.body.img,
    hp: Number(req.body.hp),
    attack: Number(req.body.attack),
    defense: Number(req.body.defense),
    speed: Number(req.body.speed),
    height: Number(req.body.height),
    weight: Number(req.body.weight),
})
let typeDb = await Type.findAll({             // Se trae los types guardados anteriormente en la db
    where: {name: types}
})
pokemonsCreated.addType(typeDb)               // Agrega los types
res.send(pokemonsCreated)
});

// -------------------------------------------------------------------------------
// INTENTO 2 (TRAE POR EL CONSOLE.LOG TODA LA INFO + LOS TYPES Y TAMBIÉN EN LA BASE DE DATOS, PERO NO APARECE EN EL LOCALHOST)
// if (req.body){
//     console.log('datos por body', req.body);
//     Pokemon.create(req.body).then(pokemonCreated => res.send(pokemonCreated))
// }
// })

//---------------------------------------------------------------------------------
//INTENTO 3 (NO ROMPRE NADA PERO TAMPOCO HACE NADA PERO TIENE ESPERANZA)

  // FALTA TRAER LOS TYPES DE LOS POKEMONS

//   router.post('/pokemons', async (req, res) => {
 
//     const typePoke = await Type.findAll()
    
//
// let typeOne = req.body.types.findOne(typePoke.map(el => {
//     return { name: el.type.name, id: el.type.id}
// }))

//await routP.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
    // let typeOne = req.body.types

    // if (typeOne === typePoke.map(el => {el.types.name.includes(typeOne)})){
    //      const result = typePoke.map(el => {
    //         return { 
    //             name: el.type.name, 
    //             id: el.type.id
    //         }

    //      })

    //      Pokemon.create(req.body).then(pokemonCreated => {
    //         res.send(pokemonCreated.addType(result))  
    //    })
    // }
 
// })



module.exports = router;

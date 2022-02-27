const axios = require('axios');
const { Router } = require('express');
const {Dog,Temperament} = require('../db');
// const { response } = require('../app');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Traemos de la api
const getApiInfo = async () => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=8787d213-f725-43af-a9d9-29a7d7086dbb');
    const allData = await Promise.all(apiUrl.data);
    // console.log(allData)
    const dogsData = allData.map(el => {
        return {
              img: el.image.url,
              name: el.name,
              temperament: el.temperament,
              weight: el.weight.metric
        }
    })

    return dogsData;
 }

 const getDbInfo = async () => {
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
 }

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/dogs', async (req,res) => {
const name = req.query.name
let dogsTotal = await getAllDogs();
if(name){
    let dogName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
    dogName.length?
    res.status(200).send(dogName):
    res.status(400).send("This dog doesn't exist")
}else{
    res.status(200).send(dogsTotal)
}
})

router.get("/temperament", async (req,res) => {
    const temperamentApi = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=8787d213-f725-43af-a9d9-29a7d7086dbb')
    const temperamentsData = await Promise.all(temperamentApi.data);
    const temperaments = temperamentsData.map(el => el.temperament)
        let temp = '';
        temperaments.forEach(el => 
            temp = temp + el + ','
            )        
        let array = temp.split(',');
        
        const nwTemp = array.filter((item,index) => {
            return array.indexOf(item) === index;
         });

         nwTemp.forEach(el => {
         Temperament.findOrCreate({
             where: {name: el}
         })
   })
        const allTemperaments = await Temperament.findAll();
        // console.log(temp);
        res.send(allTemperaments);    
    })

router.post('/dogs', async (req,res) => {
    let {temperament }= req.body

    let dogCreated = await Dog.create({
        name: req.body.name,
        img: req.body.img,  
        height: Number(req.body.height),
        weight: Number(req.body.weight),
        lifeSpan: req.body.lifeSpan
    })
   
    let temperamentsDb = await Temperament.findAll({
        where: {name: temperament}
    })
   dogCreated.addTemperament(temperamentsDb)
   console.log(temperamentsDb)
   res.send(dogCreated)
})



   



module.exports = router;

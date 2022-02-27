'use strict';

var express = require('express');
var router = express.Router();
router.use(express.json());

var tareas = []

// escriban sus rutas acá 
// siéntanse libres de dividir entre archivos si lo necesitan

router.get("/users", (req, res) => {
    res.json(tareas)
})

router.post("/users", (req, res) => {
    if(req.body.person) {
        if (typeof req.body.person !== "string") return res.sendStatus(401);
        tareas.push(req.body.person);
        return res.status(201).json({encargado: req.body.person})
        
    } else if (req.query.person) {
        tareas.push(req.query.person);
        return res.status(201).json({encargado: req.query.person})
    }
})

router.put("/users", (req, res) => {
    const {person, lastName} = req.body;
    var index = tareas.indexOf(person);

    if (index === -1) return res.sendStatus(404);

     if(lastName) {
        tareas[index] = `${tareas[index]} ${lastName}`;
        return res.status(201).json({fullName: tareas[index]})
        
    } else {
        tareas[index] = `${tareas[index]} ${req.query.lastName}`;
        return res.status(201).json({fullName: tareas[index]})
    }
})

router.delete("/users", (req, res) => {
    const {person} = req.body;
    var encontrado = false;

    if(person) {
        for (let i = 0; i < tareas.length; i++) {
            if (tareas[i].includes(person)) {
                tareas.splice(i, 1);
                encontrado = true;
            }
        }
        encontrado ? res.sendStatus(200) : res.sendStatus(404);

    } else {
        for (let i = 0; i < tareas.length; i++) {
            if (tareas[i].includes(req.query.person)) {
                tareas.splice(i, 1);
                encontrado = true;
            }
        }
        encontrado ? res.sendStatus(200) : res.sendStatus(404);
    }
    
})

router.post("/users/task", (req, res) => {
    for (let i = 0; i < tareas.length; i++) {
        let obj = {
            encargado: tareas[i],
            completada: false,
            tarea: ""
        }
        tareas[i] = obj;
    }
    res.json(tareas)
})

router.get("/users/task", (req, res) => {
       res.json(tareas)
})

router.get("/users/:person/task", (req, res) => {
    const {person} = req.params;
    var arr = [];
    for (let i = 0; i < tareas.length; i++) {
        if(tareas[i].encargado === person) arr.push(tareas[i].tarea)
    }
    res.json(arr)
})

router.post("/users/:person/task", (req, res) => {
    const {person} = req.params;
    const {task} = req.body;
    var encontrado = tareas.find(t => t.encargado === person)
    if (encontrado) {
        tareas.push({encargado:person, completada: false, tarea: task})
        return res.sendStatus(201)
    } 
    res.sendStatus(404)
})

router.put("/users/:person/task", (req, res) => {
    const {person} = req.params;
    const {task} = req.body;
    const {index} = req.query;

    var encontrado = tareas.find(t => t.encargado === person)
    if (encontrado) {
        tareas[index].tarea = task
        return res.sendStatus(200)
    } 
    res.sendStatus(401)
})

module.exports = {
    router, 
    tareas
};
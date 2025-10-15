const express = require('express');
const db = require('../models');
const menuRouter = express.Router();

// get all menu itens
menuRouter.get('/', async (req, res, next) => {
    try {
        const menuData = db.Menu.findAll({});

        return res.status(200).json({ menuData });
    } catch (err) {
        console.error('Error fetching data', err);
        return res.status(500).json({ message: 'Error fetching data', error: err.message })
    }
});

// get menu item by id

// insert into menu
menuRouter.post('/', async (req, res, next) => {
    const { name, price, description, isFood, isDrink } = req.body;

    if (!name || !price || isFood === undefined || isDrink === undefined) {
        return res.status(400).json({ error: 'Name, price, isFood and isDrink are required' })
    }

    try {

        const newMenuItem = await db.Menu.create({
            name,
            price,
            description,
            isFood,
            isDrink,
        });

        return res.status(201).json({ message: 'Menu item created!', newMenuItem })


    } catch (err) {
        console.error('Error inserting data', err);
        return res.status(500).json({ message: 'Error inserting data', error: err.message })
    }
});





module.exports = menuRouter;
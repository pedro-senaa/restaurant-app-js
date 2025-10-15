const express = require('express');
const db = require('../models');
const tabRouter = express.Router();


// param for when id is given in url [x]
tabRouter.param('id', async (req, res, next, id) => {
    try {
        const tab = await db.Tab.findByPk(Number(id));

        if (tab) {
            req.tab = tab;
            return next();
        } else {
            return res.status(404).json({ message: 'No tab with id given' })
        }
    } catch (err) {
        console.log("Error fetching tab", err);
        return res.status(500).json({ message: 'Error fetching tab data', error: err.message })
    }

})


// get all [x]
tabRouter.get('', async (req, res, next) => {

    try {
        const tabData = await db.Tab.findAll({});

        return res.status(200).json({ message: 'tab data retrieved', tabData });
    } catch (err) {
        console.error('Error fetching tab data', err);
        return res.status(500).json({ message: 'Error fetching tab data', error: err.message })
    }

})

// get by id [x]
tabRouter.get('/:id', async (req, res, next) => {
    return res.status(200).json({ message: 'tab data retrieved', tabData: req.tab })
})

// change by id [x]
tabRouter.put('/:id', async (req, res, next) => {
    const { tab, status } = req.body;
    if (status === undefined || status === null) {
        return res.status(400).json({ message: 'Missing status information' })
    }
    try {

        tab.status = status;
        const updatedTab = await tab.save();
        return res.status(200).json({ message: 'tab updated!', tabData: updatedTab })

    } catch (err) {
        console.log('Error updating tab', err);
        return res.status(500).json({ message: 'Error updating tab', error: err.message })
    }
});


// new tab [x]
tabRouter.post('', async (req, res, next) => {
    const { status } = req.body;
    try {
        const newTab = await db.Tab.create({
            status,
        });

        return res.status(201).json({message: 'tab created', tabData: newTab})

    } catch (err) {
        console.log('Error creating tab', err);
        return res.status(500).json({ message: 'Error creating tab', error: err.message })
    }
})











module.exports = tabRouter;
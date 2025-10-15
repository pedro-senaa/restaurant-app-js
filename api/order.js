const express = require('express');
const db = require('../models');
const orderRouter = express.Router();


// Middleware for routes @ /order/:id               [x]
orderRouter.param('id', async (req, res, next, id) => {
    try {
        const orderData = await db.Order.findByPk(Number(id), {
            include: {
                model: db.OrderItems,
                include: db.Menu
            }
        })

        if (orderData) {
            req.orderData = orderData;
            return next();
        } else {
            return res.status(404).json({ message: 'Order not found' })
        }

    } catch (err) {
        console.log('Error fetching order data', err);
        return res.status(500).json({ message: 'Error fetching order data', error: err.message })
    }




});

// GET /order: gets all orders; can filter by query tabId                  [x]
orderRouter.get('/', async (req, res, next) => {
    try {
        const options = {
            include: {
                model: db.OrderItems,
                include: db.Menu,
            }
        };
        if (req.query.tabId) {
            options.where = { tabId: Number(req.query.tabId) }
        }
        const orderData = await db.Order.findAll(options);
        return res.status(200).json({ message: 'order data retrieved', orderData })


    } catch (err) {
        console.log('Error fetching data', err);
        return res.status(500).json({ message: 'Error fetching data', error: err.message })
    }
});

// POST /order: Creates a new order,
// expected request body:                                    [x] 
// {
//     "tabId": 1,
//     "items": [
//         { "menuId": 1, "quantity": 2 },
//         { "menuId": 2, "quantity": 1 }
//     ]
// }
orderRouter.post('/', async (req, res, next) => {
    const { tabId, items } = req.body;

    if (!tabId || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'A tabId and a non-empty array of items is required' })
    }



    const t = await db.sequelize.transaction();
    try {

        const newOrder = await db.Order.create({ tabId }, { transaction: t });

        const orderItems = items.map(item => ({
            orderId: newOrder.id,
            menuId: item.menuId,
            quantity: item.quantity,
        }));

        await db.OrderItems.bulkCreate(orderItems, { transaction: t })

        const completeOrder = await db.Order.findByPk(newOrder.id, {
            include: {
                model: db.OrderItems,
                include: db.Menu
            }
        });

        await t.commit();
        return res.status(201).json({ message: 'Order created!', orderData: completeOrder })

    } catch (err) {
        await t.rollback();
        console.log('Error creating new order', err)
        return res.status(500).json({ message: 'Error creating new order', error: err.message })

    }
});


// GET /order/:id - Get order by id                          [x]
orderRouter.get('/:id', async (req, res, next) => {
    return res.status(200).json({ message: 'order data retrieved!', orderData: req.orderData })

});


// DELETE /order/:id - Deletes order by id                              [x]
orderRouter.delete('/:id', async (req, res, next) => {
    try {
        await req.orderData.destroy();
        return res.status(204).send();
    } catch (err) {
        console.log('Error deleting order', err);
        return res.status(500).json({ message: 'Error deleting order', error: err.message })
    }
});




module.exports = orderRouter;
const express = require('express');
const menuRouter = require('./api/menu');
const tabRouter = require('./api/tab');
const app = express();


const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use('/menu', menuRouter);
app.use('/tab', tabRouter);



app.get('', (req, res, next) => {
    console.log('App is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
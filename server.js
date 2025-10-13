const express = require('express');
const menuRouter = require('./api/menu');
const app = express();


const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use('/menu', menuRouter);



app.get('', (req, res, next) => {
    console.log('App is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
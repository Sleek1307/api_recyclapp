const express = require('express');
const app = express();
const { connection } = require('./database/db.js');

const userRouter = require('./routes/routesUser.js')
const serviceRouter = require('./routes/servicesRoutes.js')

//Settings
const PORT = process.env.PORT || 4000

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
app.use(userRouter);
app.use(serviceRouter);

app.listen(PORT, async () => {
    console.log(`Aplicacion corriendo en el puerto ${PORT}`);

    await connection.sync({ force: true })
})
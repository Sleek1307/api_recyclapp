const express = require('express');
const app = express();
const { connection } = require('./database/db.js');

const usersRoutes = require('./v1/routes/userRoutes');
const serviceRoutes = require('./v1/routes/servicesRoutes');
const postRoutes = require('./v1/routes/postRoutes');

//Settings
const PORT = process.env.PORT || 4000

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
app.use('/recyclapp', usersRoutes);
app.use('/recyclapp', serviceRoutes);
app.use('/recyclapp', postRoutes);

// app.use(serviceRouter);

app.listen(PORT, async () => {
    console.log(`Aplicacion corriendo en el puerto ${PORT}`);

    try {
        await connection.authenticate();

        //await connection.sync({ force: true });
        console.log('Nos hemos conectado a la base de datos');
    } catch (error) {
        console.log('Error: ' + error)
    }

})
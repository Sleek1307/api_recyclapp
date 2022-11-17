const express = require('express');
const app = express();
const { connection } = require('./app/database/db.js');

const usersRoutes = require('./app/v1/routes/use.routes');
const serviceRoutes = require('./app/v1/routes/services.routes');
const postRoutes = require('./app/v1/routes/post.routes');
const authRouter = require('./app/v1/routes/auth.routes');

//Settings
const PORT = process.env.PORT || 4000

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
//http://localhost:4000/recyclapp
app.use('/recyclapp', usersRoutes);
app.use('/recyclapp', serviceRoutes);
app.use('/recyclapp', postRoutes);
app.use('/recyclapp', authRouter);

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
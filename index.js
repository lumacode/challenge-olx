const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const port = process.env.APP_PORT || 3900;
const swaggerUI = require('swagger-ui-express');

//Documentation
const swaggerDocs = require('./utils/documentation');

//Express init
const app = express();

const clientRouter = require ('./routes/client');

app.use(express.json());

//Documentation route
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//CORS and content-type json
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    if(!req.is('application/json')) return res.status(400).json({'status': 'error', 'message': 'Invalid Content-Type.'});
    next();
});

//API routes
app.use('/', clientRouter);

//Db and server connect
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

const mongoAtlasUri = `mongodb+srv://${process.env.APP_MONGO_USER}:${process.env.APP_MONGO_PWD}@cluster0.yernl.mongodb.net/callenge_onix?retryWrites=true&w=majority`

mongoose.connect(mongoAtlasUri || 'mongodb://localhost:27017/challenge_olx', {
    useUnifiedTopology: true,
    useNewUrlParser: true
        })
        .then(() => {
                console.log('The connection to the database was successful.');

                app.listen(port, () => {
                    console.log(`Server is running in ${process.env.APP_BASE_URL}:${port}`);
                });
        
            })
        .catch(e => console.log('error db: ', e))



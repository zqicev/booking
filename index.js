const express = require('express');
const app = express();
const cors = require('cors');
const reload = require('reload');
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const { getConfig } = require('./config.js');
const { query, closePool } = require('./db.js');

const config = getConfig();
require('dotenv').config();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


const dbConnection = (req, res, next) => {
    req.dbQuery = query;
    next();
};

reload(app).then((reloadReturned) => {
    http.listen(config.server.port, () => {
        console.log(`Server started on port ${config.server.port}`);
    });
});

try {
    query(`
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            total_seats INT NOT NULL
        );
    `);

    query(`
        CREATE TABLE IF NOT EXISTS bookings (
            id SERIAL PRIMARY KEY,
            event_id INT NOT NULL,
            CONSTRAINT fk_event_id
                FOREIGN KEY(event_id)
                REFERENCES events(id),
            user_id VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
} catch (error) {
    console.log('dbInitializationError:', error);
}

try {
    const methodsRouter = require('./routes/methodsRouter.js');
    app.use('/api', dbConnection, methodsRouter);
} catch (error) {
    console.log('methodsRouterError:', error);
}
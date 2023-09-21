const express = require('express');
const sequelize = require('./db/database.connector')
const cors = require('cors');
const router = require('./api/routes/index')
const errorHandler = require('./api/middleware/ErrorHandlingMiddleware');
const logger = require("./utils/logger.utils");
const loggerInstance = require("./utils/loggerInstance.utils");
require('dotenv').config();

const mainLogger = logger(process.env.LOGGER_LEVEL, loggerInstance, "MAIN");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'AC Server working...' });
})

const start = async () => {
    try {
        app.listen(process.env.API_PORT, () =>
        mainLogger.info(`AC Server started to ${process.env.API_PORT}...`));
        await sequelize.authenticate();
        await sequelize.sync();
        mainLogger.info("Connected to DB!");
    } catch (error) {
        mainLogger.error(error);
    }
}

start();
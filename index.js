const express = require('express');
const cors = require('cors');
const logger = require("./utils/logger.utils");
const loggerInstance = require("./utils/loggerInstance.utils");
require('dotenv').config();

const mainLogger = logger(process.env.LOGGER_LEVEL, loggerInstance, "AC MAIN");

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'AC Server working...' });
})

const start = async () => {
    try {
        app.listen(process.env.API_PORT, () =>
        mainLogger.info(`AC Server started to ${process.env.API_PORT}...`));
    } catch (error) {
        mainLogger.error(error);
    }
}

start();
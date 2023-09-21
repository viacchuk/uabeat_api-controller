const dbController = require('../../events/db.events');
const ApiError = require('../error/ApiError');
const logger = require("../../utils/logger.utils");
const loggerInstance = require("../../utils/loggerInstance.utils");
require('dotenv').config();

const catalogLogger = logger(
    process.env.LOGGER_LEVEL, 
    loggerInstance, 
    "CatalogDev CONTROLLER"
    );

class CatalogController {
    async get(req, res, next) {
        try {
            catalogLogger.silly(req.body);
            if (req.body.key === process.env.API_DEV) {
                let { page, where } = req.body;

                const count = await dbController.count('ObjectDev');
                const limit = 10;
                const offset = count-page*limit;

                const data = await dbController.read('CatalogDev', where, limit, offset);

                return res.status(200).json(data);
            } else {
                return next(ApiError.badRequest('Incorrect KEY'));
            }
        } catch (error) {
            catalogLogger.error(error);
            return res.status(500).json(error);
        }
    }

    async pages(req, res, next) {
        try {
            catalogLogger.silly(req.body);
            if (req.body.key === process.env.API_DEV) {
                const data = await dbController.count('ObjectDev');
                const result = Math.ceil(data/10);

                return res.status(200).json(result);
            } else {
                return next(ApiError.badRequest('Incorrect KEY'));
            }
        } catch (error) {
            catalogLogger.error(error);
            return res.status(500).json(error);
        }
    }
}

module.exports = new CatalogController();
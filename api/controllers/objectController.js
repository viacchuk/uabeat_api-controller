const dbController = require('../../events/db.events');
const ApiError = require('../error/ApiError');
const logger = require("../../utils/logger.utils");
const loggerInstance = require("../../utils/loggerInstance.utils");
require('dotenv').config();

const objectLogger = logger(
    process.env.LOGGER_LEVEL, 
    loggerInstance, 
    "ObjectDev CONTROLLER"
    );

class ObjectController {
    async get(req, res, next) {
        try {
            objectLogger.silly(req.body);
            if (req.body.key === process.env.API_DEV) {
                let { id } = req.body;

                if (!id || id < 1) {
                    return next(ApiError.badRequest('Incorrect ID'));
                }
                const where = { id };

                const query = await dbController.read('ObjectDev', where);

                const result = query.map(({ name, info, photo }) => ({ name, info, photo }));

                if (result.length < 1) {
                    return next(ApiError.badRequest('Not found'));
                }
    
                return res.status(200).json(result[0]);
            } else {
                return next(ApiError.badRequest('Incorrect KEY'));
            }
        } catch (error) {
            objectLogger.error(error);
            return res.status(500).json(error);
        }
    }

    async add(req, res, next) {
        try {
            objectLogger.silly(req.body);
            if (req.body.key === process.env.API_DEV) {
                let { name, info, photo } = req.body;

                if (!info || !photo || !name) {
                    return next(ApiError.badRequest('Incorrect info or photo or name'));
                }

                const query = await dbController.create('ObjectDev', { name, info, photo });
    
                return res.status(200).json("Object added");
            } else {
                return next(ApiError.badRequest('Incorrect KEY'));
            }
        } catch (error) {
            objectLogger.error(error);
            return res.status(500).json(error);
        }
    }
}

module.exports = new ObjectController();
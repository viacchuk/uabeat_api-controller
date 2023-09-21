const { ObjectDev } = require("../db/models");

class DbEvents {
    async create(table, item) {
        let { name, info, photo } = item;
        if (table === 'ObjectDev')
            await ObjectDev.create({ name, info, photo });
    }

    async read(table, where, limit, offset) {
        const options = {
            where,
        };

        if (limit) {
            options.limit = limit;
        }

        if (offset) {
            options.offset = offset;
        }

        if (table === 'CatalogDev' || table === 'ObjectDev') {
            const result = await ObjectDev.findAll(options);
            return result;
        }

        return null;
    }

    async update(table, where, item) {
        if (table === 'ObjectDev')
            await ObjectDev.update({ interval: item }, { where });
    }

    async delete(table, where) {
        if (table === 'ObjectDev')
            await ObjectDev.destroy({ where });
    }

    async count(table) {
        if (table === 'ObjectDev') {
            const result = await ObjectDev.count();

            return result;
        }
    }
}

module.exports = new DbEvents();
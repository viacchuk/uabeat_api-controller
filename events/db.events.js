const { Object } = require("../db/models");

class DbEvents {
    async create(table, item) {
        let { name, info, photo, price, status } = item;
        if (table === 'Object')
            await Object.create({ name, info, photo, price, status });
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

        if (table === 'Object') {
            const result = await Object.findAll(options);
            return result;
        }

        return null;
    }

    async update(table, where, item) {
        if (table === 'Object')
            await Object.update({ interval: item }, { where });
    }

    async delete(table, where) {
        if (table === 'Object')
            await Object.destroy({ where });
    }

    async count(table) {
        if (table === 'Object') {
            const result = await Object.count();

            return result;
        }
    }
}

module.exports = new DbEvents();
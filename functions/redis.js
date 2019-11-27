const redisclient = require('ioredis');
module.exports = {
    redis: class Redis{
        /**
         * 
         * @param {*} connection Redis connection
         */
        constructor(connection){
            this.connection = connection
        }

        async set(value, key){
            let res = await this.connection.set(value, key);
            return res;
        }
        async get(value){
            let res = await this.connection.get(value);
            return res;
        }
    },
    init: async function name(options) {
        let connection = new redisclient({host: options.host, port: options.port, db: options.db});
        return new this.redis(connection);
    }
}
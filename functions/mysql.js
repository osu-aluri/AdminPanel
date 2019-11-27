const {createPool} = require('mysql2/promise')

module.exports = {

    MysqlConnector: class MysqlConnector{
        /**
         * 
         * @param {String} connection mysql connection
         */
        constructor(connection){
            this.connection = connection;
        }
        /**
         * 
         * @param {string} host mysql host, standart is localhost
         * @param {number} port mysql port
         * @param {string} user mysql user
         * @param {string} password password of user
         * @param {string} database database
         */
        /**
         * 
         * @param {string} query
         * 
         * !!This function is async!! 
         */
        async execute(query){ 
            let [rows, fields] = await this.connection.query(query);
            return rows, fields
        }
        async ping(){
                console.log('Pinging mysql...')
                await this.execute('SELECT 1');
        }
    },
    Init: async function init(host, user, password, database){
        let connection = await createPool({host: host, user: user, password: password, database: database});
        return new this.MysqlConnector(connection);
    }
}
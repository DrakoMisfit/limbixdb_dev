import util from "util";
import mysql from "mysql";
import fs from "fs";

let AuthData__=JSON.parse(fs.readFileSync("./config/MySQL.json","utf-8"));

let connection=mysql.createConnection({
    host:AuthData__.host,
    user:AuthData__.user,
    password:AuthData__.password,
    database:AuthData__.database
});

connection.query = util.promisify(connection.query).bind(connection);

export default connection;
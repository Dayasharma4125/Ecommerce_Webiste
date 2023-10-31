import sql from "mysql2";

const config = sql.createConnection({
    host: "localhost",
    user: "root",
    port: "3306",
    password: "1234",
    database: "data"
})

const connect = async () => {
    await config.connect((err) => {
        if (err) throw err;
        console.log("database connected")
    })
}

export { config, connect }
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import { Database, Resource } from '@adminjs/typeorm' 
const PORT = 4000

import { config, connect } from './model/model.js'

import router from './routes.js'
// AdminJS.registerAdapter({ Database, Resource })
// const admin = new AdminJS({
//     databases: [config],
//   })
const start = async () => {
    connect();
    const app = express()
    const admin = new AdminJS({})
    const adminRouter = AdminJSExpress.buildRouter(admin)
    app.use(admin.options.rootPath, adminRouter)
    app.use(express.json())
    app.listen(PORT, () => {
        console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
    })
    app.use("", router);
}
start()

















// import  Adminjs  from "adminjs"
// import expres = require("express");
// import { connect, config } = require("./model/model");
// const App = expres();
// // const AdminJSExpress= require("@adminjs/express")

// const port = 4000 || 4001
// App.listen(port, () => {
//     console.log("app is running at ", port)
// })
// const admin = Adminjs({});
// // const adminRouter = AdminJSExpress.buildRouter(admin)

// app.use(admin.options.rootPath, adminRouter)

// connect();

// App.get("/", (req, res) => {
//     console.log(data)
//     res.json(data._rows)
// })

// const Quarry = "SELECT * FROM users WHERE password = '<PASSWORD>'"
// "INSERT INTO users (name,email,phoneno,password) VALUES ?"
// const data = [
//     ["Rahul", "<EMAIL>", 967321, '<PASSWORD>'],
//     ["noene", "dksjd", 5448424, 'sdjfiosnd'],
//     ["ijfido", "idjfoijd", 84864554, "dkjsofjs"],
// ]
//  "CREATE TABLE  users IF NOT EXISTS (name VARCHAR(50) NOT NULL,email VARCHAR(256),phoneno BIGINT NOT NULL,password VARCHAR(50) NOT NULL)"
// const data = config.query(Quarry, (err, result, fields) => {
//     if (!err) { console.log('database created') } else { throw err }
//     if (result) {
//         console.log(result)
//         return result
//     }
//     if (fields) {
//         console.log(fields)
//     }
// })

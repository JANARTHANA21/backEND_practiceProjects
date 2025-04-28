require('dotenv').config();

const coonect = require("./model/db")
const model=require('./model/model')
const data=require('./data.json')
const start=async()=>{
    try {
        await coonect(process.env.MONGO_URI)
        await model.deleteMany()
        // await model.create(data)
        console.log("Sucess!!...");
        process.exit(0)
    } catch (error) {
        console.log(error.message);

        process.exit(1)
    }
}
start();
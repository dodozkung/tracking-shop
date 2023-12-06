const mongoose = require("mongoose");
require('dotenv').config();

const usernamemongodb = process.env.usernamemongodb ;
const passwordmongodb = process.env.passwordmongodb ;

module.exports = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(
            // "mongodb+srv://dodozkung:D-1234zxc@xnodejs.9gsimwi.mongodb.net/",
            `mongodb+srv://${usernamemongodb}:${passwordmongodb}@xnodejs.9gsimwi.mongodb.net/`,
            connectionParams
        );
        console.log("Connected to database.");
    } catch (error) {
        console.log("Could not connect to database.", error);
    }
};
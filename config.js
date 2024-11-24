const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb+srv://root:12345@cluster0.nvgtb.mongodb.net/logins?retryWrites=true&w=majority")

connect.then(()=>{
    console.log("databnase connected")
})

.catch(()=>{
    console.log("not connected ")
})

const loginschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    }
})

const collect = new mongoose.model("posts",loginschema)
module.exports = collect;
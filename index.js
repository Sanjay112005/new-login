const express = require("express")
const pasth = require("path")
const bcrypt = require("bcrypt")
const collect = require("./config")
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.set('view engine','ejs')
app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async(req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
   const data = {
    name:req.body.username,
    password:hashedPassword,
   }


const existuser = await collect.findOne({name:data.name})
  if(existuser){
         res.send("user already exists")
    }
    else{
        const userdata = await collect.insertMany(data)
        console.log(userdata)
        res.redirect("/")
    }
})
// if the user is not found in the database 
app.post("/login",async(req,res)=>{
  try{
    const check = await collect.findOne({name:req.body.username})
    if(!check){
    res.send("user cannot be found ")
}


    const ispasswords = await bcrypt.compare(req.body.password , check.password)
     if(ispasswords){
        res.render("home")
     }
     else{
        res.send("wrong password")
     }

}catch{
    console.error("Error during login:", error);
    res.status(500).send("Wrong details");
}
})
const port = 5000;
app.listen(port,()=>{
    console.log(`server running at : ${port}`)
})
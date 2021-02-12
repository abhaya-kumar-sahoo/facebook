const express= require("express")
const bodyParser=require("body-parser")
const ejs= require("ejs")
const mongoose= require("mongoose")
const app= express();

// app.use(express.static("public"));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
    extended:true
}));
  
// mongodb connection
mongoose.connect('mongodb+srv://whatsapp:s4vQGKy4iyManggp@cluster0.ehbwq.mongodb.net/whatsapp?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});
///user schema
 
const userSchema={
    email:String,
    password:String
}
const User= new mongoose.model("User", userSchema)

app.get("/", function(req, res){
    res.render("register");
  });
  

app.post("/",function(req,res){
    const newUser= new User({
        email:req.body.username,
        password:req.body.password
    })

newUser.save(function(err){
        if(err){
            console.log(err)
        }else{
            res.render("index")
        }
    })
})
 
app.listen(3000,()=>{
    console.log("server started on port 30000")
})
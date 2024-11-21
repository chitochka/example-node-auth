const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const PORT = process.env.PORT || 8080

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express()


var corsOptions = {
  origin: "http://localhost:8081",
};

//app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.json())
app.use("/auth", authRouter)
const Role = require('./models/Role')


const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://alex:alex@cluster0.zyelpcb.mongodb.net/new")
        initial()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()




async function  initial (){
 console.log("\n\n initial")
 
  try {
    const count = await Role.estimatedDocumentCount();
    console.log('count = ' , count)
    if (!count) {
      console.log('\n   создание Ролей\n')
      const admin = new Role( {value:'ADMIN'}  )
      await admin.save()
      const owner = new Role( {value:'owner'}  )
      await owner.save()
      
     const renter = new Role( {value:'RENTER'}  )
      await renter.save()
      console.log('\n    РолI срздана=\n')
      
    }
  }
  catch (e) { console.log( "\n\neerror initial =\n", e)  }
}
  
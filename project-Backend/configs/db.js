const mongoose=require('mongoose');

const connectToDb=()=>{
  mongoose.connect(`${process.env.DB_CONNECT}/QuickCommerce`).then(()=>{
    console.log("connected to database");
  }).catch(err=> console.log(err)
  )
}

module.exports=connectToDb
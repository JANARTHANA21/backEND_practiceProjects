const mongoose=require('mongoose');
const connectdb=(url)=>{mongoose.connect(url).then(()=>{console.log("connect to database");
}).catch((err)=>{console.log(err.message);
});}
module.exports=connectdb;
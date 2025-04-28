const { default: mongoose} = require("mongoose")

const coonect=(url)=>{
    mongoose.connect(url).then(console.log("database is connected")).catch((err)=>{console.log(err.message)})
};
module.exports=coonect;
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://muskan:muskan@cluster0.vy8bgdf.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("success")
}).catch((e)=>{
    console.log(e);
})
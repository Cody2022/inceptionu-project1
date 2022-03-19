const res = require("express/lib/response");
const mongoose=require("./mongoose");


const citySchema=new mongoose.Schema({
    name:{
        type: String,
        min: 3,
        required: true,
        unique: true
    },
    temp:{
        type: Number,
        default:0,
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
})

const citySet=mongoose.model("citySet", citySchema);

const createCity=async (newCityName)=>{
    let result= await citySet.create(newCityName, error=>{
        if(error){
            console.log(error.message)
            return;}
    }); // return result;
}

const findCityByName=async (cityToFind)=>{
    let cityFound=await citySet.findOne(cityToFind, error=>{
        // res.send(`${cityFound.name} cannot be found!`)
        console.log(`${cityFound}`)
    });
    return cityFound;
}



module.exports={createCity};
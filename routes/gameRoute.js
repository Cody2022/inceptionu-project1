const express=require('express');
const gameRouter=express.Router();
module.exports = gameRouter;

const {weatherOfCity, 
        localWeather, 
        geoLocation, 
        startGame, 
        addCity, 
        findCity, 
        deleteCity,
        findAllCities,
        updateCityTemperature,
        initialize,
        start}=require('../model/game')


gameRouter.get("/startgame", startGame);   //city = req.query.city

gameRouter.get("/guess", weatherOfCity);   //city = req.query.city


gameRouter.get("/add", async (req, res)=>{
    let city=req.query.city;
    console.log("get-add City", city)
    let addCityMessage=await addCity(city)
    console.log("Message:",addCityMessage)
    res.send(`Add ${city} to database`);
}); 

gameRouter.get('/find', async(req, res)=>{
    let city=req.query.city;
    let cityFound=await findCity(city);
    console.log("/find cityFound:",cityFound)
    if (cityFound===false){res.send(`${city} is not in the database`)}
    else{res.send(cityFound)}
})

gameRouter.get('/delete', async(req, res)=>{
    let city=req.query.city;
    let cityFound=await deleteCity(city);
    console.log("get-/delete cityFound:", cityFound)
    if (cityFound.deletedCount===0){res.send(`${city} is not in the database`)}
    else{res.send(`${city} is deleted from the database.`)}
})

gameRouter.get('/findcities', async (req,res)=>{
    let cityArray=await findAllCities();
    console.log("cityArray:",cityArray)
    let cities=[];
    for (city of cityArray){
        cities.push(city.name)
    }
    res.send(cities)
})

gameRouter.get('/update', async(req, res)=>{
    let city=req.query.city;
    let temperature=Number(req.query.temperature);
    console.log(temperature)
    let cityWithNewT=await updateCityTemperature(city, temperature);
    console.log("cityWithNewT",cityWithNewT)
    if (cityWithNewT===null){res.send(`Cannot update, ${city} is not in the database`)}
    else{res.send(cityWithNewT)};
})

gameRouter.get('/init', initialize);

gameRouter.get('/start', async(req,res)=>{
    let accuracy=Number(req.query.accuracy);
    let results=await start(accuracy);
    console.log("Your game results: ", results);
    res.send(results);
})
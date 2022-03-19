const express=require('express');
const gameRouter=express.Router();
module.exports = gameRouter;

const {currentWeatherCity, localWeather, geoLocation, startGame, addCity}=require('../model/game')


gameRouter.get("/startgame", startGame);   //city = req.query.city

gameRouter.get("/guess", currentWeatherCity);   //city = req.query.city

gameRouter.get("/add/:city", async (req, res)=>{
    let city=req.params.city;
    console.log("get-add City", city)
    let addCityMessage=await addCity(city);
    console.log("Message:",addCityMessage)
    res.send(`Add ${city} to database`);
});   //city = req.query.city

// let findCity=await findCityName(city);
// if (findCity){return (`${city} is already in the city database`)}
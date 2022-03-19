const express=require('express');
const checkRouter=express.Router();
module.exports = checkRouter;

const {currentWeatherCity, localWeather, geoLocation}=require('../model/game')

checkRouter.get("/weather", localWeather);

checkRouter.get("/geoip", geoLocation);


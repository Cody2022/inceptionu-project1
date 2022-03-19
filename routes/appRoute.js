const express=require('express');
const appRouter=express.Router();
module.exports = appRouter;

const {weatherOfCity, localWeather, geoLocation}=require('../model/game')

appRouter.get("/weather", localWeather);

appRouter.get("/geoip", geoLocation);

appRouter.get("/q", weatherOfCity); 
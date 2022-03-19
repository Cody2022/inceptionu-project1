const {APIkey_weather}=require('../API-key');
const fetch=require('node-fetch');

const {createCity,
       findCityByName,
        }=require('../db/gameModel');


const currentWeatherCity=(req, res)=>{
    let city = req.query.city;
    console.log(city);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey_weather}`)
            .then((weatherObj) => weatherObj.json())
            .then((weatherJson) => {
                console.log(weatherJson);
                console.log("City:",weatherJson.name);
                console.log("Description:",weatherJson.weather[0].description);
                console.log("Weather icon:",weatherJson.weather[0].icon);
                console.log("Temperature, C:", weatherJson.main.temp);
                console.log("Feel like, C:", weatherJson.main.feels_like);
                console.log("humidity, %:", weatherJson.main.humidity);
                console.log("Wind, m/s:", weatherJson.wind.speed);
                res.send({
                    "City:":weatherJson.name,
                    "Description:":weatherJson.weather[0].description,
                    "Weather icon:": weatherJson.weather[0].icon,
                    "Temperature, C:": weatherJson.main.temp,
                    "Feel like, C:": weatherJson.main.feels_like,
                    "humidity, %:": weatherJson.main.humidity,
                    "Wind, m/s:": weatherJson.wind.speed
                });
            }) 
            .catch((error)=>{
                console.log("Error export:", error);
                res.status(404).send(`Weather information for city "${city}" is not found!`);
            })
}
//--------------------------------------------
const forecastDailyWeatherCity=(req,res)=>{
    let city=req.query.city;
    let daily=parseInt(req.query.daily);
    let days=16;

    if (daily<1 || daily>16 ){
        res.send("hint: enter correct number to check 16 days / daily forecast data");
    } else {
        fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${days}&units=metric&appid=${APIkey_weather}`)
        .then((weatherObj) => weatherObj.json())
        .then((weatherJson) => {
            console.log(weatherJson);
            console.log("City:", weatherJson.city.name);
            console.log("Description:",weatherJson.list[daily-1].weather[0].description);
            console.log("Weather icon:",weatherJson.list[daily-1].weather[0].icon);
            console.log("Temperature, C:", weatherJson.list[daily-1].temp);
            console.log("Feel like, C:", weatherJson.list[daily-1].feels_like);
            console.log("humidity, %:", weatherJson.list[daily-1].humidity);
            console.log("Wind, m/s:", weatherJson.list[daily-1].speed);
            res.send({
                "City:":weatherJson.city.name,
                "Description:":weatherJson.list[daily-1].weather[0].description,
                "Weather icon:": weatherJson.list[daily-1].weather[0].icon,
                "Temperature, C:": weatherJson.list[daily-1].temp,
                "Feel like, C:": weatherJson.list[daily-1].feels_like,
                "humidity, %:":weatherJson.list[daily-1].humidity,
                "Wind, m/s:": weatherJson.list[daily-1].speed
            });
        }) 
        .catch((error)=>{
            console.log("Error export:", error);
            res.status(404).send(`Weather forecat for city "${city}" is not found!`);
        })
    }
}


//----------------------------------------------
function geoLocation(req, res){
    fetch('https://freegeoip.app/json/')
    .then(responseObj=>responseObj.json())
    .then(geoinf=>{
        console.log(geoinf);
        res.send(geoinf);
        console.log({
            "ip": geoinf.ip,
            "country_code": geoinf.country_code,
            "country_name": geoinf.country_name,
            "region_code": geoinf.region_code,
            "region_name": geoinf.region_name,
            "city": geoinf.city,
            "zip_code": geoinf.zip_code,
            "time_zone": geoinf.time_zone,
            "latitude": geoinf.latitude,
            "longitude": geoinf.longitude
        });
    })
    .catch((error)=>{
        console.log("Error export:", error);
        res.status(404).send(`Geo information for your location is not found!`);
    })
};
//-------------------

function localWeather(req,res){
    function weatherModule(geoIp){
       let city=geoIp.city;

       fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey_weather}`)
           .then((weatherObj) => weatherObj.json())
           .then((weatherJson) => {
               console.log(weatherJson);
               console.log("City:",weatherJson.name);
               console.log("Description:",weatherJson.weather[0].description);
               console.log("Weather icon:",weatherJson.weather[0].icon);
               console.log("Temperature, C:", weatherJson.main.temp);
               console.log("Feel like, C:", weatherJson.main.feels_like);
               console.log("humidity, %:", weatherJson.main.humidity);
               console.log("Wind, m/s:", weatherJson.wind.speed);
               res.send({
                   "City:":weatherJson.name,
                   "Description:":weatherJson.weather[0].description,
                   "Weather icon:": weatherJson.weather[0].icon,
                   "Temperature, C:": weatherJson.main.temp,
                   "Feel like, C:": weatherJson.main.feels_like,
                   "humidity, %:": weatherJson.main.humidity,
                   "Wind, m/s:": weatherJson.wind.speed
               });
           }) 
           .catch((error)=>{
               console.log("Error export:", error);
               res.status(404).send(`Weather information for city "${city}" is not found!`);
           });
    };
        fetch("https://freegeoip.app/json/")
        .then((responseIP) => responseIP.json())
        .then(weatherModule)
        .catch((error)=>{
            console.log("Error export:", error);
            res.status(404).send(`Geo information for your city is not found!`);
        });
};


//--------------

const startGame=(req, res)=>{
    let city=req.query.city || "calgary";
    res.send(`<p>Welcome to the game, please enter your name: </p>
        <input id="name" />
        <a id="link"><button>Go</button></a>
        <script>
        let nameInput = document.getElementById('name')
        console.log(nameInput)
            nameInput.addEventListener('keyup',(e)=>{
            console.log('hey')
            let link = document.getElementById('link')
            link.setAttribute('href','http://localhost:8000/game/guess?city=${city}')
            })
        </script>`
    )
}

// //-------
const addCity=async(city)=>{
    let newCity=await createCity({name:city});
    console.log(newCity);
    return newCity;
}

const findCityName=async(cityName)=>{
    let city=await findCityByName({name: cityName});
    return city;
}

module.exports={currentWeatherCity, 
                geoLocation, 
                localWeather, 
                forecastDailyWeatherCity, 
                startGame,
                addCity,
                findCityName
            };
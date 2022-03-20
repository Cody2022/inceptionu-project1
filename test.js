const {APIkey_weather}=require('./API-key');
const fetch=require('node-fetch');
const { response } = require('express');

const readlineSync=require('readline-sync');
const readlineAsync=require('readline-async');

// let cityArray=["shanghai","qingdao","hefei","beijing"]
// let tempArray=[];

// for (city of cityArray){
//     let cityTemp=readlineSync.question(`Input your guess for the temperature of ${city}?`)
//     tempArray.push(Number(cityTemp));
//     console.log(typeof(cityTemp))
// }

// // console.log(`Hi the temperature of ${city} is ${cityTemp}`)

// console.log(tempArray)

// const fetchWeather=async(city)=>{
//     let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey_weather}`);
//     let weatherJson=await response.json();
//     console.log(weatherJson);         
              
// }
//  fetchWeather("calgary")

//--------------------------------------------

// readlineAsync()
// .then( line => {
//         console.log("You said " + line);
//         // return readlineAsync();
// })
// .then( line => {
//         console.log("and this " + line);
//         return "done";
// })
// .then(console.log);

let output=readlineAsync(5);
console.log(output)

// const inputAsync=async()=>{
//     let input=await readlineAsync();
//     return input;

// }

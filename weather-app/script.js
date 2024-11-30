let cityname = document.querySelector("#city");
let dateTime = document.querySelector("#date");
let Data = document.querySelector("#data");
let temp = document.querySelector("#temp");
let min = document.querySelector("#min");
let max = document.querySelector("#max");

let cityName = document.querySelector("#nav");

//let btn = document.querySelector("button")

//let search = document.querySelector(".search")

let feel = document.querySelector("#feel");
let hum = document.querySelector("#hum");
let Wind = document.querySelector("#wind");
let pro = document.querySelector("#pro");

//to get the actual country name
const getCountryName = (code)=> {
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
};

// to get the date and time
const getDateTime = (dt) =>{
    const curDate = new Date(dt * 1000);
    console.log(curDate);

    const options = {
        weekday: "long",
        year: "numeric",
        month: 'long',
        day: 'numeric',
        hour:'numeric',
        minute: 'numeric'
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(curDate);

    console.log(formattedDate);

};

let city = "pune";

// search functionality


cityName.addEventListener("submit", (e)=>{
    e.preventDefault();

    let nameCity = document.querySelector(".city-name");
    //console.log(nameCity.value);
    city = nameCity.value;
    getWeatherData();
    nameCity.value = "";
})


const getWeatherData = async() => {
 const weatherUrl = `httpss://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a403951d6c0a3b8da2f66359af47cbf7`;
    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);
        const {main, name, weather, wind, sys,dt} = data;

        Data.innerHTML = weather[0].main

        cityname.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);
        temp.innerHTML = `${main.temp}&#176`;
        min.innerHTML = `Min:${main.temp_min.toFixed()}&#176`;
        max.innerHTML = `Max:${main.temp_max.toFixed()}&#176`;

        feel.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
        hum.innerHTML = `${main.humidity}%`;
        Wind.innerHTML = `${wind.speed} m/s`;
        pro.innerHTML = `${main.pressure}hPa`;

    } catch (error){
        console.log(error)
    }
};

document.body.addEventListener("load", getWeatherData());
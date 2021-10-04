let weather = {

    apiKey: "d729aaa2cdfb05b3138f2f846d383302",
    fetchWeather: function(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
        .then((res) => res.json())
        .then((data) => this.displayWeather(data));

    },

    displayWeather: function(data){
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        
        document.querySelector(".city").innerText = `Weather in ${name}`
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`
        document.querySelector(".desc").innerText = `${description}`
        document.querySelector(".temp").innerText = `${Math.round(temp)}°C`
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}`
        document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`
        
        // Loading at first
        document.querySelector(".weather").classList.remove("loading")
        // random bg-image by places
        document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${name})`
    },

    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

// searching of places by using search-magnifying button
const searchCity = document.querySelector(".search .btn");
searchCity.addEventListener("click", () =>{
    weather.search();
});

// searching of places by using of enter
const enterCity = document.querySelector(".search-bar");
enterCity.addEventListener("keyup", (e) =>{
    if(e.key === "Enter"){
        weather.search();
        enterCity.value = "";
    }
});

// showing the default place of weather
weather.fetchWeather("Philippines");


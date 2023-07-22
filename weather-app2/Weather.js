if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then((res) => console.log("service worker registered"))
        .catch((err) => console.log("service worker not registered", err));
    });
  }
  
  function showNotification() {
    Notification.requestPermission((result) => {
      if (result === "granted") {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification("Weather Notification", {
            body: "Notification from Weather",
            icon: "./img/clouds.png",
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: "vibration-sample",
          });
        });
      }
    });
  }
  
  showNotification();
var city = document.getElementById("city")
var abc = document.getElementById("abc")
var wImg = document.getElementById('wImg')
var loaders = document.getElementById("Loader")
var date = new Date()
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var today = days[date.getDay()]
var currentMonth = month[date.getMonth()]
var currentDate = date.getDate()
console.log(today);
console.log(currentMonth);
console.log(currentDate);
async function fetchDataOnload() {
    let lat
    let lon
    if(await navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position);
            lat = position.coords.latitude
            lon = position.coords.longitude
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=4bda7568a7c59b33e221f7c0a9c2c42d`)
            .then(response => {
                return response.json()

            })
            .then(data1=>{
                console.log(data1);
                console.log(wImg);
                abc.innerHTML= `
                <h4>${data1.name}<br>${data1.sys.country}</h4>
                <p class="date">${today.slice(0, 3)}, ${currentMonth} ${currentDate}</p>`
           if(data1.weather[0].main === "Clouds"){
            data1.weather[0].icon = "img/clouds.png";
           }
           else if (data1.weather[0].main === "Clear"){
            data1.weather[0].icon = "img/cloudy.png";
           }
           else if (data1.weather[0].main === "Rain"){
            data1.weather[0].icon = "img/rain.png";
           }
           else if (data1.weather[0].main === "Drizzle"){
            data1.weather[0].icon = "img/snow.png";
           }
           else if (data1.weather[0].main === "Mist"){
            data1.weather[0].icon = "img/mist.png";
           }
           else if (data1.weather[0].main === "Smoke"){
            data1.weather[0].icon = "img/smoke.png";
           }

         abc.innerHTML += `

         <div class="weather_temp">
         <div class="weather_img">
         <img id ="wImg" src="${data1.weather[0].icon}"></div>
         <div class="temp">
         <h1 class="cen">${Math.floor(data1.main.temp)} <sup><sup>o</sup>C</sup>
         </h1>
         <p>${data1.weather[0].main} </p>
         </div>
         </div>
         <div class="forecast">
         <div class="one">
         <div class="img_weather">
         <img src="img/humidity.png">
         <span>Humidity</span>
         </div>
         <div class="calculate">
         <p>${data1.main.humidity}%</p>
         </div>
         </div>
         <div class="one">
         <div class="img_weather">
         <img src="img/wind.png">
         <span>Wind</span>
         </div>
         <div class="calculate">
         <p>${data1.wind.speed}km/h</p>
         </div>
         </div>
         <div class="one">
         <div class="img_weather">
         <img src="img/clouds.png">
         <span>Clouds</span>
         </div>
         <div class="calculate">
         <p>${data1.clouds.all}%</p>
         </div>
         </div>
         </div>
       `
     })
     .catch(error => {
         console.log("Current Location Not detecting....")
     


            })
        })
    }
}
window.onload = fetchDataOnload();
async function onSearch() {

    if (city.value.trim() === "") {
        swal(`Enter a city name Karachi,Delhi etc`);
    }

    else {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=4bda7568a7c59b33e221f7c0a9c2c42d`)
            .then(response => {
                return response.json();
            })
            .then(data2 => {
              
                console.log(data2);
                abc.innerHTML = `
                <h4>${data2.name}<br>${data2.sys.country}</h4>
                <p class="date">${today.slice(0, 3)}, ${currentMonth} ${currentDate}</p>`
                if(data2.weather[0].main === "Clouds"){
                    data2.weather[0].icon = "img/clouds.png";
                   }
                   else if (data2.weather[0].main === "Clear"){
                    data2.weather[0].icon = "img/cloudy.png";
                   }
                   else if (data2.weather[0].main === "Rain"){
                    data2.weather[0].icon = "img/rain.png";
                   }
                   else if (data2.weather[0].main === "Drizzle"){
                    data2.weather[0].icon = "img/snow.png";
                   }
                   else if (data2.weather[0].main === "Mist"){
                    data2.weather[0].icon = "img/mist.png";
                   }
                   else if (data2.weather[0].main === "Smoke"){
                    data2.weather[0].icon = "img/smoke.png";
                   }
          abc.innerHTML += `
                <div class="weather_temp">
                <div class="weather_img">
                <img id ="wImg" src="${data2.weather[0].icon}"></div>
                <div class="temp">
                <h1 class="cen">${Math.floor(data2.main.temp)} <sup><sup>o</sup>C</sup>
                </h1>
                <p>${data2.weather[0].main} </p>
                </div>
                </div>
                <div class="forecast">
                <div class="one">
                <div class="img_weather">
                <img src="img/humidity.png">
                <span>Humidity</span>
                </div>
                <div class="calculate">
                <p>${data2.main.humidity}%</p>
                </div>
                </div>
                <div class="one">
                <div class="img_weather">
                <img src="img/wind.png">
                <span>Wind</span>
                </div>
                <div class="calculate">
                <p>${data2.wind.speed}km/h</p>
                </div>
                </div>
                <div class="one">
                <div class="img_weather">
                <img src="img/clouds.png">
                <span>Clouds</span>
                </div>
                <div class="calculate">
                <p>${data2.clouds.all}%</p>
                </div>
                </div>
                </div>
              `
                if (data2.message === "city not found") {
                    swal({
                        title: "Error",
                        text: "City not found",
                        icon: "error",
                        button: "Ok!",
                    });
                    abc.innerHTML = `
                    <h4>City Not Found</h4>
                  `
                    //
                }
            })
            .catch(error2 => {
                swal({
                    title: "Error",
                    text: "City not found",
                    icon: "error",
                    button: "Ok!",
                });
            })
    }
}
window.onkeydown = function KeyonSearch() {
    if (event.keyCode == 13) {
        if (city.value.trim() === "") {
            swal(`Enter a city name Karachi,Delhi etc`);
        }
       else {
         fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=4bda7568a7c59b33e221f7c0a9c2c42d`)
            .then(response => {
                return response.json();
            })
            .then(data2 => {
               
                console.log(data2);
                abc.innerHTML = `
                <h4>${data2.name}<br>${data2.sys.country}</h4>
                <p class="date">${today.slice(0, 3)}, ${currentMonth} ${currentDate}</p>`
                if(data2.weather[0].main === "Clouds"){
                    data2.weather[0].icon = "img/clouds.png";
                   }
                   else if (data2.weather[0].main === "Clear"){
                    data2.weather[0].icon = "img/cloudy.png";
                   }
                   else if (data2.weather[0].main === "Rain"){
                    data2.weather[0].icon = "img/rain.png";
                   }
                   else if (data2.weather[0].main === "Drizzle"){
                    data2.weather[0].icon = "img/snow.png";
                   }
                   else if (data2.weather[0].main === "Mist"){
                    data2.weather[0].icon = "img/mist.png";
                   }
                   else if (data2.weather[0].main === "Smoke"){
                    data2.weather[0].icon = "img/smoke.png";
                   }
            abc.innerHTML += `
                <div class="weather_temp">
                <div class="weather_img">
                <img id ="wImg" src="${data2.weather[0].icon}"></div>
                <div class="temp">
                <h1 class="cen">${Math.floor(data2.main.temp)} <sup><sup>o</sup>C</sup>
                </h1>
                <p>${data2.weather[0].main} </p>
                </div>
                </div>
                <div class="forecast">
                <div class="one">
                <div class="img_weather">
                <img src="img/humidity.png">
                <span>Humidity</span>
                </div>
                <div class="calculate">
                <p>${data2.main.humidity}%</p>
                </div>
                </div>
                <div class="one">
                <div class="img_weather">
                <img src="img/wind.png">
                <span>Wind</span>
                </div>
                <div class="calculate">
                <p>${data2.wind.speed}km/h</p>
                </div>
                </div>
                <div class="one">
                <div class="img_weather">
                <img src="img/clouds.png">
                <span>Clouds</span>
                </div>
                <div class="calculate">
                <p>${data2.clouds.all}%</p>
                </div>
                </div>
                </div>
              `
                    if (data2.message === "city not found") {
                        swal({
                            title: "Error",
                            text: "City not found",
                            icon: "error",
                            button: "Ok!",
                        });
                        abc.innerHTML = `
                    <h4>City Not Found</h4>
                  `
                        //
                    }
                })
                .catch(error2 => {
                    swal({
                        title: "Error",
                        text: "City not found",
                        icon: "error",
                        button: "Ok!",
                    });
                })
        }
    }
}



//lat 24.920064
//lon  67.0629888
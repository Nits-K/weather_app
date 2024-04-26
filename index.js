const weatherFormEl=document.querySelector(".weatherForm");
      const cityInputEl=document.querySelector(".cityInput");
      const cardEl=document.querySelector(".card")
      const apiKey="a5b481f5b547b883332a5a0558b1e7e0"
      weatherFormEl.addEventListener("submit",async event=>{
          event.preventDefault();
          const city=cityInputEl.value;
          if(city)
          {
              try
              {
                  const weatherData=await getWeatherData(city)
                  displayWeatherInfo(weatherData)
              }
              catch(error)
              {
                  console.error(error);
                  displayError(error)
              }
          }
          else{
              displayError("Please Enter a city");
          }
      });
      async function getWeatherData(cityEl)
          {
              const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityEl}&appid=${apiKey}`;
              const response=await fetch(apiUrl);
              if(!response.ok)
              {
                  throw new Error("Could not fetch weather data") 
              }
              return await response.json();
          }
          function displayWeatherInfo(data)
          {
              const {name:city,
                main:{temp,humidity},
                weather:[{description,id}]}=data;
            cardEl.textContent="";
            cardEl.style.display="flex";

            const cityDisplay=document.createElement("h1")
            const tempDisplay=document.createElement("p")
            const humidityDisplay=document.createElement("p")
            const descDisplay=document.createElement("p")
            const weatherEmoji=document.createElement("p")
            cityDisplay.textContent=city
            tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
            humidityDisplay.textContent=`Humidity :${humidity}%`;
            
            descDisplay.textContent=description;
            weatherEmoji.textContent=getWeatherEmoji(id);

            cityDisplay.classList.add("cityDisplay");
            tempDisplay.classList.add("tempDisplay");
            humidityDisplay.classList.add("humidityDisplay");
            descDisplay.classList.add("descDisplay");
            weatherEmoji.classList.add("weatherEmoji");
            
            cardEl.appendChild(cityDisplay);
            cardEl.appendChild(tempDisplay);
            cardEl.appendChild(humidityDisplay);
            cardEl.appendChild(descDisplay);
            cardEl.appendChild(weatherEmoji);
          }
          function getWeatherEmoji(weatherId)
          {
            switch (true) {
                case (weatherId >=200 && weatherId<300):
                    return "⚡";
                    
                case (weatherId >=300 && weatherId<400):
                    return "🌧️";
                    
                case (weatherId >=400 && weatherId<500):
                    return "🌨️";
                    
                case (weatherId >=500 && weatherId<600):
                    return "❄️";
                    
                case (weatherId >=600 && weatherId<700):
                    return "☃️";
                    
                case (weatherId >=700 && weatherId<800):
                    return "🌫️";
                    
                case (weatherId >=700 && weatherId<800):
                    return "🌤️";
                    case (weatherId===800):
                        return "🌞"
                        
                    
                case (weatherId >800 && weatherId<810):
                    return "☁️";
            
                default:
                    return "❔"
                    break;
            }
          }
          function displayError(message)
          {
              const errorDisplayEl=document.createElement("p")
              errorDisplayEl.textContent=message;
              errorDisplayEl.classList.add("errorDisplay")
              cardEl.textContent="";
              cardEl.style.display="flex"
              cardEl.appendChild(errorDisplayEl);
          }

//The first four lines of code use the document.querySelector() method to select HTML elements with certain classes and store them in variables. The container variable stores the HTML element with a class of "container", search stores the HTML button element within an element with a class of "search-box", weatherBox stores the HTML element with a class of "weather-box", weatherDetails stores the HTML element with a class of "weather-details", and error404 stores the HTML element with a class of "not-found".//

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

//an event listener is added to the search button element that listens for a click event. When the button is clicked, the code inside the event listener is executed.//

search.addEventListener("click", async () => {
  // the code defines a constant APIKey with the API key required to make a request to the OpenWeatherMap API. Then, the city variable is set to the value of the input element with a class of "search-box". If the input is empty, the function returns and does nothing.//

  const APIKey = "fe85daf0bf0f3cd9ea3106e8cd67e6e7";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  // a fetch() request is made to the OpenWeatherMap API using the city variable and the APIKey constant. The response is converted to JSON format using the .json() method. If the response has a cod value of "404", the code inside the if statement is executed. This code sets the height of the container to 400 pixels, hides the weatherBox and weatherDetails HTML elements, and displays the error404 HTML element.//

  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then(async (response) => {
      const json = await response.json();
      console.log(json);

      if (json.cod === 404) {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return false;
      }

      //If the response is successful and does not have a cod value of "404", the code inside the else statement is executed. The error404 HTML element is hidden and the fadeIn class is removed. The code then uses the querySelector() method to select several HTML elements and store them in variables. These variables are used to display the weather information retrieved from the API. Finally, the weatherBox and weatherDetails HTML elements are displayed and the fadeIn class is added to both elements, and the container height is set to 590 pixels.//

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");
      // const dustomi = document.getElementById("dustomi");
      // dustomi.innerHTML = json.main.temp;
      //The first line sets the text content of an HTML element with the ID "temperature". The text is determined by a variable called "json" and contains the temperature in Celsius obtained from a weather API. The "parseInt()" function is used to convert the temperature from a string to an integer, and it's then surrounded by HTML tags that display the degree symbol.//

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;

      //The second line sets the text content of another HTML element with the ID "description". This text also comes from the "json" variable and contains a description of the weather (e.g., "sunny", "cloudy", "rainy", etc.).//
      description.innerHTML = `${json.weather[0].description}`;

      //The third line sets the text content of an HTML element with the ID "humidity". Again, this text comes from the "json" variable and contains the humidity percentage.//

      humidity.innerHTML = `${json.main.humidity}%`;

      //The fourth line sets the text content of an HTML element with the ID "wind". The text also comes from the "json" variable and contains the wind speed in kilometers per hour. Like before, the "parseInt()" function is used to convert the speed from a string to an integer.//

      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Thunderstorm":
          image.src = "images/thunderstorm.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        case "Mist":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }

      //The next four lines make some changes to the web page's style. The first two lines display two HTML elements with the IDs "weatherBox" and "weatherDetails", respectively, by changing their "display" CSS property to an empty string.//

      weatherBox.style.display = "";
      weatherDetails.style.display = "";

      //The last two lines add a CSS class to the same two HTML elements, "fadeIn". This class adds an animation to make the elements fade in smoothly when they are displayed.//

      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    })

    //Error handling with Catch method. The catch method is called on the Promise returned by the fetch method. If an error occurs during the API call, the catch method will catch the error and execute the provided function, which logs the error to the console and displays an error message on the web page.//

    .catch((error) => {
      console.log("There was an error with the API call:", error);
      container.style.height = "400px";
      weatherBox.style.display = "none";
      weatherDetails.style.display = "none";
      error404.style.display = "block";
      error404.classList.add("fadeIn");
    });
});

let weather = {
  apiKey: "API HERE",
  defaultCity: "delhi",

  fetchWeather: function () {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          fetch(
            `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${this.apiKey}&include=minutely`
          )
            .then((response) => response.json())
            .then((data) => this.displayCurrentWeather(data));
          fetch(
            `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${this.apiKey}`
          )
            .then((response) => response.json())
            .then((data) => {
              // Call different display functions based on your requirements
              this.displayForecastWeather1(data);
              this.displayForecastWeather2(data);
              this.displayForecastWeather3(data);
              this.displayForecastWeather4(data);
              this.displayForecastWeather5(data);
              this.displayForecastWeather6(data);
              this.displayForecastWeather7(data);
            });
        },
        (error) => {
          console.error("Error getting location:", error);
          this.fetchWeatherByCity(this.defaultCity);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      this.fetchWeatherByCity(this.defaultCity);
    }
  },

  fetchWeatherByCity: function (city) {
    fetch(
      `https://api.weatherbit.io/v2.0/current?city=${city}&key=${this.apiKey}&include=minutely`
    )
      .then((response) => response.json())
      .then((data) => this.displayCurrentWeather(data));

    fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Call different display functions based on your requirements
        this.displayForecastWeather1(data);
        this.displayForecastWeather2(data);
        this.displayForecastWeather3(data);
        this.displayForecastWeather4(data);
        this.displayForecastWeather5(data);
        this.displayForecastWeather6(data);
        this.displayForecastWeather7(data);
      });
  },

  formatDatetime(inputDate) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dateObj = new Date(inputDate);
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    let hour = dateObj.getHours();
    const minute =
      (dateObj.getMinutes() < 10 ? "0" : "") + dateObj.getMinutes();
    const period = hour >= 12 ? "pm" : "am";

    // Convert 24-hour format to 12-hour format
    if (hour > 12) {
      hour -= 12;
    } else if (hour === 0) {
      hour = 12;
    }

    const formattedDate = `${day}${this.getDaySuffix(
      day
    )} ${month} ${year} at ${hour}:${minute} ${period}`;

    return formattedDate;
  },
  // Function to get the day suffix (e.g., 1st, 2nd, 3rd, etc.)
  getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  },

  displayCurrentWeather: function (data) {
    // Display weather information in the HTML elements
    const weatherData = data.data[0]; // Accessing the weather data object

    const city = weatherData.city_name; // City name
    const temp = weatherData.temp; // Temperature
    const humidity = weatherData.rh; // Humidity
    const speed = weatherData.wind_spd; // Wind speed
    const description = weatherData.weather.description; // Weather description
    const icon = weatherData.weather.icon; // Weather icon code
    const datetime = weatherData.datetime; // Date and time
    const obtime = weatherData.ob_time;

    // Update HTML elements with weather information
    document.querySelector(".city").innerText = "Weather in " + city;
    document.querySelector(".icon").src =
      "https://cdn.weatherbit.io/static/img/icons/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " m/s";
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?landscape," + city + "')";
    document.querySelector(".obtime").innerText =
      "Date And Time: " + this.formatDatetime(obtime);
  },
  formatDate(datetime) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(datetime);
    const day = date.getDate();
    const month = months[date.getMonth()];

    // Function to get the ordinal suffix for the day (e.g., 1st, 2nd, 3rd, etc.)
    function getOrdinalSuffix(day) {
      if (day >= 11 && day <= 13) {
        return "th";
      }
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

    const ordinalSuffix = getOrdinalSuffix(day);
    const formattedDate = `${day}${ordinalSuffix} ${month}`;

    return formattedDate;
  },
  displayForecastWeather1: function (data) {
    const weatherData = data.data[1]; // Accessing the weather data object

    const temp = weatherData.temp; // Temperature
    const humidity = weatherData.rh; // Humidity
    const speed = weatherData.wind_spd; // Wind direction
    const description = weatherData.weather.description; // Weather description
    const icon = weatherData.weather.icon; // Weather icon code
    const datetime = weatherData.datetime; // Date and time

    document.querySelector(".city1").innerText =
      "Weather at " + this.formatDate(datetime);
    document.querySelector(".icon1").src =
      "https://cdn.weatherbit.io/static/img/icons/" + icon + ".png";
    document.querySelector(".description1").innerText = description;
    document.querySelector(".temp1").innerText = temp + "°C";
    document.querySelector(".humidity1").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind1").innerText =
      "Wind speed: " + speed + " m/s";
  },

  displayForecastWeather2: function (data) {
    const weatherData = data.data[2]; // Accessing the weather data object

    const temp = weatherData.temp; // Temperature
    const humidity = weatherData.rh; // Humidity
    const speed = weatherData.wind_spd; // Wind direction
    const description = weatherData.weather.description; // Weather description
    const icon = weatherData.weather.icon; // Weather icon code
    const datetime = weatherData.datetime; // Date and time

    document.querySelector(".city2").innerText =
      "Weather at " + this.formatDate(datetime);
    document.querySelector(".icon2").src =
      "https://cdn.weatherbit.io/static/img/icons/" + icon + ".png";
    document.querySelector(".description2").innerText = description;
    document.querySelector(".temp2").innerText = temp + "°C";
    document.querySelector(".humidity2").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind2").innerText =
      "Wind speed: " + speed + " m/s";
  },
  displayForecastWeather3: function (data) {
    const weatherData = data.data[3]; // Accessing the weather data object

    const temp = weatherData.temp; // Temperature
    const humidity = weatherData.rh; // Humidity
    const speed = weatherData.wind_spd; // Wind direction
    const description = weatherData.weather.description; // Weather description
    const icon = weatherData.weather.icon; // Weather icon code
    const datetime = weatherData.datetime; // Date and time

    document.querySelector(".city3").innerText =
      "Weather at " + this.formatDate(datetime);
    document.querySelector(".icon1").src =
      "https://cdn.weatherbit.io/static/img/icons/" + icon + ".png";
    document.querySelector(".description3").innerText = description;
    document.querySelector(".temp3").innerText = temp + "°C";
    document.querySelector(".humidity3").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind3").innerText =
      "Wind speed: " + speed + " m/s";
  },
  displayForecastWeather4: function (data) {
    const weatherData = data.data[4]; // Accessing the weather data object

    const temp = weatherData.temp; // Temperature
    const humidity = weatherData.rh; // Humidity
    const speed = weatherData.wind_spd; // Wind direction
    const description = weatherData.weather.description; // Weather description
    const icon = weatherData.weather.icon; // Weather icon code
    const datetime = weatherData.datetime; // Date and time

    document.querySelector(".city4").innerText =
      "Weather at " + this.formatDate(datetime);
    document.querySelector(".icon4").src =
      "https://cdn.weatherbit.io/static/img/icons/" + icon + ".png";
    document.querySelector(".description4").innerText = description;
    document.querySelector(".temp4").innerText = temp + "°C";
    document.querySelector(".humidity4").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind4").innerText =
      "Wind speed: " + speed + " m/s";
  },
  displayForecastWeather5: function (data) {
    const weatherData = data.data[5]; // Accessing the weather data object

    const temp = weatherData.temp; // Temperature
    const humidity = weatherData.rh; // Humidity
    const speed = weatherData.wind_spd; // Wind direction
    const description = weatherData.weather.description; // Weather description
    const icon = weatherData.weather.icon; // Weather icon code
    const datetime = weatherData.datetime; // Date and time

    document.querySelector(".city5").innerText =
      "Weather at " + this.formatDate(datetime);
    document.querySelector(".icon5").src =
      "https://cdn.weatherbit.io/static/img/icons/" + icon + ".png";
    document.querySelector(".description5").innerText = description;
    document.querySelector(".temp5").innerText = temp + "°C";
    document.querySelector(".humidity5").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind5").innerText =
      "Wind speed: " + speed + " m/s";

    document.querySelector(".weather").classList.remove("loading");
    document.querySelector(".weather1").classList.remove("loadingg");
  },
  displayForecastWeather6: function (data) {
    const weatherData = data.data[6]; // Accessing the weather data object

    const temp = weatherData.temp; // Temperature
    const humidity = weatherData.rh; // Humidity
    const speed = weatherData.wind_spd; // Wind direction
    const description = weatherData.weather.description; // Weather description
    const icon = weatherData.weather.icon; // Weather icon code
    const datetime = weatherData.datetime; // Date and time

    document.querySelector(".city6").innerText =
      "Weather at " + this.formatDate(datetime);
    document.querySelector(".icon6").src =
      "https://cdn.weatherbit.io/static/img/icons/" + icon + ".png";
    document.querySelector(".description6").innerText = description;
    document.querySelector(".temp6").innerText = temp + "°C";
    document.querySelector(".humidity6").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind6").innerText =
      "Wind speed: " + speed + " m/s";
  },
  displayForecastWeather7: function (data) {
    const weatherData = data.data[7]; // Accessing the weather data object

    const temp = weatherData.temp; // Temperature
    const humidity = weatherData.rh; // Humidity
    const speed = weatherData.wind_spd; // Wind direction
    const description = weatherData.weather.description; // Weather description
    const icon = weatherData.weather.icon; // Weather icon code
    const datetime = weatherData.datetime; // Date and time

    document.querySelector(".city7").innerText =
      "Weather at " + this.formatDate(datetime);
    document.querySelector(".icon7").src =
      "https://cdn.weatherbit.io/static/img/icons/" + icon + ".png";
    document.querySelector(".description7").innerText = description;
    document.querySelector(".temp7").innerText = temp + "°C";
    document.querySelector(".humidity7").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind7").innerText =
      "Wind speed: " + speed + " m/s";
  },

  search: function () {
    this.fetchWeatherByCity(document.querySelector(".search-bar").value);
  },
};

weather.fetchWeather();

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

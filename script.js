document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  
  const APIKEY = "bdd72fab33a87d3a7b35699420ff83f9";
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=" + APIKEY;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
	  document.getElementById("location_holder").innerHTML = 'Current Weather in ' + json.name;
	  
	  let description = json.weather[0].description;
	  description = description.charAt(0).toUpperCase() + description.slice(1);
	  
	  document.getElementById("description").innerHTML = description
	  document.getElementById("icon_holder").innerHTML = '<img class="icon_center" src="http://openweathermap.org/img/w/' + json.weather[0].icon + '.png"/>';
	  document.getElementById("wind_speed").innerHTML = '<strong>Wind Speed: </strong>' + json.wind["speed"];
	  document.getElementById("current_temp").innerHTML = '<strong>Current Temperature: </strong>' + json.main["temp"] + ' &deg;F';
	  document.getElementById("humidity").innerHTML = '<strong>Humidity: </strong>' + json.main["humidity"] + 'g/kg';
	  document.getElementById("feels_like").innerHTML = '<strong>Temperature Feels Like: </strong> ' + json.main["feels_like"] + ' &deg;F';
	  document.getElementById("pressure").innerHTML = '<strong>Pressure: </strong>' + json.main["pressure"] + ' Pa';
	  
      var direction = json.wind["deg"];
	  var directionString = "Error";
	  
	  if (direction > 23 && direction <= 68) {
		directionString = "Northeast";
	  }
	  else if (direction > 68 && direction <= 113) {
		directionString = "North";
	  }
	  else if (direction > 113 && direction <= 158) {
		directionString = "Northwest";
	  }
	  else if (direction > 158 && direction <= 203) {
		directionString = "West";
	  }
	  else if (direction > 203 && direction <= 248) {
		directionString = "Southwest";
	  }
	  else if (direction > 248 && direction <= 293) {
		directionString = "South";
	  }
	  else if (direction > 293 && direction <= 338) {
		directionString = "Southeast";
	  }
	  else {
		directionString = "East";
	  }
	  
	  document.getElementById("wind_direction").innerHTML = '<strong>Wind Direction: </strong>' + directionString;
	  document.getElementById("weatherResults").style.display = "block";
    });
	
  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=" + APIKEY;
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) { 
	  let day = 1;
	  let hour = 3;
	  let meridiumString = "am";
	  document.getElementById("day_" + day + "_label").innerHTML = moment(json.list[0].dt_txt).format('MMMM Do, YYYY')
	  
      for (let i=0; i < json.list.length; i++) {
	    let cellId = "day_" + day + "_" + hour + meridiumString;
	  
	    document.getElementById(cellId + "_low").innerHTML = json.list[i].main["temp_min"] + "&deg;F";
	    document.getElementById(cellId + "_high").innerHTML = json.list[i].main["temp_max"] + "&deg;F";
	    document.getElementById(cellId + "_icon").innerHTML = '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
		let description = json.list[i].weather[0].description;
		description = description.charAt(0).toUpperCase() + description.slice(1);
	    document.getElementById(cellId + "_description").innerHTML = description;
		
		hour = hour + 3;
		if (hour > 12) {
		  hour = hour - 12;
		  if (meridiumString == "am") {
			meridiumString = "pm";
		  }
		  else {
		    meridiumString = "am";
			day = day + 1;
			
			if (day != 6) {
			  document.getElementById("day_" + day + "_label").innerHTML = moment(json.list[i + 1].dt_txt).format('MMMM Do, YYYY')
			}
		  }
		}
      }
	  
	  document.getElementById("forecastResults").style.display = "block";
    });
});
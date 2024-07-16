fetchForecast = function () {
	var endpoint =
		"https://api.openweathermap.org/data/2.5/onecall?lat=38.7267&lon=-9.1403&exclude=current,hourly,minutely,alerts&units=metric&appid={f0389a22a6fd93b33a1ef6427eb6416d}";
	var forecastEl = document.getElementsByClassName("forecast");

	fetch(endpoint)
	.then(function (response) {
		if (200 !== response.status) {
			console.log(
				"Looks like there was a problem. Status Code: " + response.status
			);
			return;
		}

		forecastEl[0].classList.add('loaded');

		response.json().then(function (data) {
			var fday = "";
			data.daily.forEach((value, index) => {
				if (index > 0) {
					var dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
						weekday: "long",
					});
					var icon = value.weather[0].icon;
					var temp = value.temp.day.toFixed(0);
					fday = `<div class="forecast-day">
						<p>${dayname}</p>
						<p><span class="ico-${icon}" title="${icon}"></span></p>
						<div class="forecast-day--temp">${temp}<sup>°C</sup></div>
					</div>`;
					forecastEl[0].insertAdjacentHTML('beforeend', fday);
				}
			});
		});
	})
	.catch(function (err) {
		console.log("Fetch Error :-S", err);
	});
};



form.addEventListener( 'submit', function() {
	var weather;

	if ( 'IntersectionObserver' in window ) {
		weather = document.querySelectorAll('.weather');

		var weatherObserver = new IntersectionObserver( function( entries, observer ) {
			entries.forEach( function( entry ) {
				if ( entry.isIntersecting ) {
					if (entry.target.classList.contains('weather')) {
						fetchForecast();
					}
				}
			});
		}, {
			rootMargin: '0px 0px -120px 0px'
		});

		weather.forEach(function (s) {
			weatherObserver.observe(s);
		});
	}
});
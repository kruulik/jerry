$j(() => {
  const searchQuery = $j(".query");
  const submitButton = $j(".submit-button");
  const weatherDisplay = $j(".weather");

  submitButton.on('click', () => {
    $j('i').remove();
    let url = 'http://api.openweathermap.org/data/2.5/weather?';
    const APIkey = '40d4876b2c0f166f32c81dab63889301';
    let query = searchQuery.val();
    $j.ajax({
      method: 'GET',
      url: `http://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${APIkey}`,
      success: data => {
        receiveWeather(data);
      }
    });
  });

  receiveWeather = (data) => {
    let title, weather = JSON.parse(data).list;
    weather.forEach((datum, idx) => {
      if (datum.dt_txt.includes('12:00:00')) {
        title = datum.weather[0].main;
        day = new Date(datum.dt).getDay();
        makeUI(title, day, idx);
      }
    });
    console.log(weather);
  };

  makeUI = function(title, day) {
    let weatherDisplay = $j(".weather");
    let icon = `<i>${day}</i>`;
    weatherDisplay.append(icon);
    let el = $j('i');

    switch (title) {
      case "Clear":
        return el.addClass('fa fa-sun-o');
      case "Clouds":
        return el.addClass('fa fa-cloud');
      case "Rain":
        return el.addClass('fa fa-tint');
      case "Thunderstorm":
        return el.addClass('fa fa-bolt');
      default:
        return el.addClass('fa fa-meh-o');
    }
  };
});


const responseFunc = function(data) {
  console.log('response');
};

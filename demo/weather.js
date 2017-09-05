$j( () => {
  const searchQuery = $j(".query");
  const submitButton = $j(".submit-button");
  const weather = $j(".weather");

  submitButton.on('click', () => {
    let url = 'http://api.openweathermap.org/data/2.5/weather?';
    const APIkey = '40d4876b2c0f166f32c81dab63889301';
    let query = searchQuery.val();

    $j.ajax({
      method: 'GET',
      url: `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${APIkey}`

    });
  });

 });

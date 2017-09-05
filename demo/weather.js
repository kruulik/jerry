$j( () => {
  const searchQuery = $j(".query");
  const submitButton = $j(".submit-button");
  const weather = $j(".weather");

  submitButton.on('click', () => {
    let url = 'http://api.openweathermap.org/data/2.5/weather?';
    const APIkey = '';
    let query = searchQuery.val();

    $j.ajax({
      method: 'GET',
      url: `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${APIkey}`

    });
  });

 });

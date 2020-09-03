const token = "4fc049db594406eeb07d7bd5b94cddf43351e828";

var $country = $('#country');
var $region = $('#region');
var $city = $('#city');
var $street = $('#street');

$country.suggestions({
  token: token,
  type: "ADDRESS",
  count :10,
  constraints:{
    locations: {country: "*"}
  },
  bounds: "country",
  hint: false,
  /* Вызывается, когда пользователь выбирает одну из подсказок */
  onSelect: function(suggestion) {
    console.log(suggestion);
  }
});

$region.suggestions({
  token: token,
  type: "ADDRESS",
  bounds: "region-area",
  constraints: $country,
  /* Вызывается, когда пользователь выбирает одну из подсказок */
  onSelect: function(suggestion) {
      console.log(suggestion);
  }
});

$city.suggestions({
  token: token,
  type: "ADDRESS",
  hint: false,
  bounds: "city-settlement",
  constraints: $region,
  /* Вызывается, когда пользователь выбирает одну из подсказок */
  onSelect: function(suggestion) {
      console.log(suggestion);
  }
});

$street.suggestions({
  token: token,
  type: "ADDRESS",
  hint: false,
  bounds: "street-house",
  constraints: $city,
  /* Вызывается, когда пользователь выбирает одну из подсказок */
  onSelect: function(suggestion) {
      console.log(suggestion);
  }
});

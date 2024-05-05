$(document).ready(function () {
  $('input[type="checkbox"][data-id][data-name]').change(function () {
    const amenities = {};
    $('input[type="checkbox"][data-id][data-name]:checked').each(function () {
      const id = $(this).data('id');
      const name = $(this).data('name');
      amenities[id] = name;
    });
    const amenitiesList = Object.values(amenities).join(', ');
    $('.amenities h4').text(amenitiesList);
  });

  $.get('http://172.24.207.153:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  $.ajax({
    url: 'http://172.24.207.153:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      data.forEach(function (place) {
        const article = $('<article></article>');
        const title = $('<div class="title"></div>').append('<h2>' + place.name + '</h2>');
        const price = $('<div class="price_by_night"></div>').text('$' + place.price_by_night);
        const info = $('<div class="information"></div>').append('<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>').append('<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>').append('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>');
        const description = $('<div class="description"></div>').text(place.description);
        article.append(title).append(price).append(info).append(description);
        $('section.places').append(article);
      });
    }
  });
});

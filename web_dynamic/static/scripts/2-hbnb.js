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

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});

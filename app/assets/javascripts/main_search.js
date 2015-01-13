// This is the main search 

$(document).ready(function(){

  $("#bigDaddySearch").click(function(){
     event.preventDefault();

    // grab the params of the search form
    var query = $('#search_bands').val();
    
    // clear the div and the search field
    $("#bands_results").empty();
    $('#search_bands').val("");

    // "GET" request to send search params to echonest api
    var get_request = $.ajax({
      // sends the rq to the apisController
      beforeSend: function(){
        $('#bands_results').html("<img class='spinner' src='assets/loading.gif'>");
      },
      url: "apis/api",
      type: "get",
      dataType: "json",
      // encodeURIComponent removes the space b/t words & encodes it w a proper searchable symbol
      data: {band: encodeURIComponent(query)},
      success: function(data) {
        if (data.response.status.message == "Success") {
          $('#bands_results').html(""); // to put something in the html to end the success check
        } else { 
          $("#bands_results").html("<div class='no-results'>No matches for that artist.</div>");
        }
      }

    }); // ends echonest ajax rq// "GET" request to send search params to echonest api

    get_request.done(function(data){


      search_list_item = data['response']['artist']['name'];

      echo_id = data['response']['artist']['id'];

      // PARSING THE ECHONEST API DATA
      image = data['response']['artist']['images'][0];
      blogs = data['response']['artist']['blogs'].slice(0,2);
      blogsa = data['response']['artist']['blogs'][1];
      blogs1 = data['response']['artist']['blogs'].slice(0,2);
      blogs1a = data['response']['artist']['blogs'][1];
      reviews = data['response']['artist']['reviews'].slice(0,2);
      reviews1 = data['response']['artist']['reviews'].slice(0,2);
      news = data['response']['artist']['news'].slice(0,2);
      newsa = data['response']['artist']['news'][1];
      news1 = data['response']['artist']['news'].slice(0,2);
      news1a = data['response']['artist']['news'][1];
      urls = data['response']['artist']['urls'];
      urls1 = data['response']['artist']['urls'];
      urls2 = data['response']['artist']['urls'];
      // biographies = data['response']['artist']['biographies'][0];
      artist_location = data['response']['artist']['artist_location'];
      video = data['response']['artist']['video'].slice(0,1);

      var songkick_get_request = $.ajax({
        url: "apis/songkick",
        type: "get",
        dataType: "json",
        data: {band: encodeURIComponent(query)}
      }); 

      songkick_get_request.done(function(data){
        songkick_band_id = data['resultsPage']['results']['artist'][0]['displayName']
        on_tour = data['resultsPage']['results']['artist'][0]['onTourUntil'];
        tour_dates = data['resultsPage']['results']['artist'][0]['uri'];

         ////////////////////////////////////////// 
        ///////// search results display /////////
       //////////////////////////////////////////
      $('#bands_results').append("<div class='results_container'>" +
                                 "<div class='results_card'>" +
                                 "<p>" + search_list_item + "</p>" +
                                 "<img class='results_img' src='" + image.url + "'>" +
                                 "<div id='add_favorite'>Add " + search_list_item + " to your BandHub Corral</div></div></div>");

          $('#add_favorite').on('click', function(){
            $('#flip_container').remove().fadeOut(1000); // check to see if this is needed!!

            // TODO: turn this on
            $('#bands_results').append("<div class='success_message'>" + search_list_item + " successfully saved to your profile.<br>" +
                                              "Click 'View BandHub Page' button to see " + search_list_item + "'s details!</div>").slideDown("fast").delay(2500).fadeOut(500);
      ////////////////////////////////////////
            $('#bands_results').empty();

            var favorites = $.ajax({
              url: "bands/create",
              beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
              type: "POST",
              // assigns a new key value pair in params for ajax Favorite create
              data: {echo_id: echo_id,
                     songkick_band_id: songkick_band_id,
                     on_tour: on_tour,
                     tour_date: tour_dates}
            }).done(function(){
              
              showFavorites(); // displays the favorites page after favoriting action

            }); // ends favorites ajax

          }); // ends #add_favorite actions

    }); // ends songkick_get_request.done
    }); // ends START OF THE SHOW DISPLAY onclick

  }) // ends bigDaddySearch

});


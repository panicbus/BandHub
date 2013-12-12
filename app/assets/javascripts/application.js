// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require underscore
//= require_tree .


$(function(){
  $('#see_favorites').on('click', function(){
  $('#bands_results').empty();
    //// main profile favorites bandlist ////
    $.getJSON("bands/favorite").done(function(faves){
       console.log("Zing Bash!");
       console.log("//Favorites Data//");
      for (var i = 0; i < faves.length; i++){
        console.log(faves);
        $("<div data-id='" + faves[i]['name'] +
          "'>" + faves[i]['name'] +
          "</div>").hide().appendTo('#bands_results').fadeIn(1000);
      }; // end of loop
    }); // end of getJSON


    ////////////////////////////////////////
    ////////DELETE METHOD WILL GO HERE///////
    ////////////////////////////////////////

  }); // ends the see favorites onclick


  // $('#main_field').empty();
  $("#bigDaddySearch").on('click', function(){
    event.preventDefault();

    // grab the params of the search form
    var query = $('#search_bands').val();

    // "GET" request to send search params to echonest api
    var get_request = $.ajax({
      // sends the rq to the apisController
      url: "apis/api",
      type: "get",
      dataType: "json",
      // encodeURIComponent removes the space b/t words & encodes it w a proper searchable symbol
      data: {band: encodeURIComponent(query)}
       }); // ends echonest ajax rq// "GET" request to send search params to echonest api

    //// FIRST LIST OF BAND NAMES ////
    // clear the div and the search field
    $("#bands_results").empty();
    $("search_bands").val("");

    get_request.done(function(data){
      console.log(data);
      search_list_item = data['response']['artist']['name'];
      console.log("below is search_list_item= data[response][artist][name]")
      console.log(search_list_item);
      // image = data['response']['artist']['images'][0];
      // for (var i = 0; i < 5; i++){
        $('#bands_results').append("<div class='search_list_item'>" + search_list_item + "<div>");
        $('li').css('cursor', 'pointer');
      // } // ends for loop
    }) // ends get_request.done function



      //>>>START OF THE SHOW DISPLAY<<<
    $('#bands_results').on('click', '.search_list_item', function(){
      var id = $(this).attr('id');  // Nico, fix the ('id')

      $("#bands_results").empty();
      get_request.done(function(data){
      // console.log(data);
      // name = data['response']
      blogs = data['response']['artist']['blogs'].slice(0,2);
      reviews = data['response']['artist']['reviews'].slice(0,2);
      image = data['response']['artist']['images'][0];
      image_url = data['response']['artist'];
      news = data['response']['artist']['news'].slice(0,2);
      biographies = data['response']['artist']['biographies'][0];
      artist_location = data['response']['artist']['artist_location'];//['city']['country'];
      video = data['response']['artist']['video'].slice(0,1);

      // console.log(blogs);
      // console.log(reviews);
      console.log('below is image object')
      console.log(image);
      console.log('BOOM!');
      // console.log(reviews.url);

      var songkick_get_request = $.ajax({
      // sends the rq to the apisController for songkick
      url: "apis/songkick",
      type: "get",
      dataType: "json",
      data: {band: encodeURIComponent(query)}
       }); // ends songkick ajax rq

      songkick_get_request.done(function(data){
      // console.log(data);
      on_tour = data['resultsPage']['results']['artist'][0]['onTourUntil'];
      tour_dates = data['resultsPage']['results']['artist'][0]['uri'];

      console.log("the songkick api results")
      console.log(on_tour);
      console.log(tour_dates);

        // gets the first 2 items of the results
      $('#bands_results').append("<div class='band_name'>" + search_list_item + "</div>" +
                                 "<div class='band_photo'>" + "<img style='height: 200px; width: auto' src='" + image.url + "'></div>");

      if (on_tour == null){
        $('#bands_results').append("<div class='on_tour_div'>" + search_list_item + " is not currently on tour.</div>");
      } else {
        $('#bands_results').append("<div class='on_tour_div'>" + search_list_item + " is touring until: " + on_tour + ".</div>" +
                                   "<div class='tour_dates_link'><a href='" + tour_dates + "' target='_blank'>Click for tour dates and locations</a>.</div");
      };

      for (var i = 0; i < 2; i++){
        $('#bands_results').append("<div class='searchlist'>" +
                                  "<li><a href='" + blogs[i].url + "' target='_blank'>" + blogs[i]['name'] + "</a></li>" +
                                  "<li><a href='" + reviews[i].url + "' target='_blank'>" + reviews[i]['name'] + "</a></li>" +
                                  "<div>");
        $('li').css('cursor', 'pointer');
      }; // ends loop
        $('#bands_results').append("<button id='add_favorite'>Add Artist to Your Favorites!</button>");
          $('#add_favorite').on('click', function(){
            // event.stopPropagation();
            band_name = data['resultsPage']['results']['artist'][0]['displayName']

            console.log("////CLICK ON FAVE ARTIST ATTRIBUTES////")
            console.log("The band name is...", band_name);
            console.log("The blog is ..... ", blogs);
            console.log("The news is ..... ", news);
            console.log("The on_tour is ..... ", on_tour);
            console.log("The tour_dates is ..... ", tour_dates);
            console.log("The artist_location is ..... ", artist_location);
            console.log("The biographies is ..... ", biographies);
            console.log("The video is ..... ", video);
            console.log("///////////")

            var favorites = $.ajax({
              url: "bands/create",
              type: "POST",
              // assigns a new key value pair in params for ajax Favorite create
              data: {band_name: band_name, blogs: blogs,
                     image: image, image_url: image_url, news: news,
                     reviews: reviews, on_tour: on_tour, tour_dates: tour_dates,
                     biographies: biographies, artist_location: artist_location,
                     video: video}
              // success: showSuccessMessage
            }); // ends favorites ajax
          }); // ends #add_favorite actions
      ////////////////
    });  // ends songkick_get_request.done
    }); // ends first get_request.done
    }) // ends START OF THE SHOW DISPLAY onclick

  }) // ends bigDaddySearch

}) // ends main js function


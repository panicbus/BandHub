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
  // $('#main_field').empty();
  $("#bigDaddySearch").on('click', function(){
    event.preventDefault();

    // grab the params of the search form
    var query = $('#search_bands').val();

    // "GET" request to send search params to api
    var get_request = $.ajax({
      // sends the rq to the apisController
      url: "apis/api",
      type: "get",
      dataType: "json",
      // encodeURIComponent removes the space b/t words & encodes it w a proper searchable symbol
      data: {band: encodeURIComponent(query)}
       }); // ends ajax rq

    // clear the div and the search field
    $("#bands_results").empty();
    $("search_bands").val("");
    get_request.done(function(data){
      // console.log(data);
      blogs = data['response']['artist']['blogs'];
      reviews = data['response']['artist']['reviews'];
      image = data['response']['artist']['images'][0];

      console.log(blogs);
      console.log(reviews);
      console.log(image);
        // gets the first 2 items of the results
      $('#bands_results').append("<div class='band_photo'>" + "<img style='height: 200px; width: auto' src='" + image.url + "'></div>");
      for (var i = 0; i < 2; i++){
        $('#bands_results').append("<div class='searchlist'>" +
                                  "<li>" + blogs[i]['name'] + "</li>" +
                                  "<li>" + reviews[i]['name'] + "</li>" +
                                  "<div>");
        $('li').css('cursor', 'pointer');
      }; // ends loop
    }) // ends get_request function

  }) // ends bigDaddySearch





}) // ends main js function
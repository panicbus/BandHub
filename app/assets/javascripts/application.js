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


       // console.log("//Favorites Data//");
      for (var i = 0; i < faves.length; i++){
        // console.log('their official site ------------>');
        // console.log(faves[i]['urls']);
        // all the things get shoved into favorite_card divs
        var favorite_card = $("<div data-method='faves_card' data-id='" + faves[i]['id'] + "' class='favorite_card'></div>");


        $("<div class='band_photo_box' data-id='" + faves[i]['id'] +
          "'><p>" + faves[i]['name'] + "</p>" +
           "<p><div class='band_photo' data-id='" + faves[i]['id'] +
           "'>" + "<img style='height: 200px; width: auto' src='" + faves[i]['image'] + "'></div></p>" +
           "</div>").hide().appendTo(favorite_card).fadeIn(1000);



        if (faves[i]['on_tour'] == null || faves[i]['on_tour'] == ""){
                $(favorite_card).append("<div data-id='" + faves[i]['id'] + "' class='on_tour_box'>" + faves[i]['name'] + ": not currently on tour.</div>");
              } else {
                $(favorite_card).append("<div data-id='" + faves[i]['id'] + "' class='on_tour_box'>" + faves[i]['name'] + " is on tour until " + faves[i]['on_tour'] + "!<br>" +
                                           "<div class='tour_dates_link'><a href='" +
                                            faves[i]['tour_dates'] + "' target='_blank'>Click for tour dates and locations</a>.</div></div>").hide().appendTo('#bands_results').fadeIn(1000);;
              };
            // news and blogs
        $("<div data-id='" + faves[i]['id'] + "' class='news_box' data-id='" + faves[i]['name'] +
          "'>Recent news stories tagged with " + faves[i]['name'] + ":<br>" +
           "<a href='" + faves[i]['news'] + "' target='_blank'>" + faves[i]['news1'] + "</a><br><br>" +
           "Recent blog posts featuring " + faves[i]['name'] + ":<br>" +
           "<a href='" + faves[i]['blogs'] + "' target='_blank'>" + faves[i]['blogs1'] + "</a><br></div>" +
           "<div data-id='" + faves[i]['id'] + "' class='links_box'><p><a href='" + faves[i]['urls'] + "' target='_blank'>" + faves[i]['name'] + "'s offical website</a>.</p>" +
           "<p><a href='" + faves[i]['urls1'] + "' target='_blank'>" + faves[i]['name'] + " on Last.fm</a>.</p>" +
           "<p><a href='" + faves[i]['urls2'] + "' target='_blank'>Follow " + faves[i]['name'] + " on Twitter</a>.</p></div>" +
           // "<p><iframe id='ytplayer' type='text/html' width='300' height='200' src='" + faves[i]['video'] + "&output=embed&alt=jsonc' frameborder='0'/></p>" +
           "<br><div data-id='" + faves[i]['id'] + "' id='del_button'>" +
           "<button class='remove_favorite' data-method='delete' data-id='" + faves[i]['id'] +
           "'>Unfavorite</button>" +
           "</div>" + // ends del_button div
          "</div>").appendTo(favorite_card); // ends favorite_card div


        $('#bands_results').hide().append(favorite_card).fadeIn(1000); // appends all the favorite cards
      }; // end of for loop

      // fave card slide toggle
        $(document).ready(function(){
          $('.band_photo').on('click', function(event){
            console.log(this);
            console.log('fuck');

            var id = $(this).attr("data-id");
             // console.log('[data-id='+ id +']');
            $('.on_tour_box[data-id='+ id +']').slideToggle('slow');
            $('.news_box[data-id='+ id +']').slideToggle('slow');
            $('.links_box[data-id='+ id +']').slideToggle('slow');
          });
        }); // end fave card slide toggle

        //////////////////////////////
        ////////DELETE BUTTON////////
        /////////////////////////////

       $('.remove_favorite').on('click', function(event){

            var id = $(this).attr("data-id")
            $.ajax({
              url: "/bands/favorite/"+id,
              method: "DELETE",
              data: id
            }).done(function(){
              console.log(id);
        // this associates the entire .favorite_card with the [data-id='+ id +'] id .
            $('.favorite_card[data-id='+ id +']').fadeOut(1000, function(){
              $(this).remove();
              }); // ends .fadeOut remove function
            }) // ends .done
          }); //ends delete

    }); // end of getJSON

  }); // ends the see favorites onclick

  // START OF MAIN SEARCH
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
      // console.log("below is search_list_item= data[response][artist][name]")
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

      // PARSING ALL THE ECHONEST API DATA
      image = data['response']['artist']['images'][0];
      blogs = data['response']['artist']['blogs'].slice(0,2);
      blogs1 = data['response']['artist']['blogs'].slice(0,2);
      reviews = data['response']['artist']['reviews'].slice(0,2);
      reviews1 = data['response']['artist']['reviews'].slice(0,2);
      news = data['response']['artist']['news'].slice(0,2);
      news1 = data['response']['artist']['news'].slice(0,2);
      urls = data['response']['artist']['urls'];
      urls1 = data['response']['artist']['urls'];
      urls2 = data['response']['artist']['urls'];
      // biographies = data['response']['artist']['biographies'][0];
      artist_location = data['response']['artist']['artist_location'];
      video = data['response']['artist']['video'].slice(0,1);

      console.log('below is artist_location')
      console.log(urls);
      // console.log(reviews.url);

      var songkick_get_request = $.ajax({
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

        // the flip card show display
      $('#bands_results').append("<div id='flip_container'>" +
                                 "<div id='flip_card' class='shadow'>" +
                                 "<div class='front face'><p>" + search_list_item +
                                 "</p></div>" +
                                 "<div class='back face center'>" +
                                 "<img style='height: 200px; width: auto' src='" + image.url +
                                 "'><button id='add_favorite'>Add " + search_list_item + " to Your BandHub Corral</button></div>" +
                                 "</div></div></div>");


      // for (var i = 0; i < 2; i++){
      //   $('#bands_results').append("<div class='searchlist'>" +
      //                             "<li><a href='" + blogs[i].url + "' target='_blank'>" + blogs[i]['name'] + "</a></li>" +
      //                             "<li><a href='" + reviews[i].url + "' target='_blank'>" + reviews[i]['name'] + "</a></li>" +
      //                             "<div>");
      //   $('li').css('cursor', 'pointer');
      // }; // ends loop
      //   // $('#bands_results').append("<button id='add_favorite'>Add Artist to Your Favorites!</button>");
          $('#add_favorite').on('click', function(){
            $('#bands_results').empty().fadeOut(1000);
            console.log("slide");
            $('#bands_results').hide().append("<div class='success_message'>" + search_list_item + " successfully saved to your profile.<br>" +
                                              "Click 'View BandHub Page' button to see " + search_list_item + " along with all your saved bands!</div>").slideDown("fast").delay(3000).fadeOut(1000);

            band_name = data['resultsPage']['results']['artist'][0]['displayName']

            console.log("////CLICK ON FAVE ARTIST ATTRIBUTES////")
            console.log("The blog1 is...", blogs1);
            console.log("///////////")

            var favorites = $.ajax({
              url: "bands/create",
              type: "POST",
              // assigns a new key value pair in params for ajax Favorite create
              data: {band_name: band_name,
                     blogs: blogs,
                     blogs1: blogs1,
                     image: image,
                     news: news,
                     news1: news1,
                     reviews: reviews,
                     reviews1: reviews1,
                     urls: urls,
                     urls1: urls1,
                     urls2: urls2,
                     on_tour: on_tour,
                     tour_dates: tour_dates,
                     // biographies: biographies,
                     artist_location: artist_location,
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


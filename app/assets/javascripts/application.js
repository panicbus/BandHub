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
//= require_tree .


// helps with security authentication tokens
$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

// Kicks to the isotope (not Isotope) calls file //
$(function(){
  isotope();
});

var showFavorites = function(){
 //    //// Bandhub Corral data ////
    $.getJSON("bands/favorite").done(function(faves){

      for (var i = 0; i < faves.length; i++){

        var favorite_card = $("<div id='icard' data-method='faves_card' data-name='" + faves[i]['name'] + "' data-date='" + faves[i]['created_at'] + "' data-id='" + faves[i]['id'] + "' class='favorite_card'></div>");

        $("<div class='band_photo_box' data-name='" + faves[i]['name'] + "' data-date='" + faves[i]['created_at'] + "' data-id='" + faves[i]['id'] +
          "'><p class='name'>" + faves[i]['name'] + "</p>" +
           "<p><div class='band_photo' data-id='" + faves[i]['id'] +
           "'>" + "<img style='height: 200px; width: auto' src='" + faves[i]['image'] + "'></div></p>" +
           "</div>").hide().appendTo(favorite_card).fadeIn(1000);

        if (faves[i]['on_tour'] == "null" || faves[i]['on_tour'] == ""){
                $(favorite_card).append("<div data-id='" + faves[i]['id'] + "' class='on_tour_box'>" + faves[i]['name'] + " - not currently on tour.</div>");
              } else {
                $(favorite_card).append("<div data-id='" + faves[i]['id'] + "' class='on_tour_box'>" + faves[i]['name'] + " is on tour until " + faves[i]['on_tour'] + "!<br>" +
                                           "<div class='tour_dates_link'><a href='" +
                                            faves[i]['tour_dates'] + "' target='_blank'>Click for tour dates and locations</a>.</div></div>").hide().appendTo('#bands_results').fadeIn(1000);;
              }; // ends else
            // news and blogs
        $("<div data-id='" + faves[i]['id'] + "' class='news_box' data-id='" + faves[i]['name'] +
          "'>Recent news stories tagged with " + faves[i]['name'] + ":<br>" +
           "• <a href='" + faves[i]['news'] + "' target='_blank'>" + faves[i]['news1'] + "</a><br>" +
           "• <a href='" + faves[i]['newsa'] + "' target='_blank'>" + faves[i]['news1a'] + "</a><br><br>" +
           "Recent blog posts featuring " + faves[i]['name'] + ":<br>" +
           "• <a href='" + faves[i]['blogs'] + "' target='_blank'>" + faves[i]['blogs1'] + "</a><br>" +
           "• <a href='" + faves[i]['blogsa'] + "' target='_blank'>" + faves[i]['blogs1a'] + "</a><br></div>" +
           "<div data-id='" + faves[i]['id'] + "' class='links_box'><p><a href='" + faves[i]['urls'] + "' target='_blank'>" + faves[i]['name'] + "'s offical website</a>.</p>" +
           "<p><a href='" + faves[i]['urls1'] + "' target='_blank'>" + faves[i]['name'] + " on Last.fm</a>.</p>" +
           "<p><a href='" + faves[i]['urls2'] + "' target='_blank'>Follow " + faves[i]['name'] + " on Twitter</a>.</p></div>" +
           "<br><div data-id='" + faves[i]['id'] + "' id='del_button'>" +
           "<button class='remove_favorite' data-method='delete' data-id='" + faves[i]['id'] +
           "'>Remove</button>" +
           "</div>" + // ends del_button div
          "</div>").appendTo(favorite_card); // ends favorite_card div


        $('#bands_results').hide().append(favorite_card).fadeIn(1000); // appends all the favorite cards
      }; // end of for loop

      // FAVE CARD SLIDE TOGGLE ON IMG CLICK
        $(document).ready(function(){
           $('.horns').on('click', function(){ // close all
            $('.on_tour_box').slideUp('slow');
            $('.news_box').slideUp('slow');
            $('.links_box').slideUp('slow');
           }) // ending the close all function
          $('.band_photo').on('click', function(event){
            console.log(this);
            var id = $(this).attr("data-id");
             // console.log('[data-id='+ id +']');
            $('.on_tour_box[data-id='+ id +']').slideToggle('slow');
            $('.news_box[data-id='+ id +']').slideToggle('slow');
            $('.links_box[data-id='+ id +']').slideToggle('slow');
          }); // ends band_photo toggle
        }); /// end fave card slide toggle ///

        //////////////////////////////
        ////////DELETE BUTTON////////
        /////////////////////////////
       $('.remove_favorite').on('click', function(event){

            var id = $(this).attr("data-id");
            $.ajax({
              url: "/bands/favorite/"+id,
              method: "DELETE",
              data: id
            }).done(function(){

        // this associates the entire .favorite_card with the [data-id='+ id +'] id .
            $('.favorite_card[data-id='+ id +']').fadeOut(1000, function(){
              $(this).remove();
              }); // ends .fadeOut remove function
            }) // ends .done
          }); ///ends DELETE///

    }); // end of getJSON
  }

$(function(){

  // >--------THE SIDEBAR SEE_FAVES CLICK EVENT-------<
  $('#see_favorites').on('click', function(){
  $('#bands_results').empty();
    showFavorites();
  });

  // display the splash page on logo click
  $('.title').on('click', function(){
   window.location = '/';
  });

  // START OF MAIN SEARCH
  $("#bigDaddySearch").on('click', function(){
     event.preventDefault();

    // clear the div and the search field
    $("#bands_results").empty();
    $("search_bands").val("");

    // grab the params of the search form
    var query = $('#search_bands').val();

    // "GET" request to send search params to echonest api
    var get_request = $.ajax({
      // sends the rq to the apisController
      beforeSend: function(){
        $('#bands_results').html("<img style='margin: 100px auto 0px auto' src='assets/loading.gif'>");
      },
      url: "apis/api",
      type: "get",
      dataType: "json",
      // encodeURIComponent removes the space b/t words & encodes it w a proper searchable symbol
      data: {band: encodeURIComponent(query)},
      success: function(html){
          $('#bands_results').html(html);
        }
      }); // ends echonest ajax rq// "GET" request to send search params to echonest api


    get_request.done(function(data){

      search_list_item = data['response']['artist']['name'];

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
       }); // ends songkick ajax rq

      songkick_get_request.done(function(data){
      // console.log(data);
      on_tour = data['resultsPage']['results']['artist'][0]['onTourUntil'];
      tour_dates = data['resultsPage']['results']['artist'][0]['uri'];

        // the flip card show display
      $('#bands_results').append("<div id='flip_container'>" +
                                 "<div id='flip_card' class='shadow'>" +
                                 "<div class='front face'><p>" + search_list_item +
                                 "</p></div>" +
                                 "<div class='back face center'>" +
                                 "<img style='height: 200px; width: auto' src='" + image.url +
                                 "'><button id='add_favorite'>Add " + search_list_item + " to Your BandHub Corral</button></div>" +
                                 "</div></div></div>");

          $('#add_favorite').on('click', function(){
            $('#flip_container').remove().fadeOut(1000);

            $('#bands_results').append("<div class='success_message'>" + search_list_item + " successfully saved to your profile.<br>" +
                                              "Click 'View BandHub Page' button to see " + search_list_item + "'s details!</div>").slideDown("fast").delay(2500).fadeOut(500);
////////////////////////////////////////
              $('#bands_results').empty();


            band_name = data['resultsPage']['results']['artist'][0]['displayName']

            var favorites = $.ajax({
              url: "bands/create",
              beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
              type: "POST",
              // assigns a new key value pair in params for ajax Favorite create
              data: {band_name: band_name,
                     blogs: blogs,
                     blogsa: blogsa,
                     blogs1: blogs1,
                     blogs1a: blogs1a,
                     image: image,
                     news: news,
                     newsa: newsa,
                     news1: news1,
                     news1a: news1a,
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

            }).done(function(){
              showFavorites(); // displays the favorites page after favoriting action

            }); // ends favorites ajax

          }); // ends #add_favorite actions

    }); // ends songkick_get_request.done
    }); // ends START OF THE SHOW DISPLAY onclick

  }) // ends bigDaddySearch

}) // ends main js function


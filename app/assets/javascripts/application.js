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


    // clear the div and the search
    // $("bands_results").empty();
    // $("search_bands").val("");

    // loop to get band and id
    get_request.done(function(data){
      console.log(data)
      item = data["name"]
      for (var i = 0; i < item.length; i++){
        var idNumber = item[i]['name']
        $('bands_results').append("<li id=" + item[i]['name'] + " class='bandname'>" + item[i]['id'] + "</li>");
      $('li').css('cursor', 'pointer');
      } // ends loop
    }) // ends get_request function

  }) // ends bigDaddySearch





}) // ends main js function
/// Main function to display all user favorites ///

var showFavorites = function(){

  $.getJSON("bands/favorite").done(function(faves){
    if (faves == ""){
    	$('#bands_results').html("<div class='empty-corall-msg'>Your Corrall is empty. Add some bands!</div>");
    } else {

      // to set up default corral sort
      var dateArray = [];

      // parsing the json data
      for (var i = 0; i < faves.length; i++){

        createdAt       = faves[i].created_at;
        databaseId      = faves[i].database_id;
        bandId          = faves[i].echo_info.response.artist.id;
        bandName        = faves[i].echo_info.response.artist.name;
        bandImage       = faves[i].echo_info.response.artist.images[0].url;
        onTour          = faves[i].kick_info.resultsPage.results.artist[0].onTourUntil;
        tourDates       = faves[i].kick_info.resultsPage.results.artist[0].uri;
        newsOneLink     = faves[i].echo_info.response.artist.news[0].url;
        newsOneTitle    = faves[i].echo_info.response.artist.news[0].name;
        newsOneSummary  = faves[i].echo_info.response.artist.news[0].summary;
        newsTwoLink     = faves[i].echo_info.response.artist.news[1].url;
        newsTwoTitle    = faves[i].echo_info.response.artist.news[1].name;
        newsTwoSummary  = faves[i].echo_info.response.artist.news[1].summary;
        blogsOneLink    = faves[i].echo_info.response.artist.blogs[0].url;
        blogsOneTitle   = faves[i].echo_info.response.artist.blogs[0].name;
        blogsOneSummary = faves[i].echo_info.response.artist.blogs[0].summary;
        blogsTwoLink    = faves[i].echo_info.response.artist.blogs[1].url;
        blogsTwoTitle   = faves[i].echo_info.response.artist.blogs[1].name;
        blogsTwoSummary = faves[i].echo_info.response.artist.blogs[1].summary;
        officialWebsite = faves[i].echo_info.response.artist.urls.official_url;
        lastFm          = faves[i].echo_info.response.artist.urls.lastfm_url;
        bandTwitter     = faves[i].echo_info.response.artist.urls.twitter_url;

        // if ( onTour == undefined ) {

        // }
        // if ( onTour == undefined ) {

        // }
        // if ( tourDates == undefined ) {

        // }
        if ( newsOneLink == undefined || newsOneLink == null ) {
          $('.news_box').hide();
        } else {
          newsOneLink
        }
        // if ( newsOneTitle == undefined ) {

        // }
        // if ( newsOneSummary == undefined ) {

        // }
        // if ( newsTwoLink == undefined ) {

        // }
        // if ( newsTwoTitle == undefined ) {

        // }
        // if ( newsTwoSummary == undefined ) {

        // }
        // if ( blogsOneLink == undefined ) {

        // }
        // if ( blogsOneTitle == undefined ) {

        // }
        // if ( blogsOneSummary == undefined ) {

        // }
        // if ( blogsTwoLink == undefined ) {

        // }
        // if ( blogsTwoTitle == undefined ) {

        // }
        // if ( blogsTwoSummary == undefined ) {

        // }
        // if ( officialWebsite == undefined ) {

        // }
        // if ( lastFm == undefined ) {

        // }
        // if ( bandTwitter == undefined ) {

        // }


        // $( "#bands_results" ).error(function() {
        //   alert( "Handler for .error() called." );
        //   $( this ).hide();
        // }).attr( "content", "Nothing here" );

        var favorite_card = $("<div class='ui-state-default list-item'><div data-name='" + bandName +
        											"'data-date='" + createdAt +
        											"'data-id='" + databaseId +
        											"'><p class='name'><i class='fa fa-th draggy'></i>" + bandName + "</p></div>");

        $("<div class='band_photo_box' data-date='" + createdAt + "' data-id='" + bandId + "'>" +
           "<p><div title='Click for details' class='band_photo' data-id='" + databaseId +
           "'>" + "<img src='" + bandImage + "'></div></p>" +
           "</div>").hide().appendTo(favorite_card).fadeIn(500);

        if (onTour == null){
          $(favorite_card).append("<div data-id='" + databaseId + "' class='on_tour_box'>" + bandName + " - not currently on tour.</div>");
        } else {
          $(favorite_card).append("<div data-id='" + databaseId + "' class='on_tour_box'>" + bandName + " is on tour until " + onTour + "!<br>" +
                                  "<a href='" + tourDates + "' target='_blank'>Click for tour dates and locations</a>." +
                                  "</div>").hide().appendTo('#bands_results').fadeIn(500);
        }; // ends on tour if/else

        // news and blogs if and if not twitter
        if (bandTwitter == null){
         $("<div data-id='" + databaseId + "' class='news_box' data-id='" + bandName +
           "'>Recent news stories tagged with " + bandName + ":<br>" +
           "&#8226; <a href='" + newsOneLink + "' target='_blank'>" + newsOneTitle + "</a><br>" +
           "&#8226; <a href='" + newsTwoLink + "' target='_blank'>" + newsTwoTitle + "</a><br><br>" +
           "Recent blog posts featuring " + bandName + ":<br>" +
           "&#8226; <a href='" + blogsOneLink + "' target='_blank'>" + blogsOneTitle + "</a><br>" +
           "&#8226; <a href='" + blogsTwoLink + "' target='_blank'>" + blogsTwoTitle + "</a><br></div>" +
           "<div data-id='" + databaseId + "' class='links_box'><p><a href='" + officialWebsite + "' target='_blank'>" + bandName + "'s offical website</a>.</p>" +
           "<p><a href='" + lastFm + "' target='_blank'>" + bandName + " on Last.fm</a>.</p>" + bandName + " isn't on Twitter yet.</p></div>" +
           "<br><div class='remove_favorite' data-method='delete' data-id='" + databaseId +
           "'>Remove</div>" +
           "</div>" + // ends del_button div
          "</div></div>").appendTo(favorite_card);
        } else {
          $("<div data-id='" + databaseId + "' class='news_box' data-id='" + bandName +
           "'>Recent news stories tagged with " + bandName + ":<br>" +
           "&#8226; <a href='" + newsOneLink + "' target='_blank'>" + newsOneTitle + "</a><br>" +
           "&#8226; <a href='" + newsTwoLink + "' target='_blank'>" + newsTwoTitle + "</a><br><br>" +
           "Recent blog posts featuring " + bandName + ":<br>" +
           "&#8226; <a href='" + blogsOneLink + "' target='_blank'>" + blogsOneTitle + "</a><br>" +
           "&#8226; <a href='" + blogsTwoLink + "' target='_blank'>" + blogsTwoTitle + "</a><br></div>" +
           "<div data-id='" + databaseId + "' class='links_box'><p><a href='" + officialWebsite + "' target='_blank'>" + bandName + "'s offical website</a>.</p>" +
           "<p><a href='" + lastFm + "' target='_blank'>" + bandName + " on Last.fm</a>.</p><a href='" + bandTwitter + "' target='_blank'>Follow " + bandName + " on Twitter</a>.</p></div>" +
           "<br><div class='remove_favorite' data-method='delete' data-id='" + databaseId +
           "'>Remove</div>" +
           "</div>" + // ends del_button div
          "</div></div>").appendTo(favorite_card)};

        // $('#bands_results').masonry(); this makes the ajax request just die
        // $('#bands_results').hide().append(favorite_card).masonry( 'appended', favorite_card ); // appends all the favorite cards
        $('#bands_results').hide().append(favorite_card).fadeIn(300); // appends all the favorite cards

        dateArray.push(createdAt);


      }; // end of for loop
    }; // end of empty corral if statement

    // if there are any cards, sort by data-date
    if (faves.length > 0) {
      dateArray.sort();

      // targets all cards in on the page
      var cardList = $('#bands_results').children();

      // sorts the cards associated with each data-date
      cardList.sort(function (a, b) {
        if ($(a).find('div').attr('data-date') > $(b).find('div').attr('data-date')){
          return -1;
        }
        if ($(b).find('div').attr('data-date') > $(a).find('div').attr('data-date')){
          return 1;
        }
          return 0;
      });

      // puts em back on the page
      var appendAnim = function(items, index){
        $(items[index]).hide();
        $(items[index]).show();
        $('#bands_results').append(items[index])

        if(index < items.length ){
          appendAnim(items,index + 1);
        }
      }
      appendAnim(cardList,0)
    }


      ////////////////////////////
     ////////  DELETE  //////////
    ////////////////////////////
    $('.remove_favorite').click(function(event){

      var id = $(this).attr("data-id");
         console.log('this is the clicked data-id = '+ id +'');
      $.ajax({
        beforeSend:function(xhr){
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
          $('#loading').hide();
        },
        url: "/bands/favorite/"+ id,
        method: "DELETE",
        data: id
      }).done(function(faves){
        $('div[data-id='+ id +']').parent().fadeOut(500, function(){
	      	$(this).remove();
	      }); // ends fadeOut

      }); // ends .done

      // add message if faves is empty
      $.getJSON("bands/favorite").done(function(faves){
        if (faves == ""){
          $('#bands_results').html("<div class='empty-corall-msg'>Your Corrall is empty. Add some bands!</div>");
        }
      });

    }); ///ends DELETE///

  }); // ends getJSON

}


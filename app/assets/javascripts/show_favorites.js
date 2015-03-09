/// Main function to display all user favorites ///

var showFavorites = function(){

  $.getJSON("bands/favorite").done(function(faves){
    if (faves == ""){ 
    	$('#bands_results').html("<div class='empty-corall-msg'>Your Corrall is empty. Add some bands!</div>");
    } else {
      
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
      }; // end of for loop
    }; // end of empty corral if statement

    ///// FAVE CARD SLIDE TOGGLE ON IMG CLICK ////
    $(document).ready(function(){
      var $container = $('#container').masonry({
        columnWidth: '.list-item'
      });
      $container.on('click', '.band_photo', function(){
        var id = $(this).attr("data-id");
        // to keep the bottom of the opening div onscreen
        var scroll_to = $(this).offset().top + $(this).height() - 150;
        
        // if not active, open this div and close all the others.
        if (!$(this).parents('.list-item').hasClass("active")){
          $('.list-item').removeClass('active');
          $('.on_tour_box, .news_box, .links_box').slideUp(); 
          $('.on_tour_box[data-id='+ id +']').slideToggle();
          $('.news_box[data-id='+ id +']').slideToggle();
          $('.links_box[data-id='+ id +']').slideToggle();
          $(this).parents('.list-item').addClass('active'); 
          // to scroll to the bottom of the toggling div
          $('html, body').animate({
              scrollTop: scroll_to
          });
        } else {
          // if I am active, then close me!
          $('.on_tour_box, .news_box, .links_box').slideUp();          
          $('.list-item').removeClass('active');
        }
      });

      // close divs by clicking outside the tiles
      $(document).mouseup(function (e){
        var target = $(e.target);

        if (!target.hasClass('list-item') // if the target of the click isn't the tile...
          && target.parents('.list-item').length == 0)  // ... nor a descendant of the tile
          {
            $('.on_tour_box, .news_box, .links_box').slideUp();
          }
      });
    }); /// end fave card slide toggle ///


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


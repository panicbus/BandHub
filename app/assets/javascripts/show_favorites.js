/// Main function to display all user favorites ///

var showFavorites = function(){

  $.getJSON("bands/favorite").done(function(faves){

    if (faves == ""){ 
    	$('#bands_results').html("<div class='no-results'>Your Corrall is empty. Add some bands!</div>");
    } else {
  
      for (var i = 0; i < faves.length; i++){
 
        bandId = faves[i]['id'];
        bandName = faves[i]['name'];
        bandImage = faves[i]['image'];
        createdAt = faves[i]['created_at'];
        onTour = faves[i]['on_tour'];
        tourDates = faves[i]['tour_dates'];
        newsOneLink = faves[i]['news'];
        newsOneTitle = faves[i]['news1'];
        newsTwoLink = faves[i]['newsa'];
        newsTwoTitle = faves[i]['news1a'];
        blogsOneLink = faves[i]['blogs'];
        blogsOneTitle = faves[i]['blogs1'];
        blogsTwoLink = faves[i]['blogsa'];
        blogsTwoTitle = faves[i]['blogs1a'];
        officialWebsite = faves[i]['urls'];
        lastFm = faves[i]['urls1'];
        bandTwitter = faves[i]['urls2'];

        var favorite_card = $("<div class='ui-state-default list-item'><div data-name='" + bandName + 
        											"'data-date='" + createdAt + 
        											"'data-id='" + bandId + 
        											"'><p class='name'><i class='fa fa-th'></i>" + bandName + "</p></div>");

        $("<div class='band_photo_box' data-name='" + bandName + "' data-date='" + createdAt + "' data-id='" + bandId +
          "'>" +
           "<p><div title='Click for details' class='band_photo' data-id='" + bandId +
           "'>" + "<img src='" + bandImage + "'></div></p>" +
           "</div>").hide().appendTo(favorite_card).fadeIn(500);

        if (onTour == "null" || onTour == ""){
          $(favorite_card).append("<div data-id='" + bandId + "' class='on_tour_box'>" + bandName + " - not currently on tour.</div>");
        } else {
          $(favorite_card).append("<div data-id='" + bandId + "' class='on_tour_box'>" + bandName + " is on tour until " + onTour + "!<br>" +
                                  "<a href='" + tourDates + "' target='_blank'>Click for tour dates and locations</a>." + 
                                  "</div>").hide().appendTo('#bands_results').fadeIn(500);
        }; // ends if/else

        // news and blogs if and if not twitter 
        if (bandTwitter == null){
         $("<div data-id='" + bandId + "' class='news_box' data-id='" + bandName +
           "'>Recent news stories tagged with " + bandName + ":<br>" +
           "&#8226; <a href='" + newsOneLink + "' target='_blank'>" + newsOneTitle + "</a><br>" +
           "&#8226; <a href='" + newsTwoLink + "' target='_blank'>" + newsTwoTitle + "</a><br><br>" +
           "Recent blog posts featuring " + bandName + ":<br>" +
           "&#8226; <a href='" + blogsOneLink + "' target='_blank'>" + blogsOneTitle + "</a><br>" +
           "&#8226; <a href='" + blogsTwoLink + "' target='_blank'>" + blogsTwoTitle + "</a><br></div>" +
           "<div data-id='" + bandId + "' class='links_box'><p><a href='" + officialWebsite + "' target='_blank'>" + bandName + "'s offical website</a>.</p>" +
           "<p><a href='" + lastFm + "' target='_blank'>" + bandName + " on Last.fm</a>.</p>" + bandName + " isn't on Twitter yet.</p></div>" +
           "<br><div class='remove_favorite' data-method='delete' data-id='" + bandId +
           "'>Remove</div>" +
           "</div>" + // ends del_button div
          "</div></div>").appendTo(favorite_card); 
        } else {
          $("<div data-id='" + bandId + "' class='news_box' data-id='" + bandName +
           "'>Recent news stories tagged with " + bandName + ":<br>" +
           "&#8226; <a href='" + newsOneLink + "' target='_blank'>" + newsOneTitle + "</a><br>" +
           "&#8226; <a href='" + newsTwoLink + "' target='_blank'>" + newsTwoTitle + "</a><br><br>" +
           "Recent blog posts featuring " + bandName + ":<br>" +
           "&#8226; <a href='" + blogsOneLink + "' target='_blank'>" + blogsOneTitle + "</a><br>" +
           "&#8226; <a href='" + blogsTwoLink + "' target='_blank'>" + blogsTwoTitle + "</a><br></div>" +
           "<div data-id='" + bandId + "' class='links_box'><p><a href='" + officialWebsite + "' target='_blank'>" + bandName + "'s offical website</a>.</p>" +
           "<p><a href='" + lastFm + "' target='_blank'>" + bandName + " on Last.fm</a>.</p><a href='" + bandTwitter + "' target='_blank'>Follow " + bandName + " on Twitter</a>.</p></div>" +
           "<br><div class='remove_favorite' data-method='delete' data-id='" + bandId +
           "'>Remove</div>" +
           "</div>" + // ends del_button div
          "</div></div>").appendTo(favorite_card)};


        $('#bands_results').hide().append(favorite_card).fadeIn(500); // appends all the favorite cards
      }; // end of for loop
    }; // end of if statement

    ///// FAVE CARD SLIDE TOGGLE ON IMG CLICK ////
    $(document).ready(function(){
      $('.band_photo').click(function(){
        var id = $(this).attr("data-id");
        
        // if not active, open this div and close all the others.
        if (!$(this).parents('.list-item').hasClass("active")){
          $('.list-item').removeClass('active');
          $('.on_tour_box, .news_box, .links_box').slideUp(); 
          $('.on_tour_box[data-id='+ id +']').slideToggle();
          $('.news_box[data-id='+ id +']').slideToggle();
          $('.links_box[data-id='+ id +']').slideToggle();
          $(this).parents('.list-item').addClass('active'); 
        } else {
          // if I am active, then close me!
          $('.on_tour_box, .news_box, .links_box').slideUp();          
          $('.list-item').removeClass('active');
        }    
      }); // ends band_photo toggle

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
         // console.log('this is the clicked data-id = '+ id +'');
      $.ajax({
        url: "/bands/favorite/"+id,
        method: "DELETE",
        data: id
      }).done(function(faves){
        $('div[data-id='+ id +']').parent().fadeOut(500, function(){
	      	$(this).remove(); 
	      }); // ends .fadeOut 
     	  
      }); // ends .done  
      $.getJSON("bands/favorite").done(function(faves){
        if (faves == ""){ 
          $('#bands_results').html("<div class='no-results'>Your Corrall is empty. Add some bands!</div>");
        }
      });
    }); ///ends DELETE///
      

  }); // ends getJSON

}


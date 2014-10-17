/// Main function to display all user favorites ///

var showFavorites = function(){

  $.getJSON("bands/favorite").done(function(faves){

    if (faves == ""){ 
    	$('#bands_results').html("<div class='no-results'>Your Corrall is empty. Add some bands!</div>");
    } else {
  
      for (var i = 0; i < faves.length; i++){

        var favorite_card = $("<div class='ui-state-default list-item'><div data-method='faves_card' data-name='" + faves[i]['name'] + 
        											"'data-date='" + faves[i]['created_at'] + 
        											"'data-id='" + faves[i]['id'] + 
        											"'><p class='name'><i class='fa fa-th'></i>" + faves[i]['name'] + "</p></div>");

        $("<div class='band_photo_box' data-name='" + faves[i]['name'] + "' data-date='" + faves[i]['created_at'] + "' data-id='" + faves[i]['id'] +
          "'>" +
           "<p><div title='Click for details' class='band_photo' data-id='" + faves[i]['id'] +
           "'>" + "<img src='" + faves[i]['image'] + "'></div></p>" +
           "</div>").hide().appendTo(favorite_card).fadeIn(1000);

        if (faves[i]['on_tour'] == "null" || faves[i]['on_tour'] == ""){
          $(favorite_card).append("<div data-id='" + faves[i]['id'] + "' class='on_tour_box'>" + faves[i]['name'] + " - not currently on tour.</div>");
        } else {
          $(favorite_card).append("<div data-id='" + faves[i]['id'] + "' class='on_tour_box'>" + faves[i]['name'] + " is on tour until " + faves[i]['on_tour'] + "!<br>" +
                                  "<div class='tour_dates_link'><a href='" +
                                    faves[i]['tour_dates'] + "' target='_blank'>Click for tour dates and locations</a>.</div></div>").hide().appendTo('#bands_results').fadeIn(1000);
        }; // ends if/else

            // news and blogs
        // if (faves[i]['urls2'] != "null"){}    
        $("<div data-id='" + faves[i]['id'] + "' class='news_box' data-id='" + faves[i]['name'] +
          "'>Recent news stories tagged with " + faves[i]['name'] + ":<br>" +
           "&#8226;<a href='" + faves[i]['news'] + "' target='_blank'>" + faves[i]['news1'] + "</a><br>" +
           "&#8226;<a href='" + faves[i]['newsa'] + "' target='_blank'>" + faves[i]['news1a'] + "</a><br><br>" +
           "Recent blog posts featuring " + faves[i]['name'] + ":<br>" +
           "&#8226;<a href='" + faves[i]['blogs'] + "' target='_blank'>" + faves[i]['blogs1'] + "</a><br>" +
           "&#8226;<a href='" + faves[i]['blogsa'] + "' target='_blank'>" + faves[i]['blogs1a'] + "</a><br></div>" +
           "<div data-id='" + faves[i]['id'] + "' class='links_box'><p><a href='" + faves[i]['urls'] + "' target='_blank'>" + faves[i]['name'] + "'s offical website</a>.</p>" +
           "<p><a href='" + faves[i]['urls1'] + "' target='_blank'>" + faves[i]['name'] + " on Last.fm</a>.</p>" +
           "<p><a href='" + faves[i]['urls2'] + "' target='_blank'>Follow " + faves[i]['name'] + " on Twitter</a>.</p></div>" +
           "<br><div class='remove_favorite' data-method='delete' data-id='" + faves[i]['id'] +
           "'>Remove</div>" +
           "</div>" + // ends del_button div
          "</div>").appendTo(favorite_card); // ends favorite_card div


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
 
	      $('div[data-id='+ id +']').parent().fadeOut(1000, function(){
	      	$(this).remove(); 
          if (!faves.length){ 
            $('#bands_results').html("<div class='no-results'>Your Corrall is empty. Add some bands!</div>");
          }
	      }); // ends .fadeOut 
     	}) // ends .done

    }); ///ends DELETE///
          
  }); // ends getJSON
}


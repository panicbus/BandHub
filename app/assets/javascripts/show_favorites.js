/// Main function to display all user favorites ///

var showFavorites = function(){
 //    //// Bandhub Corral data ////
    $.getJSON("bands/favorite").done(function(faves){

      for (var i = 0; i < faves.length; i++){

        var favorite_card = $("<li class='ui-state-default list-item'><div data-method='faves_card' data-name='" + faves[i]['name'] + 
        											"'data-date='" + faves[i]['created_at'] + 
        											"'data-id='" + faves[i]['id'] + 
        											"'class='favorite_card'><p class='name'><i class='fa fa-th'></i>" + faves[i]['name'] + "</p></div>");

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
           "<br><div data-id='" + faves[i]['id'] + "' id='del_button'>" +
           "<div class='remove_favorite' data-method='delete' data-id='" + faves[i]['id'] +
           "'>Remove</div>" +
           "</div>" + // ends del_button div
          "</li></div>").appendTo(favorite_card); // ends favorite_card div


        $('#bands_results').hide().append(favorite_card).fadeIn(500); // appends all the favorite cards
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
        ////////  DELETE  ///////////
        /////////////////////////////
       $('.remove_favorite').on('click', function(event){

            var id = $(this).attr("data-id");
            alert("This will remove this artist from your favorites.")
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



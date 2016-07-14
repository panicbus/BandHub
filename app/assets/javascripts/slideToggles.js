///// FAVE CARD SLIDE TOGGLE ON IMG CLICK ////
$(document).ready(function(){
  $('#container').on('click', '.band_photo', function(){
    var id = $(this).attr("data-id");
    // to keep the bottom of the opening div onscreen
    var scroll_to = $(this).offset().top + $(this).height() - 150;

    // if not active, open clicked div and close all the others.
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
});
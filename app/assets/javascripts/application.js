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

// initialize the ajax loading spinner
$(function(){
  var $loading = $('#loading').hide();
  $(document)
    .ajaxStart(function () {
      $loading.show();
    })
    .ajaxStop(function () {
      $loading.hide();
  });
});


// make the about link happen in the sidebar
$(function(){
  $(document).ready(function() {
    $(".impatient").pageslide();
  });

  $('.about-link').click(function(e) {
    e.stopPropagation();
      if ($(e.target).is('[data-toggle=modal]')) {
        $($(e.target).data('target')).modal()
      }
  });
});

// >--------THE SIDEBAR SEE_FAVES CLICK EVENT-------<
$(function(){

  $('#see_favorites').click(function(){
    $(this).prop('disabled', true); // disables the see faves button after click
    $('#bands_results').empty();
    $('.its-required').empty(); // removes the empty search error message in nav if there is one

    sorting();
    showFavorites();

  });


  // display the splash page on logo click
  $('.title').click(function(){
   window.location = '/';
  });

  // jquery-ui drag & drop sort with handle
  $( "#bands_results" ).sortable({ handle: '.draggy' });

  $(document).on('click', function(){
    $('.navbar-collapse').collapse('hide');
  });

});

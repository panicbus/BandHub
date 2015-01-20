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

// to run the sort function in sorting.js //
$(function(){
  sorting();
});


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


  // MASONRY //
  var $container = $('#bands_results');

  // initialize
  $container.masonry({
    columnWidth: 200,
    itemSelector: '.list-item'
  });

  var msnry = $container.data('masonry');
    
  // jquery-ui drag & drop sort
  $( "#bands_results" ).sortable();
  $( "#bands_results" ).disableSelection();
  
}) 

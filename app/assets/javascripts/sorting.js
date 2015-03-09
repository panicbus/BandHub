function sorting(){
  $('#sort_by a').click(function(e){
    var sortAttr = $(this).attr('href').slice(1);
    e.preventDefault()

    var bands = $('#bands_results').children();

    bands.sort(function (a, b) {
      if ($(a).attr(sortAttr) > $(b).attr(sortAttr)){
        return 1;
      }
      if ($(b).attr(sortAttr) > $(a).attr(sortAttr)){
        return -1;
      }
        // a must be equal to b
        return 0;
    });
    console.log(bands);

    var appendAnim = function(items, index){
      // $(items[index]).hide();
      $(items[index]).show();
      // $(items[index]).fadeIn(500 + 300 * index);
      document.getElementById("bands_results").appendChild(items[index])

      if(index < items.length ){
        appendAnim(items,index + 1);
      }
    }

    appendAnim(bands,0)

    return false;
  });
  // $('#sort_by a').click(function(){
  //   var sortName = $(this).attr('href').slice(1);
  //   console.log(sortName)
  //   $('#bands_results').isotope({ sortBy: sortName });
  //   return false;
  // });

  // //   $('#sort_by a').click(function(){
  // //     var sortName = $(this).attr('href').slice(1);
  // //     $('.band_photo_box').isotope({ sortBy : sortDate });
  // //     return false;
  // // });

  //   $('#bands_results').isotope({
  //     getSortData: {
  //       name : function ( $elem ) {
  //          /// if this doesn't work try type and category instead of name
  //         return $elem.attr("data-name");
  //       }
  //     }
  //   });

  // $('.favorite_card').isotope({
  //   sortBy : 'name',   /// then change this to type and category
  //   sortAscending: false
  // })

  // $('.favorite_card').isotope({
  //   sortBy : 'date',
  //   sortAscending: false
  // })

};



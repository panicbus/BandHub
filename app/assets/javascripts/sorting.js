function sorting(){
  $('#sort_by a').click(function(e){
    // sets variable to only data-name and data-date (removes the href)
    var sortAttr = $(this).attr('href').slice(1);
    e.preventDefault()

    // targets all cards in on the page
    var bands = $('#bands_results').children();
    var theSortAttr = bands.find('div').attr(sortAttr);
    // var bandName = bands.findAttr;
    console.log("bands is " + bands);
    console.log("band name is " + theSortAttr);
    // debugger

    bands.sort(function (a, b) {
      // debugger

      if ($(a).find('div').attr(sortAttr) > $(b).find('div').attr(sortAttr)){
        return 1;
      }
      if ($(b).find('div').attr(sortAttr) > $(a).find('div').attr(sortAttr)){
        return -1;
      }        // a must be equal to b
        return 0;
    });

    var appendAnim = function(items, index){
      console.log("items[index] is " + items[index] + "********")
      console.log("items" + items)
      console.log("index " + index)
      $(items[index]).hide();
      // $(items[index]).show();
      $(items[index]).fadeIn(500 + 300 * index);
      $('#bands_results').append(items[index])

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



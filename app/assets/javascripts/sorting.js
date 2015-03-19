function sorting(){
  $('#sort_by a').click(function(e){
    // sets variable to only data-name and data-date (removes the href)
    var sortAttr = $(this).attr('href').slice(1);
    e.preventDefault()

    // targets all cards in on the page
    var bands = $('#bands_results').children();

    bands.sort(function (a, b) {
    
      if ($(a).find('div').attr(sortAttr) > $(b).find('div').attr(sortAttr)){
        return 1;
      }
      if ($(b).find('div').attr(sortAttr) > $(a).find('div').attr(sortAttr)){
        return -1;
      }
        return 0;
    });

    var appendAnim = function(items, index){
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
};





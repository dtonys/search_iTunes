$(document).ready(function(e){
  console.log('document ready');
  
  //select key DOM nodes only once
  var $results = $('#results');
  var $count = $('#count');
  var $li = $('.list-template');
  
  //keep track of result metadata
  var dataArray = [];
  
  //send request whenever user types key
  $('.search-wrap').on('keyup', function(e){
    var val = $('#search').val();
    if(val){
      $.ajax({
        url: "http://itunes.apple.com/search?term="+val,
        dataType: 'JSONP'
      }).done(function(data){
        console.log(data);
        $count.text(data.resultCount);
        $results.empty();
        dataArray = [];
        
        //for each results, add element to result list
        for(var i = 0, len = data.results.length; i < len; i++){
          var $new = $li.clone();
          dataArray.push(data.results[i]);
          $new.removeClass('hidden');
          $new.find('img').attr('src', data.results[i].artworkUrl100);
          $results.append($new);
        }
      })
      .fail(function(data){
        alert(data);
        console.log(data);
      });
    }
  });
  
  //When user clicks image, display all metadata
  $(document).on('click', '.list-template', function(e){
    alert(JSON.stringify(dataArray[$(this).index()]), undefined, 2);
  });
});
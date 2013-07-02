$(document).ready(function(e){
  console.log('document ready');
  
  //select key DOM nodes only once
  var $results = $('#results');
  var $count = $('#count');
  var $li = $('.list-template');
  
  //keep track of result metadata
  var dataArray = [];
  var resultList = [];
  var resultHtml = null;
  
  //send request whenever user types key
  $('.search-wrap').on('keyup', function(e){
    var val = $('#search').val();
    if(val){
      $.ajax({
        url: "http://itunes.apple.com/search?term="+val,
        dataType: 'JSONP'
      }).done(function(data){
        if(!data){
          alert('no data');
          return;
        }
        console.log(data);
        $count.text(data.resultCount);
        $resultHtml = null;
        $results.empty();
        dataArray = [];
        
        //for each results, add element to result list
        for(var i = 0, len = data.results.length; i < len; i++){
          var res = new result(data.results[i]);
          resultHtml += res.html;
          resultList.push(res);
          $results.append(res.html);
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

//result object
function result(data){
  this.data = data;
  this.artist = data.artistName
  this.image = data.artworkUrl100;
  this.url = data.artistViewUrl;
  this.html = '<li title="'+data.artistName+'><a href="'+data.artistViewUrl+
              '"><img src="'+this.image+'" /></a></li>';
}
var allIdeas = [];
var isAdmin = (window.location.search === "?cestquilepatron");

$(document).ready(onReady);

function vote(ideaId, score){
  score = score || 1;
  var idea = allIdeas[ideaId];
  console.log('voting for', idea);
  $.get('/api/vote', {idea_id: ideaId, title: idea.title, artist: idea.artist, score: score}, function(res){
    window.location.href = window.location.href; // reloading
  });
}

function appendIdea(cont, idea_id, title, artist, score){

  // Store the idea for data when voting
  allIdeas[idea_id] = {title: title, artist: artist}

  var ideaDom = '<li class="row">';

    ideaDom += '<div class="small-12 columns">';

      if(score !== undefined){
        ideaDom += '<a class="button right" onclick="vote(' + idea_id + ');">+1</a>';
      }
      else {
        ideaDom += '<a class="button right" onclick="vote(' + idea_id + ');">Ajouter</a>';    
      }

      // Admin
      if(isAdmin){
        ideaDom += ' <a class="button right" onclick="vote(' + idea_id + ', 100);">+100</a> ';        
        ideaDom += ' <a class="button right" onclick="vote(' + idea_id + ', -100);">-100</a> ';        
      }

      if(score !== undefined){
        ideaDom += '<span>' + score  + '</span>';        
      }

      ideaDom += '<em>' + artist + '</em>' + ' ';
      ideaDom += '<strong>' + title + '</strong>' + ' ';
    ideaDom += '</div>';


  ideaDom += '</li>';

  cont.append(ideaDom);

}

function onReady(){
  var $results = $('#results');

  $results.html("Loading...");

  // TODO : optimize : store the data in redis directly

  $.getJSON('/api/top', function(res){
    console.log('top ideas', res);

    $results.html("");

    for (var i = 0; i < res.length; i++) {

      var idea = res[i];
      appendIdea($results, idea.id, idea.title, idea.artist, idea.score);

    }
  });

  $("#searchForm").on('submit', function(e){
    e.preventDefault();

    $results.html("Searching...");
    allIdeas = [];

    var query = $("#search").val();

    console.log('searching for', query);

    DZ.api('/search', 'GET', {q: query, order: 'RANKING'}, function(res){
      console.log('got response : ', res);

      $results.html("");
      $('#title').html('Recherche : ' + query);

      $.each(res.data, function(index, idea){

        if(idea.readable && idea.type === "idea"){
          appendIdea($results, idea.id, idea.title, idea.artist.name);
        }

      });
    });

  });

  $("form#addIdea").on('submit', function(e){
    e.preventDefault();

    $results.html("Adding...");
    allIdeas = [];

    $.post('/api/add', $(this).serialize(), function(data) {

    });

  });
}
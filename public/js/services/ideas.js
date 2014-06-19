
angular.module('app').factory('ideas', function($rootScope, $api, $timeout, cooldowns, User){

  $rootScope.appLoaded = false;  

  // Idea model
  function Idea(opts) {
    this.id = opts.id;
    this.score = opts.score;
    this.body = opts.body;
    this.title = opts.title;
    this.cooldown = cooldowns.upvote(this);
    this.stars = opts.stars;
  }

  Idea.prototype.bump = function(score) {
    var idea = this;

    var bumpOne = function(){
      idea.score += 1;
      score -= 1;
      if(score > 0){
        $timeout(bumpOne, 30);        
      }
    };

    bumpOne();
  };

  // Current ideas, indexed by id
  var _ideas = {};

  // Bootstraping the playlist
  $api.ideas(function(data){
    _.each(data, function(ideaOpts){
      _ideas[ideaOpts.id] = new Idea(ideaOpts);
    });

    $rootScope.appLoaded = true;
  });

  // Monitor new incoming ideas
  $rootScope.$on('newIdea', function(e, ideaOpts){
    if (! _.has(_ideas, ideaOpts.id)) {
      _ideas[ideaOpts.id] = new Idea(ideaOpts);
    }
  });

  // Monitor removed ideas
  $rootScope.$on('removeIdea', function(e, ideaId){
    delete _ideas[ideaId];
  });

  // Handling upvotes
  $rootScope.$on('push', function(e, data){
    var idea = _ideas[data.ideaId];
    idea.bump(data.score - idea.score);
  });

  // Handling updates
  $rootScope.$on('update', function(e, data){
    _.each(data, function(idea){

      if (!!_ideas[idea.id]) {
        // Only stars could change...
        _ideas[idea.id].stars = idea.stars;
      }

    });
  });

  return _ideas;

});


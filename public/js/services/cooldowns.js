
angular.module('app').factory('cooldowns', function($rootScope){

  function Cooldown(opts){
    this.iconCode = opts.iconCode;
    this.action = opts.action;
    this.duration = opts.duration;
    this.color = opts.color;
    this.lastClick = opts.lastClick;
    this.idea = opts.idea;
    this.loading = false;
  }

  Cooldown.prototype.use = function(idea){

    idea = idea || this.idea;

    // Check if ok
    if( Date.now() < this.lastClick + this.duration ){
      return;
    }
    else {
      this.loading = true;

      // Update the idea (todo in services also ...)
      $rootScope.$emit(this.action, {ideaId: idea.id, cooldown: this});
    }

  };

  Cooldown.prototype.completion = function(){
    var delta = Date.now() - this.lastClick;

    if (delta >= this.duration){
      return 1;
    }
    else {
      return delta / this.duration;
    }
  };

  var lastClick = Date.now() - 50000;

  return {
    upvote: function(idea){
      return new Cooldown({ action: "push", iconCode: 0xf067, duration: 3000, color: '#39CCCC', lastClick: lastClick, idea: idea })
    }
  };

});
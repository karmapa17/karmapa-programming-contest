(function() {

  function Piano(id) {
    this.tones = ['3C', '3Cs', '3D', '3Ds', '3E', '3Es', '3F',
      '3Fs', '3G', '3Gs', '3A', '3As', '3B'];
    this.init(id);
  }
  Piano.prototype.play = function(key) {
    this.audios[key].pause();
    this.audios[key].currentTime = 0;
    this.audios[key].play();
  };
  Piano.prototype.init = function(id) {
    var audios = {};
    this.tones.forEach(function(key) {
      audios[key] = document.getElementById('tone-' + key);
    });
    this.audios = audios;
    this.divPiano = document.getElementById(id);
    this.divPiano.addEventListener('click', function(event) {
      event.stopPropagation();
      var key = event.target.getAttribute('data-key');
      if (key) {
        this.play(key);
      }
    }.bind(this), false);
  };

  var piano = new Piano('piano');

})();

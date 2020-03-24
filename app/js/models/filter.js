function Filter(key) {
  this.min = 1000
  this.max = 0
  this.key = key

  this.createUI = function() {
    $('<li class="range-slider" id="' + this.key + 'Slider">' + this.key + '<input type="text" class="js-range-slider"/></li>').appendTo('#filterList');
  }

  this.setupSlider = function(filter) {
    var $range = $("#" + this.key + "Slider").find(".js-range-slider")
    var step = 0.01
    if(filter.max > 1){
    	step = 1
    }
    $range.ionRangeSlider({
      skin: "flat",
      type: "double",
      min: filter.min,
      max: filter.max,
      from: filter.min,
      to: filter.max,
      onStart: updateInputs,
      onChange: updateInputs,
      step: step,
      force_edges: true,
      hide_min_max: true,
      hide_from_to: true
    });

    function updateInputs(data) {
      from = data.from;
      to = data.to;
      filter.min = data.from
      filter.max = data.to
      populateTable()
    }
  }
}
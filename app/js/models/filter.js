function Filter(key) {
  this.min = 1000
  this.max = 0
  this.key = key

  this.createUI = function() {
    $('<div class="range-slider" id="' + this.key + 'Slider">' + this.key + '<input type="text" class="js-range-slider"/></div>').appendTo('#sidebar');
  }

  this.setupSlider = function(filter) {
    var $slider = $("#" + this.key + "Slider")
    var $range = $slider.find(".js-range-slider"),
      $inputFrom = $slider.find(".js-input-from"),
      $inputTo = $slider.find(".js-input-to"),
      instance,
      min = filter.min,
      max = filter.max,
      from = 0,
      to = 0;
    var step = 0.01
    if(filter.max > 1){
    	step = 1
    }
    $range.ionRangeSlider({
      skin: "round",
      type: "double",
      min: min,
      max: max,
      from: filter.min,
      to: filter.max,
      onStart: updateInputs,
      onChange: updateInputs,
      step: step
    });
    instance = $range.data("ionRangeSlider");

    function updateInputs(data) {
      from = data.from;
      to = data.to;
      filter.min = data.from
      filter.max = data.to
      populateTable()
    }
  }
}
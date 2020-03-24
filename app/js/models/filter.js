function Filter(key) {
  this.min = Number.MAX_SAFE_INTEGER
  this.max = 0
  this.key = key
  this.createUI = function() {
    $('<li class="range-slider" id="' + this.key + 'Slider"><input type="text" class="js-range-slider"/></li>').appendTo('#filterList');
  }

  this.setupSlider = function(filter) {
    var $range = $("#" + this.key + "Slider").find(".js-range-slider")
    var step = 0.01
    if (filter.max > 1) {
      step = 1
    }
    $range.ionRangeSlider({
      skin: "flat",
      type: "double",
      min: filter.min,
      max: filter.max,
      from: filter.min,
      to: filter.max,
      onStart: onStart,
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

    function onStart(data) {
      addMarks(data.slider)
    }

    function addMarks($slider) {
      var name = filter.key.charAt(0).toUpperCase() + filter.key.slice(1)
      var html = '<span class="mylabel">' + name + '</span>';
      $slider.append(html);
    }
  }
}
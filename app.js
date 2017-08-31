var gap = 64;
var total = 64; //4*4*4

function calculateColor() {

  var color = $(".input-color")[0].value;
  var regEx = /[0-9A-Fa-f]{6}/g;
  if(regEx.test(color) && color.length == 6 ) {
    //fill the colour in the div
    var color = $(".input-color")[0].value;
    $(".input-color-box").css("background","#"+color);
    var r = parseInt(color[0]+color[1],16);
    var g = parseInt(color[2]+color[3],16);
    var b = parseInt(color[4]+color[5],16);
    var color_hsb = rgbToHsv(r,g,b);
    console.log(color_hsb);
    var h_rounded = Math.round(color_hsb[0]*10)/10;
    var s_rounded = color_hsb[1];
    if(s_rounded <= 0.5) {
      s_rounded = 0.5;
    }
    else {
      s_rounded = 1;
    }
    var b_rounded = color_hsb[2];
    if(b_rounded <= 0.5) {
      b_rounded = 0.5;
    }
    else {
      b_rounded = 1;
    }
    console.log(h_rounded,s_rounded,b_rounded);
    for(var i =0;i<color_lookup.length;i++) {
      if((color_lookup[i]["h"] == h_rounded) && (color_lookup[i]["s"] == s_rounded) && (color_lookup[i]["b"] == b_rounded) ) {
        $(".input-color-name").html(color_lookup[i].name);
      }
    }
  } else {
    alert('Please enter a valid hex colour value');
  }
}

function rgbToHsv(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h, s, v = max;

  var d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h, s, v];
}

function hsvToRgb(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return [ r * 255, g * 255, b * 255 ];
}

function pad(str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

$(document).ready(function() {
  //create rgb blocks
  // var colors = [];
  // for (var i = 0; i < 255; i += gap) {
  //   for (var j = 0; j < 255; j += gap) {
  //     for (var k = 0; k < 255; k += gap) {
  //       color = "#" + pad((+i).toString(16), 2) + pad((+j).toString(16), 2) + pad((+k).toString(16), 2);
  //       colors.push(color);
  //     }
  //   }
  // }
  // // console.log(colors);
  // for (var l = 0; l < total; l++) {
  //   var div = $("<div>");
  //   div.addClass("color-box");
  //   div.css("background", colors[l]);
  //   $(".container").append(div);
  // }

  //create hsb blocks
  var colors_hsb = [];
  for(var i =0;i<0.9;i+=0.05) {
    color_rgb = hsvToRgb(i,1,1);
    color = "#" + pad(Math.round(+color_rgb[0]).toString(16), 2) + pad(Math.round(+color_rgb[1]).toString(16), 2) + pad(Math.round(+color_rgb[2]).toString(16), 2);
    colors_hsb.push(color);
  }
  for (var i = 0; i < colors_hsb.length; i++) {
    var div = $("<div>");
    div.addClass("color-box-hsb");
    div.html(colors_hsb[i]);
    div.css("background", colors_hsb[i]);
    $(".container-hsb-1").append(div);
  }

  for(var i =0;i<0.9;i+=0.05) {
    color_rgb = hsvToRgb(i,0.5,1);
    color = "#" + pad(Math.round(+color_rgb[0]).toString(16), 2) + pad(Math.round(+color_rgb[1]).toString(16), 2) + pad(Math.round(+color_rgb[2]).toString(16), 2);
    colors_hsb.push(color);
  }
  for (var i = colors_hsb.length/2; i < colors_hsb.length; i++) {
    var div = $("<div>");
    div.addClass("color-box-hsb");
    div.html(colors_hsb[i]);
    div.css("background", colors_hsb[i]);
    $(".container-hsb-2").append(div);
  }

  for(var i =0;i<0.9;i+=0.05) {
    color_rgb = hsvToRgb(i,1,0.5);
    color = "#" + pad(Math.round(+color_rgb[0]).toString(16), 2) + pad(Math.round(+color_rgb[1]).toString(16), 2) + pad(Math.round(+color_rgb[2]).toString(16), 2);
    colors_hsb.push(color);
  }
  for (var i = colors_hsb.length*2/3; i < colors_hsb.length; i++) {
    var div = $("<div>");
    div.addClass("color-box-hsb");
    div.html(colors_hsb[i]);
    div.css("background", colors_hsb[i]);
    $(".container-hsb-3").append(div);
  }
});
console.log('hi', $)

// copied from http://stackoverflow.com/questions/10061414/changing-width-property-of-a-before-css-selector-using-jquery
var addRule = function(sheet, selector, styles) {
  if (sheet.insertRule) return sheet.insertRule(selector + " {" + styles + "}", sheet.cssRules.length);
  if (sheet.addRule) return sheet.addRule(selector, styles);
};

var setNumbering = function(o, levels, root) {
  if (!root) return;
  if (!levels) return;
  if (levels.length == 0) return;
  
  children = $(root).children(levels[0]);
  chopped = levels.slice(1);
  for (var i = 1; i <= children.length; i++) {
    addRule(document.styleSheets[0], levels[0]+"#"+$(children[i-1]).attr('id')+":before", "content: '" + o + i + "'");
    console.log(o + i, children[i-1]);
    setNumbering(o + i + ".", chopped, children[i-1]);
  }
}

$(document).ready(function() {
  var title = $(".page-inner h1").first().text();
  var numbering = title.match(/^(?:Chapter )?(\d*)?\./);
  var o = "";
  if (numbering !== null && numbering[1] !== undefined) {
    o = numbering[1] + ".";
  }
  setNumbering(o, ["h2", "h3", "h4"], $(".page-inner h1").first());

});

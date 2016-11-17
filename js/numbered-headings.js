
// copied from http://stackoverflow.com/questions/10061414/changing-width-property-of-a-before-css-selector-using-jquery
var addRule = function(sheet, selector, styles) {
  if (sheet.insertRule) return sheet.insertRule(selector + " {" + styles + "}", sheet.cssRules.length);
  if (sheet.addRule) return sheet.addRule(selector, styles);
};

var getNumbering = function(title) {
  var numbering = title.match(/^(?:Chapter )?(\d*)?\./);
  var o = "";
  if (numbering !== null && numbering[1] !== undefined) {
    o = numbering[1];
  }
  return o;
}

  p = $("section.normal").children("h1,h2,h3,h4");
  var o = [];
  $(p).each(function(idx, e) {
    if ($(e).is('h1')) o = [];
    else if ($(e).is('h2')) o = o.slice(0, 2);
    else if ($(e).is('h3')) o = o.slice(0, 3);
    else if ($(e).is('h4')) o = o.slice(0, 4);
    
    if ($(e).is('h1') && o.length < 1) o = [getNumbering($(e).text())];
    while ($(e).is('h2') && o.length < 2) o.push(0);
    while ($(e).is('h3') && o.length < 3) o.push(0);
    while ($(e).is('h4') && o.length < 4) o.push(0);


    if ($(e).is('h2') || $(e).is('h3') || $(e).is('h4')) o.push(o.pop() + 1);
    console.log(o);
    console.log(o.join('.'));
    var w = o.join('.');
    if (w[0] === '.') w = w.slice(1);
    addRule(document.styleSheets[0], "#"+$(e).attr('id')+":before", "content: '" + w + " '");
  });


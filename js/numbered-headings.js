console.log('hi', $)

function setNumbering(o, levels, root) {
  if (!root) return;
  if (!levels) return;
  if (levels.length == 0) return;
  
  children = $(root).child(levels[0]);
  chopped = levels.slice(1);
  for (var i = 0; i < children.length; i++) {
    console.log(o + i, children[i]);
    setNumbering(o + i + ".", chopped, children[i]);
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

module.exports = function (element, popularity) {
  var ctx = element.getContext('2d');
  var circ = Math.PI * 2;
  var quart = Math.PI / 2;
  var radius = 50;
  var posX = 90;
  var posY = element.height / 2;
  var end = (100 - popularity) / 100;

  ctx.font = "30px 'open sans'";
  ctx.textAlign = 'center';
  ctx.fillText(popularity + '%', posX, posY + 10);
  ctx.beginPath();
  ctx.strokeStyle = '#99CC33';
  ctx.lineCap = 'square';
  ctx.lineWidth = 10;
  ctx.arc(posX, posY, radius, 0, circ, false);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = '#AA0000';
  ctx.lineCap = 'square';
  ctx.lineWidth = 20;
  ctx.arc(posX, posY, radius, -(quart), ((circ) * end) - quart, false);
  ctx.stroke();

  return ctx;
};

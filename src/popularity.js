module.exports = function (element, start, end) {
  var ctx = element.getContext('2d');
  var circ = Math.PI * 2;
  var quart = Math.PI / 2;
  var position = 50;
  var size = 30;

  ctx.beginPath();
  ctx.strokeStyle = '#99CC33';
  ctx.lineCap = 'square';
  ctx.closePath();
  ctx.fill();
  ctx.lineWidth = 20.0;

  ctx.beginPath();
  ctx.arc(position, position, size, -(quart), ((circ) * end) - quart, false);
  ctx.stroke();

  return ctx;
}

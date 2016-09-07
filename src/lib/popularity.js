export default function (element, popularity) {
  if (!element) {
    return false;
  }
  let ctx = element.getContext('2d');
  let circ = Math.PI * 2;
  let quart = Math.PI / 2;
  let radius = 50;
  let posX = 90;
  let posY = element.height / 2;
  let end = popularity / 100;

  ctx.clearRect(0, 0, element.width, element.height);

  ctx.font = "30px 'open sans'";
  ctx.textAlign = 'center';
  ctx.fillText(popularity + '%', posX, posY + 10);

  ctx.beginPath();
  ctx.strokeStyle = '#ddd';
  ctx.lineCap = 'square';
  ctx.lineWidth = 10;
  ctx.arc(posX, posY, radius, 0, circ, false);

  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = '#99CC33';
  ctx.lineCap = 'square';
  ctx.lineWidth = 20;
  ctx.arc(posX, posY, radius, -(quart), ((circ) * end) - quart, false);
  ctx.stroke();

  return ctx;
};

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
let w = canvas.width;
let h = canvas.height;
const g = 9.8;
const no = 30;
//Bubble Object
function bubble() {
  this.r = 15;
  this.x = Math.random() * (w - this.r - this.r) + this.r;
  this.y = Math.random() * (h - this.r - this.r) + this.r;
  this.mass = 100;
  this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  this.Vx = Math.random() < 0.5 ? Math.random() * -10 : Math.random() * 10;
  this.Vy = Math.random() < 0.5 ? Math.random() * -10 : Math.random() * 10;
}
//Bubble Array
let bubbles = [];
//Function to fill array with different bubbles
function create_bubbles(no) {
  for (let i = 0; i < no; i++) {
    bubbles[i] = new bubble();
  }
}
//Function to draw Circle
function circle(width, height, radius, color) {
  ctx.beginPath();
  ctx.arc(width, height, radius, 0, Math.PI * 2, false);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}
//Function to detect Collision
function collision(x1, y1, r1, x2, y2, r2) {
  if (Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) <= r1 + r2) {
    return true;
  }
}
//Creating Bubbles
create_bubbles(no);
//Function to draw bubbles on canvas
function animate() {
  ctx.clearRect(0, 0, w, h);
  for (let i = 0; i < no; i++) {
    for (let j = i + 1; j < no; j++) {
      if (
        collision(
          bubbles[i].x,
          bubbles[i].y,
          bubbles[i].r,
          bubbles[j].x,
          bubbles[j].y,
          bubbles[j].r
        )
      ) {
        //velocity Change
        let temp = bubbles[i].Vx;
        bubbles[i].Vx = bubbles[j].Vx;
        bubbles[j].Vx = temp;
        temp = bubbles[i].Vy;
        bubbles[i].Vy = bubbles[j].Vy;
        bubbles[j].Vy = temp;
        //Bouncing Back
        let theta = Math.atan(
          (bubbles[i].y - bubbles[j].y) / (bubbles[i].x - bubbles[j].x)
        );
        if (theta < 0) {
          theta = -theta;
        }
        const midpointX = (bubbles[i].x + bubbles[j].x) / 2;
        const midpointY = (bubbles[i].y + bubbles[j].y) / 2;
        if (bubbles[i].x < bubbles[j].x) {
          bubbles[i].x = midpointX - bubbles[i].r * Math.cos(theta);
          bubbles[j].x = midpointX + bubbles[j].r * Math.cos(theta);
        } else if (bubbles[i].x > bubbles[j].x) {
          bubbles[i].x = midpointX + bubbles[i].r * Math.cos(theta);
          bubbles[j].x = midpointX - bubbles[j].r * Math.cos(theta);
        }
        if (bubbles[i].y < bubbles[j].y) {
          bubbles[i].y = midpointY - bubbles[i].r * Math.sin(theta);
          bubbles[j].y = midpointY + bubbles[j].r * Math.sin(theta);
        } else if (bubbles[i].y > bubbles[j].y) {
          bubbles[i].y = midpointY + bubbles[i].r * Math.sin(theta);
          bubbles[j].y = midpointY - bubbles[j].r * Math.sin(theta);
        } else {
          bubbles[i].y = midpointY - bubbles[i].r * Math.sin(theta);
          bubbles[j].y = midpointY + bubbles[j].r * Math.sin(theta);
        }
      }
    }
    if (bubbles[i].x < bubbles[i].r) {
      bubbles[i].x = bubbles[i].r;
      bubbles[i].Vx *= -1;
    } else if (bubbles[i].x > w - bubbles[i].r) {
      bubbles[i].x = w - bubbles[i].r;
      bubbles[i].Vx *= -1;
    }
    if (bubbles[i].y < bubbles[i].r) {
      bubbles[i].y = bubbles[i].r;
      bubbles[i].Vy *= -1;
    } else if (bubbles[i].y > h - bubbles[i].r) {
      bubbles[i].y = h - bubbles[i].r;
      bubbles[i].Vy *= -1;
    }
    bubbles[i].x += bubbles[i].Vx;
    bubbles[i].y += bubbles[i].Vy;
    circle(bubbles[i].x, bubbles[i].y, bubbles[i].r, bubbles[i].color);
  }
  setTimeout(animate, 17);
  //requestAnimationFrame(animate);
}
animate();
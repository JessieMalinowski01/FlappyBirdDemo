// Setup canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set game variables
var score = 0;
var frames = 0;
var pipes = [];
var bird = {
  x: 50,
  y: 150,
  speed: 0,
  gravity: 0.5,                            
  jump: 7,             
  radius: 10,
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = "#FFC0CB";
    ctx.fill();
    ctx.closePath();
  },
  flap: function() {
    this.speed = -this.jump;
  },
  update: function() {
    this.speed += this.gravity;
    this.y += this.speed;
  }
}

// Create pipes
function Pipe() {
  this.width = 50;
  this.top = Math.random() * 200 + 50;
  this.bottom = canvas.height - this.top - 100;
  this.x = canvas.width;
  this.draw = function() {
    ctx.fillStyle = "#008000";
    ctx.fillRect(this.x, 0, this.width, this.top);
    ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
  }
  this.update = function() {
    this.x -= 2;
  }
}

// Game loop
function loop() {
  frames++;
  if (frames % 100 == 0) {
    pipes.push(new Pipe());
  }
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  bird.draw();
  bird.update();
  pipes.forEach(function(pipe) {
    pipe.draw();
    pipe.update();
    if (bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + pipe.width && (bird.y - bird.radius < pipe.top || bird.y + bird.radius > canvas.height - pipe.bottom)) {
      location.reload();
    }
    if (pipe.x + pipe.width < 0) {
      pipes.shift();
      score++;
    }
  });
  ctx.fillStyle = "#000000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
  requestAnimationFrame(loop);
}

// User input
document.addEventListener("keydown", function(event) {
  if (event.keyCode == 32) {
    bird.flap();
  }
});

// Start game
loop();

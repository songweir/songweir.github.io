$(document).ready(function() {
    var canvas = $('#myCanvas');
    var context = canvas.get(0).getContext('2d');

    var canvasWidth = canvas.width();
    var canvasHeight = canvas.height();

    $(window).resize(resizeCanvas);

    function resizeCanvas() {
        canvas.attr('width', $(window).get(0).innerWidth);
        canvas.attr('height', $(window).get(0).innerHeight);

        canvasWidth = canvas.width();
        canvasHeight = canvas.height();
    }
    
    resizeCanvas();

    var playAnimation = true;

    var stopButton = $('#stopAnimation');
    var startButton = $('#startAnimation');

    startButton.hide();
    startButton.on('click', function() {
        playAnimation = true;
        stopButton.show();
        $(this).hide();

        animate();
    });

    stopButton.on('click', function () {
        playAnimation = false;
        startButton.show();
        $(this).hide();
    })

    var Asteroid = function (x, y, radius, vX, vY, aX, aY) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        //速度
        this.vX = vX;
        this.vY = vY;

        // 加速度
        this.aX = aX;
        this.aY = aY;

        // 准确的摩擦力计算很复杂，这里不做这没准确的计算，使用模拟系数来指定
    }

    var asteroids = new Array();

    for (var i = 0; i < 10; i++) {
        var x = 20 + Math.random() * (canvasWidth - 40);
        var y = 20 + Math.random() * (canvasHeight - 40);
        var radius = 5 + Math.random() * 10;

        var vX = Math.random() * 4 - 2;
        var vY = Math.random() * 4 - 2;

        var aX = Math.random() * 0.2 - 0.1;
        var aY = Math.random() * 0.2 - 0.1;

        asteroids.push(new Asteroid(x, y, radius, vX, vY, aX, aY));
    }

    function animate() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.fillStyle = 'rgba(255, 255, 255, 1)';

        var asteroidsLength = asteroids.length;
        for (var i = 0; i < asteroidsLength; i++) {
            var tmpAsteroid = asteroids[i];

            // 添加速度
            tmpAsteroid.x += tmpAsteroid.vX;
            tmpAsteroid.y += tmpAsteroid.vY;

            if (Math.abs(tmpAsteroid.vX) < 5) {
                tmpAsteroid.vX += tmpAsteroid.aX;
            }

            if (Math.abs(tmpAsteroid.vY) < 5) {
                tmpAsteroid.vY += tmpAsteroid.aY;
            }

            
            // 边界控制
            if (tmpAsteroid.x - tmpAsteroid.radius < 0) {
                tmpAsteroid.x = tmpAsteroid.radius;
                tmpAsteroid.vX *= -1;
                tmpAsteroid.aX *= -1;
            } else if (tmpAsteroid.x + tmpAsteroid.radius > canvasWidth) {
                tmpAsteroid.x = canvasWidth - tmpAsteroid.radius;
                tmpAsteroid.vX *= -1;
                tmpAsteroid.aX *= -1;                
            }
            if (tmpAsteroid.y - tmpAsteroid.radius < 0) {
                tmpAsteroid.y = tmpAsteroid.radius;
                tmpAsteroid.vY *= -1;
                tmpAsteroid.aY *= -1;                
            } else if (tmpAsteroid.y + tmpAsteroid.radius > canvasHeight) {
                tmpAsteroid.y = canvasHeight - tmpAsteroid.radius;
                tmpAsteroid.vY *= -1;
                tmpAsteroid.aY *= -1;                    
            }


            context.beginPath();
            context.arc(tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, 0, Math.PI * 2, false);
            context.closePath();
            context.fill();
        }

        if (playAnimation) {
            setTimeout(animate, 24);
        }
    }
    animate();
})
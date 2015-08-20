!(function(win, undef) {
    'use strict';

    var loopGame,
        loopPipes,
        doc = win.document,

    config = {
        replayClickable: false,
        currentState: 0,
        score: 0,
        highScore: 0,

        gravity: 0.25,
        velocity: 0,
        position: 180,
        rotation: 0,
        jump: -4.6,

        states: Object.freeze({
            SplashScreen: 0,
            GameScreen: 1,
            ScoreScreen: 2
        })
    },

    _pipe = {
        pipeHeight: 90,
        pipeWidth: 52,
        pipes: []
    },

    _flappy = {
        init: function() {
            var _this = this;

            _this.showSplash();

            doc.addEventListener('touchstart', function() {
                _this.screenClick();
            });

            _this.bindReplay();
        },

        bindReplay: function() {
            var _this = this,
                $scoreBoard = doc.querySelector('.score-board');

            $scoreBoard.addEventListener('click', function(e) {
                if (!config.replayClickable) {
                    return;
                } else {
                    config.replayClickable = false;
                }

                $scoreBoard.classList.remove('fade-in');

                _this.showSplash();
            });
        },

        showSplash: function() {
            var _this = this,
                $splash = doc.querySelector('.splash'),
                $bird = doc.querySelector('.bird'),
                $pipes = doc.querySelectorAll('.pipe'),
                $animateds = doc.querySelectorAll('.animated');

            config.currentState = config.states.SplashScreen;
            config.velocity = 0;
            config.position = 180;
            config.rotation = 0;
            config.score = 0;

            $bird.style.transform = 'rotate(' + config.rotation + 'deg)'; 
            $bird.style.top = config.position + 'px';

            [].forEach.call($pipes, function(i) {
                i.remove();
            });
            _pipe.pipes = [];

            [].forEach.call($animateds, function(i) {
                i.style.animationPlayState = 'running';
            });

            $splash.classList.add('fade-in');
        },

        screenClick: function() {
            var _this = this;

            if (config.currentState === config.states.GameScreen) {
                _this.birdFly();
            } else if (config.currentState === config.states.SplashScreen) {
                _this.startGame();
            }
        },

        birdFly: function() {
            config.velocity = config.jump;
            // TODO fly sound to add
        },

        startGame: function() {
            var _this = this,
                $splash = doc.querySelector('.splash');

            config.currentState = config.states.GameScreen;

            $splash.classList.remove('fade-in');

            loopGame = setInterval(function() {
                _this.game();
            }, 1000.0 / 60.0); //60 times a second
            loopPipes = setInterval(function() {
                _this.updatePipes();               
            }, 1400);

            _this.birdFly();
        },

        game: function() {
            var _this = this,
                $bird = doc.querySelector('.bird'),
                $ceiling = doc.querySelector('.ceiling');

            config.velocity += config.gravity;
            config.position += config.velocity;

            // update bird
            config.rotation = Math.min((config.velocity / 10) * 90, 90);
            $bird.style.transform = 'rotate(' + config.rotation + 'deg)'; 
            $bird.style.top = config.position + 'px';

            // create bounding box
            var box = $bird.getBoundingClientRect(),
                originWidth = 34.0,
                originHeight = 24.0,

                boxWidth = originWidth - (Math.sin(Math.abs(config.rotation) / 90) * 8),
                boxHeight = (originHeight + box.height) / 2,
                boxLeft = (box.width - boxWidth) / 2 + box.left,
                boxTop = (box.height - boxHeight) / 2 + box.top,
                boxRight = boxLeft + boxWidth,
                boxBottom = boxTop + boxHeight;

            // hit the ground
            if (box.bottom >= doc.querySelector('.land').offsetTop) {
                _this.birdDead();
                return;
            }

            // no permmit escape ceiling
            if (boxTop <= ($ceiling.getBoundingClientRect().top + $ceiling.clientHeight)) {
                config.position = 0;
            }

            if (_pipe.pipes[0] == null) {
                return;
            }

            var nextPipe = _pipe.pipes[0],
                nextPipeUpper = nextPipe.querySelector('.pipe-upper'),
                // pipeTop = nextPipeUpper.offsetTop + nextPipeUpper.clientHeight,
                // pipeLeft = nextPipeUpper.offsetLeft - 2,
                // jquery offset().left  === getBoundClientRect.left not offsetleft
                pipeTop = nextPipeUpper.getBoundingClientRect().top + nextPipeUpper.clientHeight,
                pipeLeft = nextPipeUpper.getBoundingClientRect().left - 2,
                pipeRight = pipeLeft + _pipe.pipeWidth,
                pipeBottom = pipeTop + _pipe.pipeHeight;

            if (boxRight > pipeLeft) {
                if (boxTop > pipeTop && boxBottom < pipeBottom) {
                } else {
                    _this.birdDead();
                }
            }

            if (boxLeft > pipeRight) {
                _pipe.pipes.splice(0, 1);
            }
        },

        updatePipes: function() {
            var $pipes = doc.querySelectorAll('.pipe'),
                $flyArea = doc.querySelector('.flyarea'),

                outs = [].filter.call($pipes, function(p) {
                    return p.offsetLeft <= -100;
                });

            outs.forEach(function(e) {
                e.parentNode.removeChild(e);
            });

            var padding = 80,
                constraint = 420 - _pipe.pipeHeight - (padding * 2),
                topHeight = Math.floor((Math.random() * constraint) + padding),
                bottomHeight = 420 - _pipe.pipeHeight - topHeight,

                newPipe = parDom('<div class="pipe animated">' +
                                    '<div class="pipe-upper" style="height: ' + topHeight + 'px;"></div>' +
                                    '<div class="pipe-lower" style="height: ' + bottomHeight + 'px;"></div>' +
                                '</div>');

            $flyArea.appendChild(newPipe);
            _pipe.pipes.push(newPipe);

            function parDom(arg) {
                var objE = doc.createElement("div");
            　　objE.innerHTML = arg;
            　　return objE.childNodes[0];
            }
        },

        birdDead: function() {
            var _this = this,
                $animateds = doc.querySelectorAll('.animated');

            // all animating dom stop
            [].forEach.call($animateds, function(i) {
                i.style.animationPlayState = 'paused';
            });

            config.currentState = config.states.ScoreScreen;

            clearInterval(loopGame);
            clearInterval(loopPipes);
            loopGame = null;
            loopPipes = null;

            _this.showScore();
        },

        showScore: function() {
            var $scoreBoard = doc.querySelector('.score-board');

            $scoreBoard.style.display = 'block';
            $scoreBoard.classList.add('fade-in');

            config.replayClickable = true;
        }
    };

    _flappy.init();
})(window);

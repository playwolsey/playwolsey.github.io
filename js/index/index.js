;(function($, win, undef) {
    var lazyLoad = function(obj) {
        this.container = obj.container || $("body");
        this.nodeName = obj.node || ".lazyload";
        this.init = function() {
            var _this = this;

            //懒加载背景图
            //懒加载img图
            $(this.container).find(_this.nodeName).each(function() {
                var src = $(this).attr("data-src"),
                    bg = $(this).attr("data-bg");

                bg ? $(this).css("background-image","url("+bg+")") : "";
                src ? $(this).attr('src', src) : "";
            });
            
            delete this;
        };

        this.init();
    };

    var anim = function(index) {
        //先移除所有动画样式，再给每一屏加进去，有几屏动画就有几个case，注意动画的class要先移除
        (function(){$(".removeable").removeClass("animated delay1 delay2 fadeIn scall");})();

        //if ($(".box0-anim").get(index) && $(".box0_1-anim").get(index)) {
        //    $(".box0-anim").get(index).addClass("delay1 fadeIn animated");
        //    $(".box0_1-anim").get(index).addClass("delay2 fadeIn animated");
        //}

        if (index === 15) {
            //$(".last-admin").addClass("scall animated");
            $('.next-icon').hide();
        }
    };

    var remResize = {
        init: function() {
            var _this = this;

            $(win).on('resize', function() {
                _this.initPage();
            });

            _this.initPage();
        },

        initPage: function() {
            $("html").css("font-size", $(win).width()/640*100 + "px");
            $(".cps-container").fadeIn(.3);
        }
    };

    var _music = {
        _isAutoPlayed: false,
        audioObj: document.querySelector('audio'),
        playMusic: function() {
            $('.u-globalAudio').css('background-image','url(/img/index/play.png")');
            this.audioObj.play();
        },
        pauseMusic: function() {
            $('.u-globalAudio').css('background-image','url(/img/index/pause.png)');
            this.audioObj.pause();
        },
        init: function() {
            var _this=this;

            $('.u-globalAudio').on("click",function(){
                if(_this.audioObj.paused) {
                    _this.playMusic();
                } else {
                    _this.pauseMusic();
                }
            });   
        }
    };

    var config = {
        isDebug: false,
        mainBox: ".main-box",
        log: function(a) {
            if (config.isDebug) {
                console.log(a);
            }
        },
        init: function() {
            var _this = this;

            //初始化高度
            $(_this.mainBox).height($(win).height());
            $(_this.mainBox).find(".box-wrapper").height($(win).height());

            //初始化第一屏动画
            remResize.init();
            anim(0);
            new lazyLoad({
                container: $(_this.mainBox).get(1)
            });

            //播放音频
            $("body").on("touchstart",function() {
                !_music._isAutoPlayed ?
                    (function() {
                         _music.init();
                         _music._isAutoPlayed = true;
                         _music.playMusic();
                    })() : "";
            });
        }
    };

    config.init();

    //移动相关对象
    var _move = {
        distance: 0, //手指划过的距离
        touchtime: 0, //触摸的次数，避免多指触摸
        index: 0, //当前滚屏的索引值
        per: 0 //滚动时候改变高度的百分比
    },

    _touch = {
        init: function() {
            //通过循环给每一屏绑定触摸事件,注意节点的角标序号
            for (var i = 0, len = $(config.mainBox).length; i < len; i++) {
                this.touch(".main-box-" + i, i);
            }

            //$(".to_link").on("click", function() {
            //    var url = $(this).attr("href");
            //    location.href=url;
            //});
        },

        touch: function(el, index) {
            var y1 = 0,
                y2 = 0;

            $(el).on('touchstart', function(e) {
                //按下的时候记录索引值，阻止默认事件
                _move.index = index;
                e.preventDefault();

                y1 = e.targetTouches[0].pageY;

                _move.distance = 0;
                _move.touchtime += 1;
            });

            $(el).on('touchend', function(e) {
                //触摸结束的时候
                y2 = e.changedTouches[0].pageY;
                _move.distance = y2 - y1;

                $(el).next(config.mainBox) ?
                    new lazyLoad({container:$(el).next(config.mainBox).next(config.mainBox)}) :
                    "";

                // 判断几个点触摸，大于2个的时候不执行后续操作
                if (_move.touchtime >= 2) {
                    _move.touchtime = 0;
                    return false;
                }
                e.preventDefault();
                _move.touchtime = 0;

                if (_move.distance < 0) {
                    //向上滑，滚至下一张
                    if ($(el).next(config.mainBox).length > 0) {
                        $(el).addClass("fadeOutUp animated");
                        setTimeout(function() {
                            anim(index + 1);
                        }, 1000);
                    }
                } else if (_move.distance > 0) {
                    //向下滑
                    if ($(el).prev(config.mainBox)) {
                        $(el).prev(config.mainBox).removeClass("fadeOutUp").addClass("fadeInDown animated");
                        setTimeout(function() {
                            anim(index - 1);
                        }, 1000);
                    }
                }
            });

            $(el).on('touchmove', function(e) {
                e.preventDefault();
                if (_move.touchtime >= 2) {
                    return false;
                }
            });
        }
    };

    _touch.init();

})(Zepto, window);

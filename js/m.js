window.onload = function () {
    var items = document.getElementsByClassName('item'); //图片
    var points = document.getElementsByClassName('point'); //点
    var goPreBtn = document.getElementById('goPre');
    var goNextBtn = document.getElementById('goNext');
    var wrap = document.querySelector('.wrap');

    var index = 0; //表示第几张图片
    var timer;

    var clearActive = function () {
        for (var i = 0; i < items.length; i++) {
            // items[i].className = 'item';
            if (items[i].className == 'item left' && i != 7 && i != 8) {
                items[i].className = 'item';
                items[i + 1].className = 'item';
                items[i + 2].className = 'item';
            } else if (items[i].className == 'item left' && i == 7) {
                items[i].className = 'item';
                items[i + 1].className = 'item';
                items[0].className = 'item';
            } else if (items[i].className == 'item left' && i == 8) {
                items[i].className = 'item';
                items[0].className = 'item';
                items[1].className = 'item';
            }
        }
        for (var i = 0; i < points.length; i++) {
            points[i].className = 'point';
        }
    }

    var goIndex = function () {
        clearActive();
        points[index].className = 'point active';
        items[index].className = 'item active';
    }
    var goLeft = function () {
        if (index == 0) {
            items[8].className = 'item left';
        } else if (index == 8) {
            items[7].className = 'item left';
        } else {
            items[index - 1].className = 'item left';
        }
    }
    var goRight = function () {
        if (index == 0) {
            items[1].className = 'item right';
        } else if (index == 8) {
            items[0].className = 'item right';
        } else {
            // console.log('index=', index)
            index++;
            // console.log('index=', index)
            items[index].className = 'item right';
            index--;
        }
    }
    var goNext = function () {
        if (index < 8) {
            index++;
        } else {
            index = 0;
        }
        if (index == 0) {
            goIndex();
            items[8].className = 'item left';
            items[index + 1].className = 'item right';
        } else if (index == 8) {
            goIndex();
            items[index - 1].className = 'item left';
            items[0].className = 'item right';
        } else {
            goIndex();
            items[index - 1].className = 'item left';
            items[index + 1].className = 'item right';
        }
    }
    var goPre = function () {
        if (index == 0) {
            index = 8;
        } else {
            index--;
        }
        if (index == 0) {
            goIndex();
            items[index + 1].className = 'item right';
            items[8].className = 'item left';
        } else if (index == 8) {
            goIndex();
            items[index - 1].className = 'item left';
            items[0].className = 'item right';
        } else {
            goIndex();
            items[index - 1].className = 'item left';
            items[index + 1].className = 'item right';
        }
    }

    //添加左右按钮点击事件
    goNextBtn.addEventListener('click', function () {
        goNext();
    })
    goPreBtn.addEventListener('click', function () {
        goPre();
    })

    //定时器实现自动播放
    timer = setInterval(function () {
        index++;
        // console.log('index=', index);
        index %= points.length;
        goIndex();
        // console.log('goIndex=', index);
        goLeft();
        // console.log('goLeft=', index);
        goRight();
        // console.log('goRight=', index);
    }, 6000);

    //鼠标移入图片时清除定时器
    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener('mouseenter', function () {
            clearInterval(timer);
            timer = null;
        })
    }
    //鼠标移出图片时打开定时器
    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener('mouseleave', function () {
            timer = setInterval(function () {
                index++;
                index %= points.length;
                goIndex();
                goLeft();
                goRight();
            }, 6000);
        })
    }

    //鼠标经过显示
    wrap.addEventListener('mouseenter', function () {
        goPreBtn.style.display = 'block';
        goNextBtn.style.display = 'block';
    })
    wrap.addEventListener('mouseleave', function () {
        goPreBtn.style.display = 'none';
        goNextBtn.style.display = 'none';
    })

    //鼠标点击图片时实现跳转
    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function () {
            var pointIndex = this.getAttribute('index');
            index = pointIndex;
            goIndex();
            goLeft();
            goRight();
        })
    }

    //点击小圆点后跳转到对应图片
    for (var i = 0; i < points.length; i++) {
        points[i].addEventListener('click', function () {
            var pointIndex = this.getAttribute('data-index');
            // console.log(pointIndex);
            index = pointIndex;
            goIndex();
            goLeft();
            goRight();
        })
    }

    //鼠标置于小圆点上时跳转到对应图片
    for (var i = 0; i < points.length; i++) {
        points[i].onmouseover = function (event) {
            event = event || window.event;
            var pointIndex = this.getAttribute('data-index');
            index = pointIndex;
            goIndex();
            goLeft();
            goRight();
        }
    }

}
// function getStyle(obj, name) {
//     if (window.getComputedStyle) {
//         return getComputedStyle(obj, null)[name];
//     } else {
//         //IE8的方式，没有getComputedStyle的方法
//         return obj.currenStyle[name];
//     }
// }


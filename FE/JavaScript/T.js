/**
 * 注释
 * TODO: 待办
 * FIXME: 已知的无法运行的代码
 */
try {
    Vue.config.devtools = process.env.NODE_ENV === 'development';
} catch (error) {
    console.log(1, error);
}

try {
    (() => {
        let loading = document.querySelector('.loading');
        let letters = loading.textContent.split('');
        loading.textContent = '';
        letters.forEach((letter, i) => {
            let span = document.createElement('span');
            span.textContent = letter;
            span.style.animationDelay = `${i / 10}s`;
            loading.append(span);
        });
    })();

    function sleep (time = 1000) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }

    function randomNumber (x, y) {
        return Math.floor(Math.random() * (y - x + 1) + x);
    }

    (async () => {
        for (let index = 0; index < 20; index++) {
            await sleep(100);

            // console.log(randomNumber(0, 10));
        }
    })();

    /**
     * \u000d console.log(123456);
     * abcdefghijklmnopqrstuvwxyz
     * ABCDEFGHIJKLMNOPQRSTUVWXYZ
     * 0123456789
     */

    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].sort((a, b) => {
        console.log(a, b);
        return -1;
    });
} catch (error) {
    console.log(2, error);
}

function randomNumber (x, y) {
    return Math.floor(Math.random() * (y - x + 1) + x);
}

for (let index = 1; index <= 50; index++) {
    jsHeight('<li class="pbl-item" style="height: ' + randomNumber(200, 500) + 'px;">' + index + '</li>');
}

setTimeout(() => {
    for (let index = 1; index <= 50; index++) {
        jsHeight('<li class="pbl-item" style="height: ' + randomNumber(200, 500) + 'px;">' + (50 + index) + '</li>');
    }
}, 5000);

function jsHeight (domString) {
    var tempHeight = $('.pbl').eq(0).height();
    var idx = 0;

    $.each($('.pbl'), function (indexInArray, valueOfElement) {
        if ($(valueOfElement).height() < tempHeight) {
            tempHeight = $(valueOfElement).height();
            idx = indexInArray;
        }
    });

    $('.pbl').eq(idx).append(domString);
}

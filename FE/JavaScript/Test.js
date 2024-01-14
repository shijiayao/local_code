{
    const canvas_id = document.getElementById('canvas_id');

    let DPR = devicePixelRatio;
    DPR = 1;

    const width = window.innerWidth * DPR;
    const height = window.innerHeight * DPR;

    const fontSize = 20 * DPR;

    canvas_id.width = width;
    canvas_id.height = height;
    canvas_id.contenteditable = true;

    const canvas_ctx = canvas_id.getContext('2d');

    canvas_ctx.fillStyle = 'red';
    canvas_ctx.font = `${fontSize}px "Roboto Mono"`;
    canvas_ctx.fillText('Hello Word', 5, 100);

    CanvasRenderingContext2D.prototype._fillText = CanvasRenderingContext2D.prototype.fillText;

    CanvasRenderingContext2D.prototype.fillText = function (...p) {
        console.log(p);

        return this._fillText(...p);
    };
}

{
    /**
     * menhu.pt.ouchn.cn
     * 2234001205640
     * Ouchn@19950320
     */

    let menuElement = document.querySelector('.full-screen-mode-sidebar'); // 目录
    let titleLevel_0 = menuElement.querySelectorAll('[style="--level: 0;"]'); // 0 级标题
    let titleLevel_1 = document.querySelectorAll('[style="--level: 1;"]'); // 0 级标题下展开的 1 级标题
    let titleLevel_2 = document.querySelectorAll('[style="--level: 2;"]'); // 1 级标题下的 2 级标题

    let activeTitleLevel_0 = null; // 当前展开的 0 级标题
    let activeTitleLevel_1 = null; // 当前展开的 1 级标题
    let activeTitleLevel_2 = null; // 当前选中的 2 级标题
    let activeTitleLevel_0_index = 0; // 当前展开的 0 级标题下标
    let activeTitleLevel_1_index = 0; // 当前展开的 1 级标题下标
    let activeTitleLevel_2_index = 0; // 当前选中的 2 级标题下标

    [].forEach.call(titleLevel_2, (element, index) => {
        if (element.classList.contains('active')) {
            activeTitleLevel_2 = element;
            activeTitleLevel_1 = $(element).parents('[style="--level: 1;"]')[0];
            activeTitleLevel_0 = $(element).parents('[style="--level: 0;"]')[0];

            activeTitleLevel_2_index = index;
            activeTitleLevel_1_index = $(activeTitleLevel_1).index();
            activeTitleLevel_0_index = $(activeTitleLevel_0).index();
        }
    });

    checkVideo();

    /**
     * 检查视频
     */
    function checkVideo () {
        console.log('检查视频');

        // 检查视频播放情况
        let videoElement = document.querySelector('.video-player');

        if (videoElement) {
            // 是视频

            let videoPlayProgress = videoElement.querySelector('.mvp-play-progress');

            if (parseFloat(videoPlayProgress.style.width) >= 99) {
                // 视频播放完成
                clickNextTitle_2();
            } else {
                let videoObject = videoElement.querySelector('video');

                videoObject.addEventListener('ended', function (e) {
                    // 视频播放完成
                    clickNextTitle_2();
                });

                setTimeout(() => {
                    videoElement.querySelector('.mvp-toggle-play').click();

                    setTimeout(() => {
                        if (videoObject.paused) {
                            videoElement.querySelector('.mvp-toggle-play').click();
                        }
                    }, 5000);
                }, 3000);
            }
        } else {
            // 不是视频，点击下一个标题
            clickNextTitle_2();
        }
    }

    /**
     * 点击下一个 2 级标题
     */
    function clickNextTitle_2 () {
        console.log('点击 2 级标题', activeTitleLevel_2_index, titleLevel_2.length);

        if (activeTitleLevel_2_index >= titleLevel_2.length - 1) {
            // 当前是最后一个 2 级标题，点击下一个 1 级标题
            clickNextTitle_1();
        } else {
            // 点击下一个标题
            titleLevel_2[activeTitleLevel_2_index + 1].querySelector('.text-too-long').click();
            activeTitleLevel_2_index++;

            setTimeout(() => {
                checkVideo();
            }, 10000);
        }
    }

    /**
     * 点击下一个 1 级标题
     */
    function clickNextTitle_1 () {
        console.log('点击 1 级标题', activeTitleLevel_1_index, titleLevel_1.length);

        if (activeTitleLevel_1_index >= titleLevel_1.length - 1) {
            // 当前是最后一个 1 级标题，点击下一个 0 级标题
            clickNextTitle_0();
        } else {
            // 点击下一个标题

            titleLevel_1[activeTitleLevel_1_index + 1].querySelector('.text-too-long').click();
            activeTitleLevel_1_index++;
            activeTitleLevel_2_index = -1;

            setTimeout(() => {
                titleLevel_2 = titleLevel_1[activeTitleLevel_1_index].querySelectorAll('[style="--level: 2;"]') || [];
                clickNextTitle_2();
            }, 10000);
        }
    }

    /**
     * 点击下一个 0 级标题
     */
    function clickNextTitle_0 () {
        console.log('点击 0 级标题', activeTitleLevel_0_index, titleLevel_0.length);

        if (activeTitleLevel_0_index >= titleLevel_0.length - 1) {
            // 最后一个 0 级标题
            console.log('当前页面视频已播放完。');
        } else {
            // 点击下一个标题

            titleLevel_0[activeTitleLevel_0_index + 1].querySelector('.text-too-long').click();
            activeTitleLevel_0_index++;
            activeTitleLevel_1_index = -1;
            activeTitleLevel_2_index = -1;

            setTimeout(() => {
                titleLevel_1 = titleLevel_0[activeTitleLevel_0_index].querySelectorAll('[style="--level: 1;"]') || [];
                clickNextTitle_1();
            }, 30000);
        }
    }
}

{
    let DelayTime = 30 * 1000;

    function checkVideo () {
        console.log('检查视频');

        // 检查视频播放情况
        let videoElement = document.querySelector('.video-player');

        if (videoElement) {
            // 是视频

            let videoPlayProgress = videoElement.querySelector('.mvp-play-progress');

            if (parseFloat(videoPlayProgress.style.width) >= 99) {
                // 视频已播放
                console.log('视频已播放。');
                nextButton();
            } else {
                let videoObject = videoElement.querySelector('video');

                videoObject.addEventListener('ended', function (e) {
                    // 视频播放完成
                    console.log('视频播放完成。');
                    nextButton();
                });

                setTimeout(() => {
                    videoElement.querySelector('.mvp-toggle-play').click();

                    setTimeout(() => {
                        if (videoObject.paused) {
                            videoElement.querySelector('.mvp-toggle-play').click();
                        }
                    }, 5000);
                }, 3000);
            }
        } else {
            // 不是视频，点击下一个
            nextButton();
        }
    }

    // 下一个按钮
    function nextButton () {
        document.querySelector('.next-btn.ivu-btn').click();

        setTimeout(() => {
            checkVideo();
        }, DelayTime);
    }

    checkVideo();
}

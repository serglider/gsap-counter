export function createControls(counter) {
    setControlBlock(counter, 1);
    setControlBlock(counter, 2);
    setControlBlock(counter, 3);
    setCommonControlBlock(counter);

    window.onkeyup = (e) => {
        e.preventDefault();
        if (e.keyCode === 32) {
            counter.complete();
        } else if (e.keyCode === 83) {
            counter.pause();
        } else if (e.keyCode === 82) {
            counter.resume();
        }
    };
}

function setCommonControlBlock(counter) {
    const updateRate = document.getElementById('updateRate');
    const updateRateBtn = document.getElementById('updateRateBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resumeBtn = document.getElementById('resumeBtn');
    const completeBtn = document.getElementById('completeBtn');

    updateRateBtn.onclick = () => {
        counter.setUpdateRate(updateRate.valueAsNumber);
    };
    pauseBtn.onclick = () => counter.pause();
    resumeBtn.onclick = () => counter.resume();
    completeBtn.onclick = () => counter.complete();
}

function setControlBlock(counter, blockID) {
    const startValue = document.getElementById(`startValue${blockID}`);
    const endValue = document.getElementById(`endValue${blockID}`);
    const startBtn = document.getElementById(`startBtn${blockID}`);
    const startCurrentBtn = document.getElementById(
        `startCurrentBtn${blockID}`
    );
    const duration = document.getElementById(`duration${blockID}`);
    const ease = document.getElementById(`ease${blockID}`);

    startBtn.onclick = () => {
        counter
            .setEase(ease.value)
            .setDuration(duration.valueAsNumber)
            .start(endValue.valueAsNumber, startValue.valueAsNumber)
            .then(() => {
                console.log(`done ${endValue.valueAsNumber}`);
            });
    };
    startCurrentBtn.onclick = () => {
        counter
            .setEase(ease.value)
            .setDuration(duration.valueAsNumber)
            .startFromCurrent(endValue.valueAsNumber)
            .then(() => {
                console.log(`done ${endValue.valueAsNumber}`);
            });
    };
}

// window.onkeyup = (e) => {
//     console.log(e.keyCode);
//     if (e.keyCode === 32) {
//         counter.start(25).then(() => {
//             console.log('done 800');
//         });
//     } else if (e.keyCode === 81) {
//         counter.complete();
//     } else if (e.keyCode === 87) {
//         counter.startFromCurrent(1200).then(() => {
//             console.log('done 1200');
//         });
//     } else if (e.keyCode === 69) {
//         counter.startFromCurrent(2000).then(() => {
//             console.log('done 2000');
//         });
//     }
// };

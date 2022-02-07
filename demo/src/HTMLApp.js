import { financial } from './format';

export function createHTMLApp(counter) {
    const counterBlock = document.getElementById('counter');
    const tfLayout = `<div id="tf">$0.00</div>`;
    counterBlock.insertAdjacentHTML('afterbegin', tfLayout);
    const tf = counterBlock.querySelector('#tf');

    function updateTF(val) {
        tf.textContent = financial(val);
    }

    counter.addListener(updateTF);
}

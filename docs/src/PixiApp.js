import { Application, BitmapText } from 'pixi.js';
import { financial } from './format';

export function createPixiApp(counter) {
    const counterBlock = document.getElementById('counter');
    const { width, height } = counterBlock.getBoundingClientRect();
    const app = new Application({
        width: width,
        height: height,
        backgroundAlpha: 0,
    });
    counterBlock.appendChild(app.view);

    app.loader.add('fontos', './assets/fontos.xml').load(() => {
        const tf = new BitmapText('$0.00', {
            fontName: 'fontos',
            fontSize: 160,
            align: 'center',
        });
        tf.anchor.set(0.5);
        tf.position.set(width / 2, height / 2);
        app.stage.addChild(tf);

        function updateTF(val) {
            tf.text = financial(val);
        }

        counter.addListener(updateTF);
    });
}

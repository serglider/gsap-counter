import Counter from '../../Counter';
import { createControls } from './Controls';
import { createPixiApp } from './PixiApp';
import { createHTMLApp } from './HTMLApp';

const searchParams = new URLSearchParams(document.location.search);
const renderer = searchParams.has('dom') ? createHTMLApp : createPixiApp;
const counter = new Counter(TweenMax.to);

createControls(counter);
renderer(counter);

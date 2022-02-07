import gsap from 'gsap';
import Counter from '../../Counter';
import { createControls } from './Controls';
import { createPixiApp } from './PixiApp';
import { createHTMLApp } from './HTMLApp';

const searchParams = new URLSearchParams(document.location.search);
const renderer = searchParams.has('dom') ? createHTMLApp : createPixiApp;
const counter = new Counter(gsap.to);
// counter.setDecimalsEpsilon(0.27);

createControls(counter);
renderer(counter);

const esbuild = require('esbuild');
const args = process.argv.slice(2);
const DEMO_DIR = 'docs';
const buildConfig = {
    entryPoints: [`${DEMO_DIR}/src/index.js`],
    bundle: true,
    outfile: `${DEMO_DIR}/app.js`,
};

if (args[0] === 'dev') {
    const bs = require('browser-sync').create();
    bs.init({
        server: `./${DEMO_DIR}`,
        watch: true,
        online: false,
        port: 4000,
    });

    buildConfig.watch = true;
    esbuild.build(buildConfig).catch(() => process.exit(1));
} else {
    buildConfig.minify = true;
    esbuild.build(buildConfig).catch(() => process.exit(1));
}

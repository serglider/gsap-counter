require('esbuild')
    .build({
        entryPoints: ['demo/index.js'],
        bundle: true,
        outfile: 'demo/app.js',
        watch: true,
    })
    .catch(() => process.exit(1));

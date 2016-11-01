module.exports = {
    module: {
        name: 'pipNav',
        styles: 'index',
        export: 'pip.nav',
        standalone: 'pip.nav'
    },

    build: {
        js: false,
        ts: false,
        tsd: true,
        bundle: true,
        html: true,
        less: true,
        lib: true,
        images: true,
        dist: false
    },

    // browserify: {
    //     entries: [ './src/index.ts' ]
    // },

    file: {
        lib: [
            '../pip-webui-lib/dist/**/*',
            '../pip-webui-services/dist/**/*', 
            '../pip-webui-layouts/dist/**/*', 
            '../pip-webui-behaviors/dist/**/*',            
            '../pip-webui-themes/dist/**/*'
        ]
    },

    samples: {
        port: 8070
    },

    api: {
        port: 8071
    }
};

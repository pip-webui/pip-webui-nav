module.exports = {
    module: {
        name: 'pipNav',
        styles: 'nav'
    },
    build: {
        js: true,
        ts: true,
        html: true,
        css: true,
        lib: true,
        images: true,
        dist: false
    },
    file: {
        lib: [
            '../pip-webui-test/dist/**/*',
            '../pip-webui-lib/dist/**/*',
            '../pip-webui-cssframework/dist/**/*',
            '../pip-webui-csscomponents/dist/**/*',
            '../pip-webui-core/dist/**/*', 
            '../pip-webui-dates/dist/**/*', 
            '../pip-webui-layouts/dist/**/*', 
            //  '../pip-webui-rest/dist/**/*',
            // '../pip-webui-controls/dist/**/*',
            '../pip-webui-nav/dist/**/*',
            //  '../pip-webui-pictures/dist/**/*'//,
            // '../pip-webui-locations/dist/**/*',
            // '../pip-webui-documents/dist/**/*',
            // '../pip-webui-composite/dist/**/*',
            // '../pip-webui-errors/dist/**/*',
            // '../pip-webui-entry/dist/**/*',
            // '../pip-webui-settings/dist/**/*',
            // '../pip-webui-guidance/dist/**/*',
            // '../pip-webui-support/dist/**/*',
            // '../pip-webui-help/dist/**/*'
        ]
    },
    samples: {
        port: 8070
    },
    api: {
        port: 8071
    }
};

var allTestFiles = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            allTestFiles.push(file);
        }
    }
}

//TODO find out how this works
/*Object.keys(window.__karma__.files).forEach(function(file) {
 if (TEST_REGEXP.test(file)) {
 // Normalize paths to RequireJS module names.
 // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
 // then do not normalize the paths
 var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
 console.info("file: " + file.toString());
 console.info("normalizedTestModule: " + normalizedTestModule);
 allTestFiles.push(normalizedTestModule);
 }
 });*/

require.config({
    baseUrl: '/base',

    paths: {
        'BytePushers': 'bower_components/bytepushers-js-core/release/bytepushers-js-core.min',
        'Message': 'src/main/javascript/software.bytepushers.Message',
        'MessageFilters': 'src/main/javascript/software.bytepushers.MessageFilters',
        'MessageHandler': 'src/main/javascript/software.bytepushers.MessageHandler',
        'FormMessageHandler': 'src/main/javascript/software.bytepushers.FormMessageHandler'
    },

    shim: {
        BytePushers: {
            exports: 'BytePushers'
        },
        Message: {
            deps: ['BytePushers']
        },
        MessageFilters: {
            deps: ['BytePushers', 'Message']
        },
        MessageHandler: {
            deps: ['BytePushers', 'Message']
        },
        FormMessageHandler: {
            deps: ['BytePushers']
        }
    },


    deps: allTestFiles,

    callback: window.__karma__.start
});

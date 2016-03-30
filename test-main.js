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
        'BytePushers': 'node_modules/bytepuhsers-common-js/bytepushers-common-js.min',
        'TransformerException': 'src/main/javascript/TransformerException',
        'WebServiceException': 'src/main/javascript/WebServiceException',
        'HttpStatus': 'src/main/javascript/HttpStatus',
        'Response': 'src/main/javascript/Response',
        'ResponseException': 'src/main/javascript/ResponseException',
        'ResponseStatus': 'src/main/javascript/ResponseStatus',
        'ResponseTransformer': 'src/main/javascript/ResponseTransformer',
        'ResponseExceptionStackTrace': 'src/main/javascript/ResponseExceptionStackTrace',
        'ResponseResultSetTransformer': 'src/main/javascript/ResponseResultSetTransformer',
        'ResponseStatusTransformer': 'src/main/javascript/ResponseStatusTransformer'
    },

    shim: {
        'BytePushers': {
            exports: 'BytePushers'
        },
        TransformerException: {
            deps: ['BytePushers']
        },
        WebServiceException: {
            deps: ['BytePushers']
        },
        HttpStatus: {
            deps: ['BytePushers']
        },
        ResponseException: {
            deps: ['BytePushers', 'ResponseExceptionStackTrace']
        },
        ResponseStatus: {
            deps: ['BytePushers']
        },
        Response: {
            deps: ['BytePushers', 'ResponseStatus']
        },
        ResponseTransformer: {
            deps: ['BytePushers', 'HttpStatus', 'ResponseStatus']
        },
        ResponseExceptionStackTrace: {
            deps: ['BytePushers', 'ResponseStatus']
        },
        ResponseResultSetTransformer: {
            deps: ['BytePushers']
        },
        ResponseStatusTransformer: {
            deps: ['BytePushers', 'TransformerException', 'ResponseStatus']
        }
    },


    deps: allTestFiles,

    callback: window.__karma__.start
});
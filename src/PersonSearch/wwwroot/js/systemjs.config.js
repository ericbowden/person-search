/**
 * System configuration for Angular
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/',
      'npm-live:': 'lib/node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      app: 'app',

      // angular bundles
      '@angular/core': 'npm-live:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm-live:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm-live:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm-live:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm-live:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm-live:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm-live:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm-live:@angular/forms/bundles/forms.umd.js',

      // other libraries
      'rxjs':                      'npm-live:rxjs',
      'angular-in-memory-web-api': 'npm-live:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);

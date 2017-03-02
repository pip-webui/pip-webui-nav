var gulp = require('gulp');

// Add standard tasks    
require('pip-webui-tasks').all(gulp);

// Define build tasks        
gulp.task('build', ['build-bundle-prod', 'build-bundle-dev', 'build-sass-prod', 'build-sass-dev', 'build-tsd', 'build-lib', 'build-res']);
gulp.task('rebuild', ['build-bundle-dev', 'build-sass-dev', 'build-tsd', 'build-lib', 'build-res']);
gulp.task('clean', ['build-clean']);
gulp.task('watch', ['build-watch']);
gulp.task('jshint', ['test-jshint']);
gulp.task('launch', ['samples-launch']);
gulp.task('publish', ['samples-publish']);

// Set default task
gulp.task('default', ['build']);
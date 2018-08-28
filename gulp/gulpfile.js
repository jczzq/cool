var gulp = require('gulp');
var yargs = require('yargs');

// 任务名：default
gulp.task('default', function() {
    console.log(yargs.argv);
});

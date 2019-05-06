// NOTE: I previously suggested doing this through Grunt, but had plenty of problems with
// my set up. Grunt did some weird things with scope, and I ended up using nodemon. This
// setup is now using Gulp. It works exactly how I expect it to and is WAY more concise.
// *** Prompt Command > gulp ***
var gulp = require('gulp'),
    ts = require("gulp-typescript"),
    tsProject = ts.createProject("tsconfig.json"),
    execSync = require('child_process').execSync,
    spawn = require('child_process').spawn,
    node;

/**
 * gulp typescript
 */
gulp.task("typescript", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function() {
    //console.log(node)
    if (node){
        gulp.task('server-exit')();
        gulp.task('watch')();
    }
    //console.log(node)    

    node = spawn('node', ['./dist/server.js'], {stdio: 'inherit'})
})

gulp.task('server-exit', function(){
    console.log('NOPID> ' + node.pid)
    execSync('taskkill /f /pid ' + node.pid, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        //cb(err);
    });     
})

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', function() {
    gulp.task('typescript')()
    gulp.task('server')()
    gulp.task('watch')()

    // Need to watch for sass changes too? Just add another watch call!
    // no more messing around with grunt-concurrent or the like. Gulp is
    // async by default.
})

gulp.task('watch', function() {
    gulp.watch('./src/', gulp.series('typescript', 'server'))
    console.log('watch')
})
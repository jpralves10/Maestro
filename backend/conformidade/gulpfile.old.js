var gulp = require("gulp");
var ts = require("gulp-typescript");
var through2 = require("through2");
var server = require('tiny-lr')();
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var wait = require('gulp-wait');
var refresh = require('gulp-livereload');

var tsProject = ts.createProject("tsconfig.json");

gulp.task("typescript", function () {

    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task('server', async function (cb) {
    const child = spawn('node', ['./dist/server.js'], {
        detached: true,
        stdio: 'ignore'
    });
    child.unref();

    /*exec('mongod --dbpath ./data', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });*/
})

gulp.task('server-exit', async function(){
    exec('taskkill /f /im node.exe', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });      
})

/*gulp.task('server-through2', function () {
    var src = gulp.src('./dist/server.js')
    return src.pipe(through2.obj
        (function (file, enc, cb) {
            var that = this;
            exec('node ' + file.path, function (err) {
                that.push(file);
                cb(err);
            });
            this.push(file);
        })
    )
})*/

gulp.task('start2', function() {
    gulp.watch(
        ['src/**/*', 'dist/**/*'],
        gulp.series('typescript', 'server')
    );
});

gulp.task('watch', function() {

    /*gulp.watch('src/** /*', setTimeout(function() {
        gulp.series('start');
    }, 1000 ));  */ 

    server.listen(35729, function( err ) {
        if ( err ) { return console.log( err ); }

        gulp.watch('src/**/*', function (e) {
            gulp.series('server-exit', 'start')

            /*gulp.src(e.path)
                .pipe(wait(1500))
                .pipe(refresh(server));*/
        });


        /*gulp.watch(
            ['src/** /*', 'dist/** /*'],
            gulp.series('typescript', 'server-exit', 'server')
        );*/
       
        
        //gulp.watch('dist/**/*', gulp.series('server-exit', 'server'));
    });
});

gulp.task('start', gulp.series('typescript', 'server', 'watch'));
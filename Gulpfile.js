var gulp = require('gulp'),
	jspm = require('jspm'),
    serve = require('browser-sync'),
	sass = require('gulp-sass'),
	htmlReplace = require('gulp-html-replace'),
	fs = require('fs'),
	path = require('path'),
	uglify = require('gulp-uglify'),
	deletee = require('del'),
	rename = require('gulp-rename'),
	ngAnnotate = require('gulp-ng-annotate'),
	sassJspm = require('sass-jspm-importer'),
	documentation = require('gulp-documentation'),
	concat = require('gulp-concat'),
	vinylPaths = require('vinyl-paths'),
	rev = require('gulp-rev'),
	filter = require('gulp-filter'),
	proxyMiddleware = require('http-proxy-middleware'),
	os = require('os'),
	q = require('q'),
	print = require('gulp-print'),
	Karma = require('karma').Server;


var paths = {
	components: 'src/components',
	html: [
		'src/**/*.html',
	]
};

/**
	 * define your proxies if you need 'em
	 * https://www.npmjs.com/package/http-proxy-middleware
 	 */
// var proxy = proxyMiddleware(["/openam", "/30"], {
// 	changeOrigin: true,
// 	target: "https://apps.development.aamc.org",
// 	secure: false //dunno why this is required even though we have the certificate and key defined...
// });

gulp.task('serve', function () {
	'use strict'
	/* sass compile on change
	 * browserSync will handle live updates to browser
	 *
	*/
	gulp.watch('src/**/*.scss', ['sass']);
	/**
	 * component file change reload
	 */
	gulp.watch(path.join(paths.components, '/**/*.js'), ['documentation', 'reload']);
	/**
	 * browserSync for local
	 * https://browsersync.io/docs
	 */



	serve({
		port: process.env.PORT || 8443,
		host: os.hostname().toLowerCase() + ".adm.aamc.org",
		https: {
			key: "ssl/angular-bootstrap.pem",
			cert: "ssl/angular-bootstrap-cert.pem"
		},
		open: false,
		files: [].concat(
			'src/assets/css/main.css',
			paths.html
		),
		server: {
			baseDir: ['src'],
			routes: {
				'/jspm_packages': './jspm_packages',
				'/config.js': './config.js',
				'/src': './src'
			},
			middleware: [
				//proxy
			]
		},
	});
});

/**
 * browserSync to test out the dist bundle
 */
gulp.task('serve-dist', function () {
	'use strict'
	serve({
		port: process.env.PORT || 8443,
		host: os.hostname().toLowerCase() + ".adm.aamc.org",
		https: {
			key: "ssl/angular-bootstrap.pem",
			cert: "ssl/angular-bootstrap-cert.pem"
		},
		open: false,
		server: {
			baseDir: ['dist'],
			middleware: [
				//proxy
			]
		}
	});
});
/**
 * sass compile
 * using jspm importer to resolve sass imports from
 * within jspm packages
 * https://www.npmjs.com/package/sass-jspm-importer
 */
gulp.task('sass', function () {
	return gulp.src('src/scss/main.scss')
		.pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("src/assets/css"));
});
/**
 * generates documentation per component
 * places a markdown file in each component
 * http://documentation.js.org/
 */
gulp.task('documentation', function () {
	return;
	var components = getFolders(paths.components);
	var tasks = components.map(function (component) {
		return gulp.src([path.join(paths.components, component, '/**/*.js'), '!src/components/**/*.spec.js'])
			.pipe(documentation({ format: 'md' }))
			.pipe(rename("readme.md"))
			.pipe(gulp.dest(function (file) {
				return "src/components/" + component;
			}));
	});
	return tasks;
});

gulp.task('reload', function (done) {
	serve.reload();
});

/**
 * create a jspm bundle
 * for deployment
 * http://jspm.io/
 *
 * this task is huge and a mess
 * needs to be broken down to smaller pieces
 */
gulp.task('dist', function () {
	var dist = 'dist';
	deletee.sync(dist);
	jspm.setPackagePath('.');
	/*
	 * the boostrap css file has an import from
	 * googleapis.com and our certificate is not trusted...
	 * there must be a better way to do this
	 */
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	var cssFilter = filter(['**/*.css'], { restore: true });
	return jspm.bundle('src/index + json', dist + "/build.js", {})
		.then(function () {
			var defered = q.defer();
			gulp.src(dist + "/build.js")
				.pipe(vinylPaths(deletee))
				.pipe(ngAnnotate())
				.pipe(uglify())
				.pipe(gulp.dest(dist))
				.pipe(print(function (filepath) {
					return "javascript bundled/ngannotated/uglified and moved to dist: " + filepath;
				}))
				.on('end', function () {
					defered.resolve();
				});
			return defered.promise;
		})
		.then(function () {
			var defered = q.defer();
			gulp.src('src/assets/**/*')
				.pipe(gulp.dest(dist + "/assets"))
				.pipe(print(function (filepath) {
					return "asset moved to dist: " + filepath;
				}))
				.on('end', function () {
					defered.resolve();
				});
			return defered.promise;
		})
		.then(function () {
			gulp.src(["*/system.js", "*/system-polyfills.js", "config.js", "!node_modules/**/*"])
				.pipe(gulp.dest(dist))
				.pipe(print(function (filepath) {
					return "loader files moved to dist: " + filepath;
				}));

			gulp.src(['dist/**/*build.js', 'dist/**/main.css'])
				.pipe(vinylPaths(deletee))
				.pipe(rev())
				.pipe(gulp.dest(dist))
				.pipe(print(function (filepath) {
					return "file has been reved: " + filepath;
				}))
				.pipe(rev.manifest())
				.pipe(gulp.dest(dist))
				.on('end', function () {
					var buildFiles = require('./dist/rev-manifest.json');
					gulp.src("src/index.html")
						.pipe(htmlReplace({
							"js": buildFiles['build.js'],
							"css": buildFiles['assets/css/main.css']
						}))
						.pipe(gulp.dest(dist))
						.pipe(print(function (filepath) {
							return "index.html updated with rev files and moved to dist: " + filepath;
						}));

				});

		});

});

gulp.task('test', function (done) {
    new Karma({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        action: 'run'
    }, function() {
        done();
    }).start();
});

gulp.task('rootreadme', function () {
	return gulp.src(['install.md', 'contribute.md'])
		.pipe(concat('readme.md'))
		.pipe(gulp.dest('./'));
});

gulp.task('default', ['sass', 'documentation', 'serve']);

/*helper to get an array of component folders */
function getFolders(dir) {
    return fs.readdirSync(dir)
		.filter(function (file) {
			return fs.statSync(path.join(dir, file)).isDirectory();
		});
}


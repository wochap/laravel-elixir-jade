var cached = require('gulp-cached')
var changed = require('gulp-changed')
var Elixir = require('laravel-elixir')
var filter = require('gulp-filter')
var gulp = require('gulp')
var jade = require('gulp-jade')
var jadeInheritance = require('gulp-jade-inheritance')
var plumber = require('gulp-plumber')
var rename = require('gulp-rename')
var _ = require('underscore')

/*
 |----------------------------------------------------------------
 | Gulp Jade Wrapper
 |----------------------------------------------------------------
 |
 | This task will compile your Jade files that have changed.
 | This also prevent partials from being processed separately
 | by marking them with an underscore before their name.
 | You can make use of Blade variables in your jade files as well.
 |
 */

Elixir.extend('jade', function (src, output, options) {
  options = _.extend({
    basedir: 'resources/views', // required to use absolute paths
    extension: '.html',
    showFilename: true,
    pretty: true
  }, options)

  var jade_options = _.pick(
    options,
    'filename',
    'doctype',
    'pretty',
    'self',
    'debug',
    'compileDebug',
    'compiler',
    'basedir'
  )

  var gulp_src = options.basedir + '/' + src
  var gulp_dest = output || 'public/views'
  var message = 'Jade Compiled!'

  if (options.showFilename) {
    message = '<%= file.relative %> Compiled!'
  }

  new Elixir.Task('jade', function () {
    this.log(gulp_src, gulp_dest) // Log src and output

    return gulp.src(gulp_src)
      .pipe(plumber())
      .pipe(changed(gulp_dest, { extension: options.extension }))
      .pipe(cached('jade'))
      .pipe(jadeInheritance({ basedir: options.basedir }))
      .pipe(filter(function (file) {
        return !/\/_/.test(file.path) && !/^_/.test(file.relative)
      }))
      .pipe(jade(jade_options))
      .pipe(rename(function (path) {
        path.extname = options.extension
      }))
      .pipe(gulp.dest(gulp_dest))
      .pipe(new Elixir.Notification(message))
  })
  .watch(options.basedir + '/**/*.jade')
})

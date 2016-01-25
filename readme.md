## Laravel Elixir Jade

This Laravel Elixir extension allows you to compile [jade](https://github.com/pugjs/jade).

### Features

* This task will compile your Jade files that have changed*.
* This also prevent partials from being processed separately by marking them with an underscore before their name.

### Installation

First, pull in the extension through NPM.

```sh
$ npm install --save-dev wo-laravel-elixir-jade
```

Next, add it to your Elixir-enhanced Gulpfile, like so:

```javascript
var elixir = require('laravel-elixir');

require('wo-laravel-elixir-jade');

elixir(function(mix) {
  mix.jade('**/*.jade', 'public/views');
});
```

***NOTE: Jade files, with default options, should be in a `resources/views` folder. Make sure to create one!***

### Usage

Assuming you write...

```javascript
elixir(function(mix) {
  mix.jade('**/*.jade', 'public/views');
});
```

...this will compile yours `resources/views/**/*.jade` files to `public/views` folder.

Finally, if you want to override the Jade plugin options, you may pass an object as the third argument.

```javascript
mix.jade('**/*.jade', 'public/views', {});

// For Jade's options, see http://jade-lang.com/api/
```

### Options

You can also set `extension: .blade.php` to compile to `*.blade.php` instead of `*.html`.

All other options should be pretty straight forward.

These are the default options:

```javascript
{
    basedir: 'resources/views', // required to use absolute paths and default jade source folder
    extension: '.html',
    showFilename: true, // display current filename in notifications
    pretty: true
}
```

## Changelog

### 0.1.0

  * Add option to display the compiled filename
  * Update gulp-jade version

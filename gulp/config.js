var dest = './build';
var src = './src';

module.exports = {
  browserSync: {
    server: {
      // We're serving the src folder as well
      // for sass sourcemap linking
      baseDir: [dest, src]
    },
    files: [
      dest + '/**'
    ]
  },
  css: {
    src: src + "/css/*.css",
    dest: dest
  },
  scss: {
    src: src + "/css/*.scss",
    dest: dest + '/css'
  },
  markup: {
    src: src + "/www/**",
    dest: dest
  },
  fontIcons: {
    src: src + "/css/font/**",
    dest: dest + '/font-icons'
  },
  mediumEditor: {
    src: src + "/css/medium-editor/**",
    dest: dest + '/medium-editor'
  },
  browserify: {
    // Enable source maps
    debug: true,
    extensions: [ '.jsx' ],
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/app/app.jsx',
      dest: dest,
      outputName: 'app.js'
    }]
  }
};

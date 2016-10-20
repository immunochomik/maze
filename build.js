/**
 * Created by tomek on 12/10/16.
 */
var compressor = require('node-minify');

var mimficator = 'uglifyjs';
if(process.argv[2] !== 'production') {
 mimficator = 'no-compress';
}

console.log(process.argv[2], 'Using ' + mimficator);

new compressor.minify({
  type: mimficator,
  fileIn: [
    'node_modules/d3/build/d3.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/vue/dist/vue.js',
    'node_modules/vue-resource/dist/vue-resource.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'assets/js/assorted.js',
    'assets/js/MazeBuilder.js',
    'assets/js/Renderer.js',
  ],
  fileOut: 'static/build.min.js',
  callback: function(err, min) {
    if (err) {
      console.error(err);
    }
    //console.log(min);
    console.log('Done js');
  }
});

new compressor.minify({
  type: 'clean-css',
  fileIn: [
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/bootstrap/dist/css/bootstrap-theme.css',
    'assets/css/main.css',
  ],
  fileOut: 'static/build.min.css',
  callback: function(err, min) {
    if (err) {
      console.error(err);
    }
    //console.log(min);
    console.log('Done css');
  }
});
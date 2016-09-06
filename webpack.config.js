 const path = require('path');
 module.exports = {
     entry: './apply/index.js',
     output: {
         path: './bin',
         filename: 'app.js',
     },
     module: {
         loaders: [{
             test: /\.css$/,
             loader: 'style!css'
         }]
     }
 }
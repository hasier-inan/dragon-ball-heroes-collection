const config = require('./webpack.base.config.js');
const path = require('path');

config.mode= 'production';
config.entry = {
	DragonBallHeroesCollection: './src/dragon-ball-heroes-collection/index.jsx'
};
config.devtool = 'sourcemaps';
config.output = {
	path: path.resolve(__dirname, './dist'),
	filename: '[name].js',
    libraryTarget: 'umd'
};

module.exports = config;

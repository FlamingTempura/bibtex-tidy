/* jshint node: true, esversion: 6, unused: true */
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
 
export default {
	name: 'bibtexTidy',
	input: 'src/index.js',
	plugins: [commonjs(), nodeResolve()],
	output: {
		file: 'bibtex-tidy.js',
		format: 'umd'
	}
};
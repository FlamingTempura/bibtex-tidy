import NodeEnvironment from 'jest-environment-node';
import { tidy as tidyImport } from '../../../src/index';
import { cacheTidyResults } from './utils';

// require the actual build. Using import would cause it to bundled into the
// test and we won't be testing the actual build.
const tidy =
	process.env.NODE_ENV === 'coverage'
		? tidyImport
		: require('../../../bibtex-tidy.js').tidy;

export default class JSLibAPIEnvironment extends NodeEnvironment {
	async setup() {
		await super.setup();
		this.global.bibtexTidy = cacheTidyResults(tidy, 'api', this.context);
	}
}

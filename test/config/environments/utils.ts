import { createHash } from 'crypto';
import { join } from 'path';
import type { Context } from 'vm';
import type { BibTeXTidyResult } from '../../../src';
import type { Options } from '../../../src/optionUtils';
import { cacheTidyResult } from '../testResultCacher/testResultCacheClient';

type Tidy = (bibtex: string, options?: Options) => Promise<BibTeXTidyResult>;

export const TMP_DIR = join(__dirname, '..', '..', '.tmp');

export function cacheTidyResults(
	tidy: Tidy,
	env: string,
	context: Context | null
): Tidy {
	return async (...args) => {
		const result = await tidy(...args);
		const testName = context?.expect.getState().currentTestName;
		await cacheTidyResult(queueId(env, testName), result.bibtex);
		return result;
	};
}

export function queueId(env: string, testName: string) {
	return `${createHash('md5')
		.update(testName)
		.digest('hex')
		.slice(0, 6)}-${env}`;
}

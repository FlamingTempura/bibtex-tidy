import type { Event, State } from 'jest-circus';
import NodeEnvironment from 'jest-environment-node';
import { getTidyResult } from '../testResultCacher/testResultCacheClient';
import { queueId } from './utils';

/**
 * Checks the output of each test is identical across CLI, API, and browser.
 */
export default class ConsistencyEnvironment extends NodeEnvironment {
	async setup() {
		await super.setup();
	}

	async handleTestEvent(event: Event, state: State) {
		const ctx = this.context;
		const currTest = state.currentlyRunningTest;
		if (!currTest || !ctx) {
			return;
		}

		currTest.fn = async () => {
			const [cliResult, webResult, apiResult] = await Promise.all([
				getTidyResult(queueId('cli', currTest.name)),
				getTidyResult(queueId('web', currTest.name)),
				getTidyResult(queueId('api', currTest.name)),
			]);

			ctx.expect(cliResult).toBe(apiResult);
			ctx.expect(webResult).toBe(apiResult);
		};
	}
}

import { Request, Push } from 'zeromq';
import { CACHE_PUT_URI, CACHE_REQ_URI } from './testResultCacheConfig';

const pushSock = new Push();
pushSock.connect(CACHE_PUT_URI);

/**
 * Send the result of running bibtex-tidy to the cache server for later use by the
 * consistency and idempotence checks.
 */
export async function cacheTidyResult(testId: string, result: string) {
	await pushSock.send([testId, result]);
}

/**
 * Fetch the result of running tidy within the given test for the cache server, waiting
 * until that test has been run if necessary.
 */
export async function getTidyResult(testId: string): Promise<string> {
	const getSock = new Request();
	getSock.connect(CACHE_REQ_URI);
	await getSock.send(testId);
	const [result] = await getSock.receive();
	return String(result);
}

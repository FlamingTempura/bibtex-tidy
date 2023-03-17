import { Pull, Reply } from 'zeromq';
import { CACHE_PUT_URI, CACHE_REQ_URI } from './testResultCacheConfig';

const cache = new Map<string, string>();
const cacheListeners = new Set<(id: string) => void>();

export async function startTestResultCacheServer() {
	const testResultSink = new Pull();
	const testResultSender = new Reply();

	await testResultSink.bind(CACHE_PUT_URI);
	await testResultSender.bind(CACHE_REQ_URI);

	void subscriptionListener(testResultSink, (id, result) => {
		cache.set(id, result);
		for (const listener of cacheListeners) {
			listener(id);
		}
	});

	requestListener(testResultSender, (id) => {
		const result = cache.get(id);
		if (result) {
			testResultSender.send(result);
		} else {
			const callback = (id_: string) => {
				if (id_ === id) {
					testResultSender.send(cache.get(id)!);
					cacheListeners.delete(callback);
				}
			};
			cacheListeners.add(callback);
		}
	});

	return () => {
		testResultSink.close();
		testResultSender.close();
	};
}

async function subscriptionListener(
	sock: Pull,
	callback: (id: string, result: string) => void
) {
	for await (const [id, result] of sock) {
		callback(String(id), String(result));
	}
}

async function requestListener(sock: Reply, callback: (id: string) => void) {
	for await (const [id] of sock) {
		callback(String(id));
	}
}

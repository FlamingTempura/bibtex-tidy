import { startTestResultCacheServer } from './testResultCacher/testResultCacheServer';

export default async () => {
	(globalThis as any).stopCacheServer = await startTestResultCacheServer();
};

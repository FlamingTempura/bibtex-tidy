import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		fileParallelism: false,
		hookTimeout: 30_000,
		include: ["test/spec/ui-e2e.test.ts"],
		testTimeout: 30_000,
	},
});

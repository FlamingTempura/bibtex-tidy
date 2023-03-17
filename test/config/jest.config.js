const { resolve } = require('path');

const defaultProjectOptions = {
	roots: [resolve(__dirname, '..')],
	testMatch: [resolve(__dirname, '../e2e/*.spec.ts')],
	// esbuild-jest is significantly faster than ts-jest
	transform: { '.*': 'esbuild-jest' },
};

module.exports = {
	globalSetup: resolve(__dirname, './setup.ts'),
	globalTeardown: resolve(__dirname, './teardown.ts'),
	projects: [
		{
			...defaultProjectOptions,
			displayName: 'JS library E2E tests',
			testEnvironment: resolve(__dirname, './environments/api.ts'),
		},
		{
			...defaultProjectOptions,
			displayName: 'CLI E2E tests',
			testEnvironment: resolve(__dirname, './environments/cli.ts'),
		},
		{
			...defaultProjectOptions,
			displayName: 'Web E2E tests',
			testEnvironment: resolve(__dirname, './environments/web.ts'),
		},
		{
			...defaultProjectOptions,
			displayName: 'Consistency tests',
			testEnvironment: resolve(__dirname, './environments/consistency.ts'),
		},
	],
};

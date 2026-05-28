import { join } from "node:path";
import {
	type MatchImageSnapshotOptions,
	toMatchImageSnapshot,
} from "jest-image-snapshot";
import { type Browser, chromium, type Page } from "playwright";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { WEB_URL } from "./support.ts";

const SNAPSHOT_DIR = join(import.meta.dirname, "__snapshots__");
const REPORT_DIR = join(process.cwd(), "test-results", "ui-vr");

const defaultOptions: MatchImageSnapshotOptions = {
	comparisonMethod: "ssim",
	customDiffConfig: {
		ssim: "fast",
	},
	customDiffDir: REPORT_DIR,
	customReceivedDir: REPORT_DIR,
	customSnapshotsDir: SNAPSHOT_DIR,
	failureThreshold: 0.01,
	failureThresholdType: "percent",
	storeReceivedOnFailure: true,
};

expect.extend({ toMatchImageSnapshot });

async function newLoadedPage(browser: Browser): Promise<Page> {
	const page = await browser.newPage({
		viewport: {
			width: 1280,
			height: 720,
		},
	});

	await page.goto(WEB_URL);
	await page.waitForFunction(() => window.cmEditor);
	await page.evaluate(() => document.fonts.ready);
	await page.addStyleTag({
		content: ".cm-cursor { display: none !important; }",
	});

	return page;
}

async function takeScreenshot(page: Page): Promise<Buffer> {
	return await page.screenshot({
		animations: "disabled",
		fullPage: true,
	});
}

describe("UI visual regression", () => {
	let browser: Browser | undefined;

	beforeAll(async () => {
		browser = await chromium.launch();
	});

	afterAll(async () => {
		await browser?.close();
	});

	test("matches the loaded UI snapshot", async () => {
		if (!browser) throw new Error("Browser was not started");

		const page = await newLoadedPage(browser);

		try {
			expect(await takeScreenshot(page)).toMatchImageSnapshot({
				...defaultOptions,
				customSnapshotIdentifier: "ui-loaded",
			});
		} finally {
			await page.close();
		}
	});

	test("matches the Tidy result snapshot", async () => {
		if (!browser) throw new Error("Browser was not started");

		const page = await newLoadedPage(browser);

		try {
			await page.getByRole("button", { name: "Tidy" }).click();
			await page.locator("[role=alert]").waitFor();

			expect(await takeScreenshot(page)).toMatchImageSnapshot({
				...defaultOptions,
				customSnapshotIdentifier: "ui-tidy-result",
			});
		} finally {
			await page.close();
		}
	});
});

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { type Browser, chromium, type Page } from "playwright";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { WEB_URL } from "./support.ts";

const SNAPSHOT_DIR = join(import.meta.dirname, "__snapshots__");
const UPDATE_SNAPSHOTS = process.env.UPDATE_VISUAL_SNAPSHOTS === "1";

async function readSnapshot(snapshotPath: string): Promise<Buffer | undefined> {
	try {
		return await readFile(snapshotPath);
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === "ENOENT") return;
		throw error;
	}
}

async function writeSnapshot(
	snapshotPath: string,
	screenshot: Buffer,
): Promise<void> {
	await mkdir(dirname(snapshotPath), { recursive: true });
	await writeFile(snapshotPath, screenshot);
}

async function expectScreenshotToMatchSnapshot(
	snapshotName: string,
	screenshot: Buffer,
): Promise<void> {
	const snapshotPath = join(SNAPSHOT_DIR, snapshotName);

	if (UPDATE_SNAPSHOTS) {
		await writeSnapshot(snapshotPath, screenshot);
		return;
	}

	const snapshot = await readSnapshot(snapshotPath);
	if (!snapshot) {
		await writeSnapshot(snapshotPath, screenshot);
		return;
	}

	expect(screenshot.equals(snapshot), `${snapshotName} changed`).toBe(true);
}

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
			await expectScreenshotToMatchSnapshot(
				"ui-loaded.png",
				await takeScreenshot(page),
			);
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

			await expectScreenshotToMatchSnapshot(
				"ui-tidy-result.png",
				await takeScreenshot(page),
			);
		} finally {
			await page.close();
		}
	});
});

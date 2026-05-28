import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { type Browser, chromium, type Page } from "playwright";
import { afterAll, beforeAll, describe, test } from "vitest";
import { WEB_URL } from "./support.ts";

const SNAPSHOT_DIR = join(import.meta.dirname, "__snapshots__");
const REPORT_DIR = join(process.cwd(), "test-results", "ui-vr");
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

function snapshotBaseName(snapshotName: string): string {
	return snapshotName.replace(/\.png$/, "");
}

async function writeMismatchReport(
	snapshotName: string,
	expected: Buffer,
	actual: Buffer,
): Promise<string> {
	const baseName = snapshotBaseName(snapshotName);
	const expectedFile = `${baseName}-expected.png`;
	const actualFile = `${baseName}-actual.png`;
	const reportFile = `${baseName}.html`;
	const reportPath = join(REPORT_DIR, reportFile);

	await mkdir(REPORT_DIR, { recursive: true });
	await writeFile(join(REPORT_DIR, expectedFile), expected);
	await writeFile(join(REPORT_DIR, actualFile), actual);
	await writeFile(
		reportPath,
		`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${snapshotName} visual diff</title>
<style>
body { margin: 24px; font: 14px sans-serif; color: #111; background: #f7f7f7; }
h1 { font-size: 20px; margin: 0 0 16px; }
.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.panel { background: white; border: 1px solid #ddd; padding: 12px; }
.panel h2 { font-size: 14px; margin: 0 0 8px; }
img { display: block; max-width: 100%; border: 1px solid #ccc; background: white; }
.diff { position: relative; display: inline-block; max-width: 100%; }
.diff img + img { position: absolute; inset: 0; mix-blend-mode: difference; opacity: .85; }
</style>
</head>
<body>
<h1>${snapshotName}</h1>
<div class="grid">
	<section class="panel"><h2>Expected</h2><img src="${expectedFile}" alt="Expected"></section>
	<section class="panel"><h2>Actual</h2><img src="${actualFile}" alt="Actual"></section>
</div>
<section class="panel" style="margin-top: 16px;">
	<h2>Difference Overlay</h2>
	<div class="diff">
		<img src="${expectedFile}" alt="Expected">
		<img src="${actualFile}" alt="Actual">
	</div>
</section>
</body>
</html>
`,
	);

	return reportPath;
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

	if (!screenshot.equals(snapshot)) {
		const reportPath = await writeMismatchReport(
			snapshotName,
			snapshot,
			screenshot,
		);
		throw new Error(`${snapshotName} changed. See ${reportPath}`);
	}
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

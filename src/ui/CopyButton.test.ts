// @vitest-environment happy-dom

import { fireEvent, render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom/vitest";
import CopyButton from "./CopyButton.svelte";

describe("CopyButton", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("copies bibtex when clicked", async () => {
		const writeText = vi.fn().mockResolvedValue(undefined);
		Object.defineProperty(navigator, "clipboard", {
			configurable: true,
			value: { writeText },
		});

		render(CopyButton, { bibtex: "@article{test}" });

		const button = screen.getByRole("button", { name: "Copy bibtex" });
		await fireEvent.click(button);

		expect(writeText).toHaveBeenCalledWith("@article{test}");
	});

	it("changes button text from Copy to Copied! after a successful copy", async () => {
		const writeText = vi.fn().mockResolvedValue(undefined);
		Object.defineProperty(navigator, "clipboard", {
			configurable: true,
			value: { writeText },
		});

		render(CopyButton, { bibtex: "@article{test}" });

		const button = screen.getByRole("button", { name: "Copy bibtex" });
		expect(button).toHaveTextContent("Copy");

		await fireEvent.click(button);

		expect(button).toHaveTextContent("Copied!");
	});

	it("alerts when copying fails", async () => {
		const writeText = vi.fn().mockRejectedValue(new Error("copy failed"));
		const alertSpy = vi.fn();
		Object.defineProperty(globalThis, "alert", {
			configurable: true,
			value: alertSpy,
		});
		Object.defineProperty(navigator, "clipboard", {
			configurable: true,
			value: { writeText },
		});

		render(CopyButton, { bibtex: "@article{test}" });

		await fireEvent.click(screen.getByRole("button", { name: "Copy bibtex" }));

		expect(alertSpy).toHaveBeenCalledWith("Failed to copy");
	});
});

// @vitest-environment happy-dom

import { fireEvent, render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom/vitest";
import { normalizeOptions, type OptionsNormalized } from "../optionUtils.ts";
import ValueOptions from "./ValueOptions.svelte";

describe("ValueOptions", () => {
	const baseOptions: OptionsNormalized = normalizeOptions({
		align: 14,
		space: 2,
		blankLines: false,
		escape: false,
		unescape: false,
	});

	it("hides the special character options when disabled", () => {
		render(ValueOptions, { options: baseOptions });

		expect(
			screen.getByLabelText("Transform special characters"),
		).toBeInTheDocument();
		expect(
			screen.queryByRole("radio", { name: "Escape" }),
		).not.toBeInTheDocument();
	});

	it("enables escape mode by default when the combined checkbox is selected", async () => {
		const onchange = vi.fn();
		render(ValueOptions, { options: baseOptions, onchange });

		await fireEvent.click(
			screen.getByLabelText("Transform special characters"),
		);

		expect(onchange).toHaveBeenCalledWith({
			...baseOptions,
			escape: "new",
			unescape: false,
		});
	});

	it("selects the matching radio for legacy escape and unescape states", () => {
		const { rerender } = render(ValueOptions, {
			options: { ...baseOptions, escape: true, unescape: false },
		});

		expect(screen.getByRole("radio", { name: "Legacy escape" })).toBeChecked();

		rerender({
			options: { ...baseOptions, escape: false, unescape: true },
		});

		expect(screen.getByRole("radio", { name: "Unescape" })).toBeChecked();
	});

	it("updates the option state when switching between transform modes", async () => {
		const onchange = vi.fn();
		render(ValueOptions, {
			options: { ...baseOptions, escape: "new", unescape: false },
			onchange,
		});

		await fireEvent.click(screen.getByRole("radio", { name: "Legacy escape" }));
		await fireEvent.click(screen.getByRole("radio", { name: "Unescape" }));

		expect(onchange).toHaveBeenNthCalledWith(1, {
			...baseOptions,
			escape: true,
			unescape: false,
		});
		expect(onchange).toHaveBeenNthCalledWith(2, {
			...baseOptions,
			escape: false,
			unescape: true,
		});
	});

	it("clears both transform options when the combined checkbox is disabled", async () => {
		const onchange = vi.fn();
		render(ValueOptions, {
			options: { ...baseOptions, escape: false, unescape: true },
			onchange,
		});

		await fireEvent.click(
			screen.getByLabelText("Transform special characters"),
		);

		expect(onchange).toHaveBeenCalledWith({
			...baseOptions,
			escape: false,
			unescape: false,
		});
	});
});

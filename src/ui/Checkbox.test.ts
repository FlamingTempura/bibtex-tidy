// @vitest-environment happy-dom

import { fireEvent, render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom/vitest";
import Checkbox from "./Checkbox.svelte";

describe("Checkbox", () => {
	it("is unchecked by default", () => {
		render(Checkbox);

		const input = screen.getByRole("checkbox");
		expect(input).not.toBeChecked();
	});

	it("respects the checked prop", () => {
		render(Checkbox, { checked: true });

		expect(screen.getByRole("checkbox")).toBeChecked();
	});

	it("calls onchange with the current checked value", async () => {
		const onchange = vi.fn();
		render(Checkbox, { onchange });

		const input = screen.getByRole("checkbox");
		await fireEvent.click(input);
		await fireEvent.click(input);

		expect(onchange).toHaveBeenNthCalledWith(1, true);
		expect(onchange).toHaveBeenNthCalledWith(2, false);
	});

	it("forwards standard input attributes", () => {
		render(Checkbox, { disabled: true });

		expect(screen.getByRole("checkbox")).toBeDisabled();
	});
});

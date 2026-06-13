// @vitest-environment happy-dom

import { fireEvent, render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom/vitest";
import NumberInput from "./NumberInput.svelte";

describe("NumberInput", () => {
	it("defaults to 0", () => {
		render(NumberInput);

		expect(screen.getByRole("spinbutton")).toHaveValue(0);
	});

	it("respects the value prop", () => {
		render(NumberInput, { value: 42 });

		expect(screen.getByRole("spinbutton")).toHaveValue(42);
	});

	it("calls oninput with numeric values", async () => {
		const oninput = vi.fn();
		render(NumberInput, { oninput });

		const input = screen.getByRole("spinbutton");
		await fireEvent.input(input, { target: { value: "17" } });
		await fireEvent.input(input, { target: { value: "3" } });

		expect(oninput).toHaveBeenNthCalledWith(1, 17);
		expect(oninput).toHaveBeenNthCalledWith(2, 3);
	});

	it("forwards standard input attributes", () => {
		render(NumberInput, { disabled: true, min: 1, max: 10 });

		const input = screen.getByRole("spinbutton");
		expect(input).toBeDisabled();
		expect(input).toHaveAttribute("min", "1");
		expect(input).toHaveAttribute("max", "10");
	});
});

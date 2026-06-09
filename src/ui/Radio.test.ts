// @vitest-environment happy-dom

import { fireEvent, render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom/vitest";
import Radio from "./Radio.svelte";

describe("Radio", () => {
	it("forwards standard input attributes", () => {
		render(Radio, { value: "one", disabled: true, name: "group-a" });

		const input = screen.getByRole("radio");
		expect(input).toBeDisabled();
		expect(input).toHaveAttribute("name", "group-a");
	});

	it("respects the checked prop", async () => {
		render(Radio, { value: "selected", checked: true });

		const input = screen.getByRole("radio");
		expect(input).toBeChecked();

		await fireEvent.click(input);
		expect(input).toBeChecked();
	});

	it("calls onchange with the selected value", async () => {
		const onchange = vi.fn();
		render(Radio, { value: "selected", onchange });

		await fireEvent.click(screen.getByRole("radio"));

		expect(onchange).toHaveBeenCalledWith("selected");
	});
});

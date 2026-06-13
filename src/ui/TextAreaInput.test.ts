// @vitest-environment happy-dom

import { fireEvent, render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom/vitest";
import TextAreaInput from "./TextAreaInput.svelte";

describe("TextAreaInput", () => {
	it("defaults to an empty string", () => {
		render(TextAreaInput);

		expect(screen.getByRole("textbox")).toHaveValue("");
	});

	it("respects the value prop", () => {
		render(TextAreaInput, { value: "initial value" });

		expect(screen.getByRole("textbox")).toHaveValue("initial value");
	});

	it("calls oninput with current text", async () => {
		const oninput = vi.fn();
		render(TextAreaInput, { oninput });

		const textarea = screen.getByRole("textbox");
		await fireEvent.input(textarea, { target: { value: "first" } });
		await fireEvent.input(textarea, { target: { value: "second" } });

		expect(oninput).toHaveBeenNthCalledWith(1, "first");
		expect(oninput).toHaveBeenNthCalledWith(2, "second");
	});

	it("forwards standard textarea attributes", () => {
		render(TextAreaInput, {
			disabled: true,
			rows: 12,
			placeholder: "Type here",
		});

		const textarea = screen.getByRole("textbox");
		expect(textarea).toBeDisabled();
		expect(textarea).toHaveAttribute("rows", "12");
		expect(textarea).toHaveAttribute("placeholder", "Type here");
	});
});

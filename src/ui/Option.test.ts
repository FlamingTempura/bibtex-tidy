// @vitest-environment happy-dom

import { fireEvent, render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom/vitest";
import { createRawSnippet } from "svelte";
import Option from "./Option.svelte";

describe("Option", () => {
	it("renders option title from definitions", () => {
		render(Option, { option: "curly" });

		expect(screen.getByText("Enclose values in braces")).toBeInTheDocument();
		expect(screen.getByRole("checkbox")).toBeInTheDocument();
	});

	it("calls onchange with toggled value", async () => {
		const onchange = vi.fn();
		render(Option, { option: "curly", onchange });

		const input = screen.getByRole("checkbox");
		await fireEvent.click(input);
		await fireEvent.click(input);

		expect(onchange).toHaveBeenNthCalledWith(1, true);
		expect(onchange).toHaveBeenNthCalledWith(2, false);
	});

	it("renders sub-options only when checked", () => {
		const children = createRawSnippet(() => ({
			render: () => "<span>Nested option</span>",
		}));

		const { rerender } = render(Option, {
			option: "curly",
			checked: false,
			children,
		});

		expect(screen.queryByText("Nested option")).not.toBeInTheDocument();

		rerender({ option: "curly", checked: true, children });

		expect(screen.getByText("Nested option")).toBeInTheDocument();
	});
});

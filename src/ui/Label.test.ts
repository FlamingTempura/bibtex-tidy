// @vitest-environment happy-dom

import { render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom/vitest";
import { createRawSnippet } from "svelte";
import Label from "./Label.svelte";

describe("Label", () => {
	it("renders children content", () => {
		render(Label, {
			children: createRawSnippet(() => ({
				render: () => "<span>Label content</span>",
			})),
		});

		expect(screen.getByText("Label content")).toBeInTheDocument();
	});

	it("forwards title attribute", () => {
		render(Label, {
			title: "Helpful tooltip",
			children: createRawSnippet(() => ({
				render: () => "<span>With title</span>",
			})),
		});

		expect(screen.getByTitle("Helpful tooltip")).toBeInTheDocument();
	});
});

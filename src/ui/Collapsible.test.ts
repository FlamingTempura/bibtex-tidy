// @vitest-environment happy-dom

import { render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom/vitest";
import { createRawSnippet } from "svelte";
import Collapsible from "./Collapsible.svelte";

describe("Collapsible", () => {
	it("renders closed by default", () => {
		render(Collapsible, { title: "Section" });

		expect(screen.getByRole("group")).not.toHaveAttribute("open");
	});

	it("renders open when open is true", () => {
		render(Collapsible, { title: "Section", open: true });

		expect(screen.getByRole("group")).toHaveAttribute("open");
	});

	it("renders title and content", () => {
		render(Collapsible, {
			title: "Section",
			children: createRawSnippet(() => ({
				render: () => "<span>Body content</span>",
			})),
		});

		expect(screen.getByText("Section")).toBeInTheDocument();
		expect(screen.getByRole("group")).toHaveTextContent("Section Body content");
	});
});

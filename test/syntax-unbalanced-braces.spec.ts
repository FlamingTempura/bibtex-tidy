import { strictEqual } from "node:assert";
import { bibtexTidy, test } from "./utils";

test("syntax-error on unbalanced braces", async () => {
	const err1 = await getError("@misc{foo,title={moo {foo}} bar}}");
	strictEqual(err1?.constructor.name, "BibTeXSyntaxError");
	strictEqual("char" in err1 && err1.char, "b");

	// Braces must also be balanced in quotes
	// https://web.archive.org/web/20210422110817/https://maverick.inria.fr/~Xavier.Decoret/resources/xdkbibtex/bibtex_summary.html
	const err2 = await getError('@misc{foo,title="moo {foo}} bar"}');
	strictEqual(err2?.constructor.name, "BibTeXSyntaxError");
	strictEqual("char" in err2 && err2.char, "}");
});

async function getError(input: string): Promise<Error | undefined> {
	try {
		await bibtexTidy(input, undefined, ["api"]);
	} catch (e) {
		return e instanceof Error ? e : new Error("Expected an error");
	}
	return;
}

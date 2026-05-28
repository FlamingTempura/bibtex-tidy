import { tidy } from "../../bibtex-tidy.js";

const input1 = `@article{foobar,
	title         {My first paper},
	author       = {Leg, Table}
}
`;

const input2 = `@article{foo{bar,
	title         {My first paper},
	author       = {Leg, Table}
}
`;

const input3 = `@article{foobar,
	title        = invalid literal,
	author       = {Leg, Table}
}
`;

const input4 = `@article{foobar,
	title        = ,
	author       = {Leg, Table}
}
`;

const input5 = `@article{foobar,
	title        = "foo",
	author       = {Leg,} Table}
}
`;

const input6 = `@article{= "foo",
	author       = {Leg, Table}
}
`;

test("syntax-error", () => {
	expect(getError(input1)?.name).toBe("Syntax Error");
	expect(getError(input2)?.name).toBe("Syntax Error");
	expect(getError(input3)?.name).toBe("Syntax Error");
	expect(getError(input4)?.name).toBe("Syntax Error");
	expect(getError(input5)?.name).toBe("Syntax Error");
	expect(getError(input6)?.name).toBe("Syntax Error");
});

test("syntax-error on unbalanced braces", async () => {
	const err1 = getError("@misc{foo,title={moo {foo}} bar}}");
	expect(err1?.constructor.name).toBe("BibTeXSyntaxError");
	if (!err1) throw new Error("Expected syntax error");
	expect("char" in err1 && err1.char).toBe("b");

	// Braces must also be balanced in quotes
	// https://web.archive.org/web/20210422110817/https://maverick.inria.fr/~Xavier.Decoret/resources/xdkbibtex/bibtex_summary.html
	const err2 = getError('@misc{foo,title="moo {foo}} bar"}');
	expect(err2?.constructor.name).toBe("BibTeXSyntaxError");
	if (!err2) throw new Error("Expected syntax error");
	expect("char" in err2 && err2.char).toBe("}");
});

function getError(input: string): Error | undefined {
	try {
		tidy(input);
	} catch (e) {
		return e instanceof Error ? e : new Error("Expected an error");
	}
	return;
}

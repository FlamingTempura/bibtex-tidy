import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input1 = bibtex`
@article{foobar,
	title         {My first paper},
	author       = {Leg, Table}
}
`;

const input2 = bibtex`
@article{foo{bar,
	title         {My first paper},
	author       = {Leg, Table}
}
`;

const input3 = bibtex`
@article{foobar,
	title        = invalid literal,
	author       = {Leg, Table}
}
`;

const input4 = bibtex`
@article{foobar,
	title        = ,
	author       = {Leg, Table}
}
`;

const input5 = bibtex`
@article{foobar,
	title        = "foo",
	author       = {Leg,} Table}
}
`;

const input6 = bibtex`
@article{= "foo",
	author       = {Leg, Table}
}
`;

test("syntax-error", async () => {
	strictEqual((await getError(input1))?.name, "Syntax Error");
	strictEqual((await getError(input2))?.name, "Syntax Error");
	strictEqual((await getError(input3))?.name, "Syntax Error");
	strictEqual((await getError(input4))?.name, "Syntax Error");
	strictEqual((await getError(input5))?.name, "Syntax Error");
	strictEqual((await getError(input6))?.name, "Syntax Error");
});

async function getError(input: string): Promise<Error | undefined> {
	try {
		await bibtexTidy(input, undefined, ["api"]);
	} catch (e) {
		return e instanceof Error ? e : new Error("Expected an error");
	}
	return;
}

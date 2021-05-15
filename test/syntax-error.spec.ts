import { strictEqual } from 'assert';
import { BibTeXSyntaxError } from '../src/bibtex-parser';
import { bibtex, bibtexTidy, test } from './utils';

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

test('syntax-error', async () => {
	strictEqual((await getError(input1)) instanceof BibTeXSyntaxError, true);
	strictEqual((await getError(input2)) instanceof BibTeXSyntaxError, true);
	strictEqual((await getError(input3)) instanceof BibTeXSyntaxError, true);
	strictEqual((await getError(input4)) instanceof BibTeXSyntaxError, true);
	strictEqual((await getError(input5)) instanceof BibTeXSyntaxError, true);
	strictEqual((await getError(input6)) instanceof BibTeXSyntaxError, true);
});

async function getError(input: string): Promise<unknown> {
	try {
		await bibtexTidy(input);
	} catch (e) {
		return e;
	}
	return;
}

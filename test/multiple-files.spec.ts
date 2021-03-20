import { bibtex, test, checkSame } from './utils';

const file1 = bibtex`
@article{a,
    number={1},
    title={A}
}`;

const file2 = bibtex`
@article{b,
  number={1},
  title={B}
}`;

const output1 = bibtex`
@article{a,
  number        = {1},
  title         = {A}
}
`;

const output2 = bibtex`
@article{b,
  number        = {1},
  title         = {B}
}
`;

test(
	'multiple files',
	async (t, tidy) => {
		const tidied = await tidy([file1, file2]);
		if (!('bibtexs' in tidied)) throw new Error('expected multiple bibtexs');
		checkSame(t, tidied.bibtexs[0], output1);
		checkSame(t, tidied.bibtexs[1], output2);
	},
	{ cliOnly: true }
);

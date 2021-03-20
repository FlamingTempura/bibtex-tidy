import tap from 'tap';
import { bibtex, bibtexTidy } from './utils';

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

tap.test('multiple files', async (t) => {
	const tidied = await bibtexTidy([file1, file2], undefined, ['cli']);
	t.equal(tidied.cli?.bibtexs[0], output1);
	t.equal(tidied.cli?.bibtexs[1], output2);
});

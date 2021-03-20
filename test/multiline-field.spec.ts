import tap from 'tap';
import { bibtex, bibtexTidy } from './utils';

const input = bibtex`
% Entries
@ARTICLE{Cesar2013,
  author = {{A},
            B. and {C},
            D.},
  title = {An amazing title},
  volume="n.s.~2",
}`;

const output = bibtex`
% Entries
@article{Cesar2013,
  author        = {{A}, B. and {C}, D.},
  title         = {An amazing title},
  volume        = "n.s.~2"
}
`;

tap.test('multiline fields', async (t) => {
	const tidied = await bibtexTidy(input); // #86, #177 (multiline fields), #198 (ACM bibtex)
	t.equal(tidied.bibtex, output);
});

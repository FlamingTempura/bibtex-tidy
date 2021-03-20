import { bibtex, test, checkSame } from './utils.js';

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

test('multiline fields', async (t, tidy) => {
	const tidied = await tidy(input); // #86, #177 (multiline fields), #198 (ACM bibtex)
	checkSame(t, tidied.bibtex, output);
});

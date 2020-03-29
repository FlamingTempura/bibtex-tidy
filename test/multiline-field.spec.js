import { bibtex, test, checkSame } from './utils';

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

test('multiline fields', (t, tidy) => {
	const tidied = tidy(input); // #86, #177 (multiline fields), #198 (ACM bibtex)
	checkSame(t, tidied.bibtex, output);
});

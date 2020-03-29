import { bibtex, test, checkSame } from './utils';

const input = bibtex`

	@article{
	  title = {Something},
    }

@article{
    title = {Something},
}

	@article{
	  title = {Something},
	}
`;

const output = bibtex`
@article{
  title         = {Something}
}

@article{
  title         = {Something}
}

@article{
  title         = {Something}
}
`;

test('spacing before first entry', (t, tidy) => {
	const tidied = tidy(input, { tidyComments: false });
	checkSame(t, tidied.bibtex, output);
});

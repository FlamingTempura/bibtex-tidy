import { bibtex, test, checkSame } from './utils';

const input = bibtex`

	@article{a,
	  title = {Something},
    }

@article{b,
    title = {Something},
}

	@article{c,
	  title = {Something},
	}
`;

const output = bibtex`
@article{a,
  title         = {Something}
}

@article{b,
  title         = {Something}
}

@article{c,
  title         = {Something}
}
`;

test('spacing before first entry', (t, tidy) => {
	const tidied = tidy(input, { tidyComments: false });
	checkSame(t, tidied.bibtex, output);
});

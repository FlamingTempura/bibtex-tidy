import { bibtex, test, checkSame } from './utils.js';

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

test('spacing before first entry', async (t, tidy) => {
	const tidied = await tidy(input, { tidyComments: false });
	checkSame(t, tidied.bibtex, output);
});

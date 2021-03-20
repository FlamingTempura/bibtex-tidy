import tap from 'tap';
import { bibtex, bibtexTidy } from './utils';

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

tap.test('spacing before first entry', async (t) => {
	const tidied = await bibtexTidy(input, { tidyComments: false });
	t.equal(tidied.bibtex, output);
});

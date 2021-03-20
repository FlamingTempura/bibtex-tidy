import tap from 'tap';
import { bibtex, bibtexTidy } from './utils';

const input = bibtex`
@ARTICLE {foobar,
  title={Foo Bar},
  abstract={
    Paragraph 1
    ...continued

    Paragraph 2
  },
}`;

const output = bibtex`
@article{foobar,
  title               = {Foo Bar},
  abstract            = {
    Paragraph 1 ...continued

    Paragraph 2
  }
}
`;

tap.test('paragraphs in values', async (t) => {
	const tidied = await bibtexTidy(input, { align: 20 });
	t.equal(tidied.bibtex, output);
});

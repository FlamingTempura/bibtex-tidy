import { strictEqual } from 'assert';
import { bibtex, bibtexTidy, test } from './utils';

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

test('paragraphs in values', async () => {
	const tidied = await bibtexTidy(input, { align: 20 });
	strictEqual(tidied.bibtex, output);
});

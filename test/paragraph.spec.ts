import { bibtex, test, checkSame } from './utils';

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

test('paragraphs in values', (t, tidy) => {
	const tidied = tidy(input, { align: 20 });
	checkSame(t, tidied.bibtex, output);
});

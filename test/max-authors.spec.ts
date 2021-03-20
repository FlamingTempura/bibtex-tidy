import tap from 'tap';
import { bibtex, bibtexTidy } from './utils';

const input = bibtex`
@ARTICLE {test,
  author={Saija Meryem and Kamal Tel and Erika Graziano and Steve Naliaka and Vilmar Kaveri and Yaƙubu Paisley and Daniel Ayaz and Lenore Siemowit and Damian Nurbek and Moreno Kristine and Kortney Tatiana and Zosimos Concepta and Gebahard Jean-Charles and Lamija Nagendra and Liidia Nunziatina and Mattias Erika and Zorione Dona and Gyeong-Suk Netanyahu and Shaniqua Oier and Kiley Mehrnaz and Şan Christina and Stefanie Puleng and Regīna Kristofor and Pancratius Grigori and Viktor Ami and Walter Enya and Coeus Ariah and Rosalía Cyrilla and Iomhar Lyyti and Birgit Costantino}
}`;

const output = bibtex`
@article{test,
  author        = {Saija Meryem and Kamal Tel and Erika Graziano and Steve Naliaka and others}
}
`;

tap.test('maximum number of authors', async (t) => {
	const tidied = await bibtexTidy(input, { maxAuthors: 4 });
	t.equal(tidied.bibtex, output);
});

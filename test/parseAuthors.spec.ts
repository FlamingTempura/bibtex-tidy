import { deepStrictEqual } from 'assert';
import { parseAuthors } from '../src/parseAuthors';
import { test } from './utils';

test('parseAuthors', () => {
	deepStrictEqual(parseAuthors('Feinberg, Andrew P and Vogelstein, Bert'), [
		{ firstNames: 'Andrew P', lastName: 'Feinberg' },
		{ firstNames: 'Bert', lastName: 'Vogelstein' },
	]);

	deepStrictEqual(parseAuthors('Angenendt, Arnold'), [
		{ firstNames: 'Arnold', lastName: 'Angenendt' },
	]);

	deepStrictEqual(parseAuthors('Baez, John C. and Lauda, Aaron D.'), [
		{ firstNames: 'John C.', lastName: 'Baez' },
		{ firstNames: 'Aaron D.', lastName: 'Lauda' },
	]);

	deepStrictEqual(
		parseAuthors(`Herrmann, Wolfgang A. and {"O}fele, Karl and Sabine K. Schneider
      and Herdtweck, Eberhardt and Hoffmann, Stephan D.`),
		[
			{ firstNames: 'Wolfgang A.', lastName: 'Herrmann' },
			{ firstNames: 'Karl', lastName: '{"O}fele' },
			{ firstNames: 'Sabine K.', lastName: 'Schneider' },
			{ firstNames: 'Eberhardt', lastName: 'Herdtweck' },
			{ firstNames: 'Stephan D.', lastName: 'Hoffmann' },
		]
	);

	deepStrictEqual(
		parseAuthors(`Hostetler, Michael J. and Wingate, Julia E. and Zhong,
    Chuan-Jian and Harris, Jay E. and Vachet, Richard W. and
    Clark, Michael R.  and Londono, J. David and Green, Stephen
    J. and Stokes, Jennifer J.  and Wignall, George D. and Glish,
    Gary L. and Porter, Marc D.  and Evans, Neal D. and Murray,
    Royce W.`),
		[
			{ firstNames: 'Michael J.', lastName: 'Hostetler' },
			{ firstNames: 'Julia E.', lastName: 'Wingate' },
			{ firstNames: 'Chuan-Jian', lastName: 'Zhong' },
			{ firstNames: 'Jay E.', lastName: 'Harris' },
			{ firstNames: 'Richard W.', lastName: 'Vachet' },
			{ firstNames: 'Michael R.', lastName: 'Clark' },
			{ firstNames: 'J. David', lastName: 'Londono' },
			{ firstNames: 'Stephen J.', lastName: 'Green' },
			{ firstNames: 'Jennifer J.', lastName: 'Stokes' },
			{ firstNames: 'George D.', lastName: 'Wignall' },
			{ firstNames: 'Gary L.', lastName: 'Glish' },
			{ firstNames: 'Marc D.', lastName: 'Porter' },
			{ firstNames: 'Neal D.', lastName: 'Evans' },
			{ firstNames: 'Royce W.', lastName: 'Murray' },
		]
	);

	deepStrictEqual(
		parseAuthors(
			'Arnold Chau AND John Dawson AND Paul Mitchell AND Tian Hong Loh'
		),
		[
			{ firstNames: 'Arnold', lastName: 'Chau' },
			{ firstNames: 'John', lastName: 'Dawson' },
			{ firstNames: 'Paul', lastName: 'Mitchell' },
			{ firstNames: 'Tian Hong', lastName: 'Loh' },
		]
	);
});

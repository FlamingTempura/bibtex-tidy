import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@CUSTOMD{LDN3,
  OPTIONS     = {labelalphanametemplatename=customd},
  AUTHOR	    = {Vela, Luis and given={Ura Ru}, family={Juan}, suffix={Sr}, prefix={von}},
}
`;

test("extended name format (BibLaTeX)", async () => {
	// just check it parses
	await bibtexTidy(input);
});

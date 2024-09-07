import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@ARTICLE {foobar,
  title={A very very very very very very very very very very very very very very very very long title},
  abstract={
    
  While the Quantified Self and personal informatics fields have focused on the individual's use of self-logged data about themselves, the same kinds of data could, in theory, be used to improve diagnosis and care planning. In this paper, we seek to understand both the opportunities and bottlenecks in the use of self-logged data for differential diagnosis and care planning during patient visits to both primary and secondary care. 

  We first conducted a literature review to identify potential factors influencing the use of self-logged data in clinical settings. This informed the design of our experiment, in which we applied a vignette-based role-play approach with general practitioners and hospital specialists in the US and UK, to elicit reflections on and insights about using patient self-logged data. Our analysis reveals multiple opportunities for the use of self-logged data in the differential diagnosis workflow, identifying capture, representational, and interpretational challenges that are potentially preventing self-logged data from being effectively interpreted and applied by clinicians to derive a patient's prognosis and plan of care.
  },
  url = {https://web.archive.org/web/20211230024101/https://flamingtempura.github.io/bibtex-tidy/}
}`;

const output = bibtex`
@article{foobar,
  title         = {
    A very very very very very very very very very very very very very very very
    very long title
  },
  abstract      = {
    While the Quantified Self and personal informatics fields have focused on the
    individual's use of self-logged data about themselves, the same kinds of data
    could, in theory, be used to improve diagnosis and care planning. In this
    paper, we seek to understand both the opportunities and bottlenecks in the
    use of self-logged data for differential diagnosis and care planning during
    patient visits to both primary and secondary care.

    We first conducted a literature review to identify potential factors
    influencing the use of self-logged data in clinical settings. This informed
    the design of our experiment, in which we applied a vignette-based role-play
    approach with general practitioners and hospital specialists in the US and
    UK, to elicit reflections on and insights about using patient self-logged
    data. Our analysis reveals multiple opportunities for the use of self-logged
    data in the differential diagnosis workflow, identifying capture,
    representational, and interpretational challenges that are potentially
    preventing self-logged data from being effectively interpreted and applied by
    clinicians to derive a patient's prognosis and plan of care.
  },
  url           = {
    https://web.archive.org/web/20211230024101/https://flamingtempura.github.io/bibtex-tidy/
  }
}
`;

test("wrap values", async () => {
	const tidied = await bibtexTidy(input, { wrap: 82 });
	strictEqual(tidied.bibtex, output);
});

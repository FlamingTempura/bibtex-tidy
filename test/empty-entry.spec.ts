import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@misc{emptyref,
  
}
@misc{emptyref2
  
}`;

const output = bibtex`
@misc{emptyref,
}
@misc{emptyref2,
}
`;

test("empty entry", async () => {
	const tidied = await bibtexTidy(input);
	strictEqual(output, tidied.bibtex);
});

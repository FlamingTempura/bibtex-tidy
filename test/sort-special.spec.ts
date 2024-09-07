import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
%references
@article{foo,
  title="Foo"
}
@preamble{{abc}}
@xdata{data,a={1}}
% last thing
@article{bar,
  title="Bar"
}
@string{fooobaar}
@article{foobar,
  title="Bar"
}
% another last thing
@string{fooo}
@xdata{moo,boo={hoo}}
`;

const output = bibtex`
@preamble{{abc}}
@xdata{data,
  a             = {1}
}
@string{fooobaar}
% another last thing
@string{fooo}
@xdata{moo,
  boo           = {hoo}
}
%references
@article{foo,
  title         = "Foo"
}
% last thing
@article{bar,
  title         = "Bar"
}
@article{foobar,
  title         = "Bar"
}
`;

test("sort entries by special entries first", async () => {
	const tidied = await bibtexTidy(input, { sort: ["special"] });
	strictEqual(tidied.bibtex, output);
});

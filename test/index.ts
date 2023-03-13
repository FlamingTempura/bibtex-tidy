import { readdirSync } from 'fs';

readdirSync(__dirname)
	.filter((file) => file.endsWith('.spec.ts'))
	.forEach((file) => require(`./${file}`));

require('../src/cli/argsParser.spec.ts');
require('../src/cli/argsToOptions.spec.ts');

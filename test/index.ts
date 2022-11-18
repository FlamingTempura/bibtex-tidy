import { readdirSync } from 'fs';

readdirSync(__dirname)
	.filter((file) => file.endsWith('drop-all-caps.spec.ts'))
	.forEach((file) => require(`./${file}`));

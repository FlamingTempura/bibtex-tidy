import { readdirSync } from 'fs';

readdirSync(__dirname)
	//.filter((file) => file.startsWith('align'))
	.filter((file) => file.endsWith('.spec.ts'))
	.forEach((file) => require(`./${file}`));

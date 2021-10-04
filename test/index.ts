import { readdirSync } from 'fs';

readdirSync(__dirname)
	.filter((file) => file.endsWith('uthors.spec.ts'))
	.forEach((file) => require(`./${file}`));

import { CLIOptions } from './options';

// @ts-ignore
import optionsDocumentation from 'DOCS';

/**
 * Description of each option
 */
export const optionDocs = optionsDocumentation as {
	key: keyof CLIOptions;
	cli: string;
	description: string;
	examples?: string[];
	type: 'array' | 'number' | 'boolean';
	default: string | boolean | number | string[];
	deprecated: boolean;
}[];

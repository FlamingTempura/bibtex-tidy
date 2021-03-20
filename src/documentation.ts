import { CLIOptions } from './options';

// @ts-ignore
import optionsDocumentation from 'DOCS';

export type OptionDoc = {
	key: keyof CLIOptions;
	cli: string;
	description: string;
	examples?: string[];
	type: 'array' | 'number' | 'boolean';
	default: string | boolean | number | string[];
	deprecated: boolean;
};

/**
 * Description of each option
 */
export const optionDocs = optionsDocumentation as OptionDoc[];

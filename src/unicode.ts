// source: https://raw.githubusercontent.com/pkgw/worklog-tools/master/unicode_to_latex.py
// @ts-ignore
import unicodeFromTSV from './unicode.tsv';

type CharacterMapping = [string, string];

export const unicode = unicodeFromTSV as CharacterMapping[];

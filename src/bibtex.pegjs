{
  const parseNumber = str => {
    switch (options.number) {
      case 'string':
        return str;
      case 'number':
        return parseInt(str, 10);
      case 'bigint':
        return BigInt(str);
      default:
        const n = parseInt(str, 10);
        if (n > Number.MAX_SAFE_INTEGER) return BigInt(str);
        return n;
    }
  }
}
// A bibtex file comprises a series of prambles, strings, entries, and comments.
START
  = items:ITEM* {
      return items.reduce((memo, item) => {
        let last = memo[memo.length - 1];
        if (last && last.itemtype === 'comment' && item.itemtype === 'comment') {
          last.comment += item.comment; // merge comments together
        } else {
          memo.push(item);
        }
        return memo;
      }, []); 
    }

// Order matters in the rule below - if something is not a preamble, string,
// or entry, then it can be assumed to be a comment
ITEM "preamble, entry, string, or comment"
  = preamble:PREAMBLE { return { itemtype: 'preamble', ...preamble }; }
  / keyval:STRING     { return { itemtype: 'string', ...keyval }; }
  / entry:ENTRY       { return { itemtype: 'entry', ...entry }; }
  / comment:COMMENT   { return { itemtype: 'comment', comment }; }

// Preambles may be enclosed in either braces or parentheses. A preamble
// should contain an expression (e.g. a quoted string), but I have also found
// bibtex files in the wild which contain unenclosed text within the 
// preamble.
PREAMBLE "preamble"
  = '@preamble'i _ value:(
        '(' _ value:EXPRESSION _ ')' { return { enclosed: 'parentheses', ...value }; }
      / '{' _ value:EXPRESSION _ '}' { return { enclosed: 'braces', ...value }; }
      / '(' value:BRACED ')' { return { enclosed: 'parentheses', value, datatype: 'unenclosed', raw: value }; }
      / '{' value:BRACED '}' { return { enclosed: 'braces', value, datatype: 'unenclosed', raw: value }; }
    ) { return value; }

// A string allows the definition of a constant (e.g. @string{mar = "March"}).
// It may be enclosed in either braces or parentheses.
STRING "string"
    = '@string'i _ keyval:(
          '(' _ keyval:ASSIGNMENT _ ')' { return keyval; }
        / '{' _ keyval:ASSIGNMENT _ '}' { return keyval; }
      ) { return keyval; }

// Any text outside of an entry is interpreted as a comment. @ may be used if
// it is clearly not part of an entry (so it can be used within an email
// address). @comment{...} can be used to comment out multiple lines. @comment
// also causes the rest of the line to become commented out.
COMMENT "comment"
  = $[^@]+ 
  / $('@' (
        'comment'i ( _ '{' BRACED '}' / [^\n\r]* LINE_END )
      / [^A-Za-z0-9]+ 
      / IDENTIFIER _ [^{(]
    ))

// An entry is 
ENTRY "entry"
  = '@'
    !('comment'i / 'preamble'i / 'string'i) type:IDENTIFIER _
    body:(
        '{' _ body:ENTRY_BODY _ '}' { return { enclosed: 'braces', ...body }; }
      / '(' _ body:ENTRY_BODY _ ')' { return { enclosed: 'parentheses', ...body }; }
    )
    { return { type: type.toLowerCase(), ...body, raw: text() }; }

// An entry should be OK without a key
ENTRY_BODY
  = key:(
      key:IDENTIFIER _ ',' { return key; }
    )? _
    fields:(
      first:ASSIGNMENT
      rest:(
        _ ',' _ assignment:ASSIGNMENT { return assignment; }
      )*
      { return [first, ...rest]; }
    )? _ ','?
    { return { key, fields: fields || [] }; }

// An assignment is valid even if no value is given
ASSIGNMENT "assignment"
  = name:IDENTIFIER_LEFT value:(
      _ '=' _ value:EXPRESSION { return value; }
    )? { return { name, ...(value ? value : { value: null, datatype: 'null', raw: '' }) }; }

// Literals may be concatinated using the # symbol
EXPRESSION "expression"
  = first:LITERAL
    rest:(
      _ '#' _ value:LITERAL { return value; }
    )*
    { return rest.length > 0 ? { value: [first, ...rest], datatype: 'concatinate', raw: text() } : first; }

// A literal can be a string in double quotes, string in curly braces, number, or identifier
LITERAL "literal"
  = '"' value:QUOTED '"' { return { value, datatype: 'quoted',     raw: text() }; }
  / '{' value:BRACED '}' { return { value, datatype: 'braced',     raw: text() }; }
  / value:NUMBER         { return { value, datatype: 'number',     raw: text() }; }
  / value:IDENTIFIER     { return { value, datatype: 'identifier', raw: text() }; }

IDENTIFIER "identifier"
  = $[^=#,{}()\[\] \t\n\r]+

// An identifier on the left hand side can contain spaces and hashes (not by
// specification, but I have seen examples in the wild).
IDENTIFIER_LEFT "key for assignment"
  = $(IDENTIFIER ([# ]+ IDENTIFIER_LEFT)?)

NUMBER "number"
  = [0-9]+ { return parseNumber(text()); }

// Braces are allowed within braced values as long as they are closed
BRACED "braced value"
  = $((ESCAPED_CHAR / [^{}])* ('{' BRACED '}' BRACED)?)

// Any character is allowed inside a quoted string, but " must be escaped
QUOTED "quoted string"
  = $((ESCAPED_CHAR / [^"{])* ('{' (BRACED '}')? QUOTED)?)

ESCAPED_CHAR
  = '\\\\' / '\\{' / '\\}' / '\\"'

_ "whitespace"
  = [ \t\n\r]*

LINE_END "end of line"
  = '\n' / '\r\n' / '\r' / '\u2028' / '\u2029' / !. // !. is end of file

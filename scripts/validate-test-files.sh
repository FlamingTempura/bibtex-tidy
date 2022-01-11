#!/bin/sh

# Check that all test bibtex files are valid

mkdir -p .tmp
cd .tmp

shopt -s globstar
for i in ../test/bibliographies/**/*.bib; do

echo "$i"

  rm texput.*

  pdflatex > /dev/null <<EOF
\documentclass{article}
\begin{document}
foo!
\nocite{*}
\bibliographystyle{plain}
\bibliography{$i}
\end{document}
EOF

  log=$(bibtex -terse texput.aux)

  if [ $? -ne 0 ]
  then
    echo "Invalid bibtex: $i"
    echo "$log" | grep -v '^Warning'
    exit 1
  fi

done

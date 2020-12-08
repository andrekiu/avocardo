SRC="src/chrome_extension/config/$1/*"
MV_SRC=$(cp $SRC build/chrome_extension)
MV_IMGS=$(cp src/chrome_extension/img/* build/chrome_extension)
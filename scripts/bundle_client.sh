REMOVE_LAST=$(rm build/chrome_extension/*)
SRC="
  src/chrome_extension/config/background.js
  src/chrome_extension/config/script.js
"
CAT_MANIFEST=$(cat src/chrome_extension/config/manifest.json.$1 > build/chrome_extension/manifest.json)
CAT_INDEX=$(cat src/chrome_extension/config/index.html.$1 > build/chrome_extension/index.html)
MV_SRC=$(cp $SRC build/chrome_extension)
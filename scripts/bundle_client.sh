cp src/chrome_extension/config/* build/chrome_extension_dev
yarn run --experimental-scope-hoisting parcel watch  src/chrome_extension/UI.re -d build/chrome_extension_dev --no-hmr
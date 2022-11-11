echo "Building react updater-ui..."
rm -rf ./build
cd updater-ui
npm run build

echo "Fixing script links..."
sed -i 's/\/static/static/g' ./build/index.html

echo "Deploying react updater-ui into build..."
cp -r build ../build
cd ..

echo "Creating actual bridge..."
rm -rf ./build/bridge
cp -r ./src/bridge ./build/bridge

echo "Done."
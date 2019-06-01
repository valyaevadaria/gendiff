install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js

publish:
	npm publish --dry-run

link:
	npm link

lint:
	npx eslint  .

test:
	npm test
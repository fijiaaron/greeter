# node settings
NODE=node
NPM=npm
NODE_ENV=test

# test config
MOCHA=./node_modules/.bin/mocha
REPORTER=list
TIMEOUT=60000

test:
	$(MOCHA) --reporter $(REPORTER) --timeout $(TIMEOUT) --recursive

deps: 
	$(NPM) install -d 

deps-clean:
	rm -rf ./node_modules
	make deps	

.PHONY: test deps deps-clean
SHELL := /bin/bash

build:: clean
	tsc ./engine.ts --out project.js

clean::
	erase project.js
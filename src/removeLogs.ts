#!/usr/bin/env node

import * as fs from "node:fs";
import * as path from "node:path";

const currentDirectory = process.cwd();
const rootProjectDirectory = process.argv.slice(0, 2);

console.log(currentDirectory);
console.log(rootProjectDirectory);

#!/usr/bin/env node

import * as fs from "node:fs";
import * as path from "node:path";

function getFiles(currdir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(currdir);

  files.forEach((file) => {
    if (!(file === ".git" || file === "node_modules")) {
      const filePath = path.join(currdir, file);
      if (fs.statSync(filePath).isDirectory()) {
        getFiles(filePath, fileList);
      } else {
        if (file.endsWith(".tsx") || file.endsWith(".jsx")) {
          fileList.push(filePath);
        }
      }
    }
  });
  return fileList;
}

const currentDirectory = process.cwd();
console.log(getFiles(currentDirectory));

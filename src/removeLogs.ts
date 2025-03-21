#!/usr/bin/env node

import * as fs from "node:fs";
import * as path from "node:path";
import { ServerLogger } from "./index.js";

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

let logs = 0;

function countLogs(file: string) {
  const content = fs.readFileSync(file);
  content
    .toString()
    .split("\n")
    .forEach((f) => {
      if (f.includes("console.log") || f.includes("ClientLogger.")) {
        logs++;
      }
    });
}

const currentDirectory = process.cwd();
const tsfiles = getFiles(currentDirectory);
tsfiles.forEach((ts) => countLogs(ts));

ServerLogger.success(`Found ${logs} logs`);

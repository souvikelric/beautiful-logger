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

// Remove `console.log(...)` and `ClientLogger.` lines
function cleanFile(filePath: string) {
  const content = fs.readFileSync(filePath, "utf-8");

  const cleanedContent = content
    .split("\n") // Split by lines
    .filter(
      (line) => !/console\.log\(/.test(line) && !/ClientLogger\./.test(line)
    ) // Remove unwanted lines
    .join("\n"); // Rejoin as a string

  if (content !== cleanedContent) {
    fs.writeFileSync(filePath, cleanedContent, "utf-8");
    console.log(`✅ Cleaned: ${filePath}`);
  }
}

const currentDirectory = process.cwd();
const tsfiles = getFiles(currentDirectory);
const args = process.argv.slice(2);
if (args.length === 0) {
  ServerLogger.error("Provide an argument like --count or --remove");
  process.exit();
} else if (args[0] === "--count") {
  tsfiles.forEach((ts) => countLogs(ts));
  ServerLogger.success(`Found ${logs} logs`);
} else if (args[0] === "--remove") {
  tsfiles.forEach((ts) => cleanFile(ts));
}

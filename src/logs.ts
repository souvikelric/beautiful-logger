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
let commentedLogs = 0;

//count console.logs and ClientLogger. across the project
function countLogs(file: string) {
  const content = fs.readFileSync(file);
  content
    .toString()
    .split("\n")
    .forEach((f) => {
      if (f.includes("console.") || f.includes("ClientLogger.")) {
        logs++;
        if (f.trim().startsWith("//")) {
          commentedLogs++;
        }
      }
    });
}

//comment all logs that are not commented
function commentLogs(file: string) {
  const content = fs.readFileSync(file, "utf-8");
  let contentArr = content.toString().split("\n");
  let parenBalance = true;
  let updatedContentArr: string[] = [];
  contentArr.forEach((l) => {
    if (l.includes("import") && l.includes("ClientLogger")) {
      l = "//" + l;
    }
    if (
      l.includes("console.") ||
      l.includes("ClientLogger.") ||
      !parenBalance
    ) {
      if (!l.trim().startsWith("//") || !parenBalance) {
        l = "//" + l;
      }
      if (l.trim().endsWith(")") || l.trim().endsWith(");")) {
        parenBalance = true;
      } else {
        parenBalance = false;
      }
    }
    updatedContentArr.push(l);
  });
  let updatedContent: string = updatedContentArr.join("\n");
  if (content !== updatedContent) {
    fs.writeFileSync(file, updatedContent, "utf-8");
    //console.log(`✅ Commented: ${file}`);
  }
}

type ConsoleType = "log" | "warn" | "error";

function showLogs({ only = [], exclude = [] } = {}) {
  const original = {
    log: console.log,
    warn: console.warn,
    error: console.error,
  };

  const shouldShow = (type: string, args: string[]) => {
    const str = args.map(String).join(" ");
    if (only.length && !only.some((term) => str.includes(term))) return false;
    if (exclude.length && exclude.some((term) => str.includes(term)))
      return false;

    return true;
  };

  (["log", "warn", "error"] as ConsoleType[]).forEach((type: ConsoleType) => {
    console[type] = (...args: string[]) => {
      if (shouldShow(type, args)) {
        original[type](...args);
      }
    };
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
  ServerLogger.error(
    "Provide an argument like --count or --remove or --comment"
  );
  process.exit();
} else if (args[0] === "--count") {
  tsfiles.forEach((ts) => countLogs(ts));
  ServerLogger.success(`Found ${logs} logs in total`);
  ServerLogger.info(`${commentedLogs} commented`);
  ServerLogger.info(`${logs - commentedLogs} uncommented`);
} else if (args[0] === "--remove") {
  tsfiles.forEach((ts) => cleanFile(ts));
} else if (args[0] === "--comment") {
  tsfiles.forEach((ts) => commentLogs(ts));
  ServerLogger.success("✅ All logs commented");
}

import * as os from "node:os";

const styles = {
  info: "color: blue; font-weight: bold;",
  warn: "color: orange; font-weight: bold;",
  error: "color: red; font-weight: bold;",
  success: "color: green; font-weight: bold;",
};

const clientLogger = {
  log: (msg: string) => console.log(`%c${msg}`, styles.info),
  warn: (msg: string) => console.warn(`%c${msg}`, styles.warn),
  error: (msg: string) => console.error(`%c${msg}`, styles.error),
  success: (msg: string) => console.log(`%c${msg}`, styles.success),
};

const ansiColors = {
  reset: "\x1b[0m",
  info: "\x1b[34m", // Blue
  success: "\x1b[32m", // Green
  warn: "\x1b[33m", // Yellow
  error: "\x1b[31m", // Red
  debug: "\x1b[35m", // Magenta
};

class ServerLogger {
  static log(
    level: keyof typeof ansiColors,
    message: string,
    date: boolean = false
  ) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `${ansiColors[level]}${message} ${
      date ? timestamp : ""
    } ${ansiColors.reset}`;
    console.log(formattedMessage);
  }

  static info(message: string) {
    this.log("info", message);
  }

  static success(message: string) {
    this.log("success", message);
  }

  static warn(message: string) {
    this.log("warn", message);
  }

  static error(message: string) {
    this.log("error", message);
  }

  static debug(message: string) {
    this.log("debug", message);
  }
}

export { clientLogger, ServerLogger };

let cpuInfo = os.cpus();
ServerLogger.success(`Machine Model : ${cpuInfo[0].model}`);
console.log("Number of Cores :", cpuInfo.length);
console.log("Total Memory : ", os.totalmem());
console.log("Free Memory : ", os.freemem());

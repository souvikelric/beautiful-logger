import * as os from "node:os";

function formatDate(date: Date) {
  const pad = (num: number) => num.toString().padStart(2, "0");

  const mm = pad(date.getMonth() + 1); // Months are 0-based
  const dd = pad(date.getDate());
  const yyyy = date.getFullYear();

  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${mm}:${dd}:${yyyy} ${hh}:${min}:${ss}`;
}

const styles = {
  info: "color: blue; font-weight: bold; background-color: #f1f1f1; margin:2px 4px",
  warn: "color: orange; font-weight: bold;  background-color: #f1f1f1; margin:2px 4px",
  error:
    "color: red; font-weight: bold;  background-color: #f1f1f1; margin:2px 4px",
  success:
    "color: green; font-weight: bold;  background-color: #f1f1f1; margin:2px 4px",
};

const clientLogger = {
  log: (msg: string) => console.log(`%c${msg}`, styles.info),
  warn: (msg: string) => console.warn(`%c${msg}`, styles.warn),
  error: (msg: string) => console.error(`%c${msg}`, styles.error),
  success: (msg: string) => console.log(`%c${msg}`, styles.success),
};

const ansiColors = {
  fgWhite: "\x1b[37m", //White
  reset: "\x1b[0m",
  info: "\x1b[34m", // Blue
  success: "\x1b[32m", // Green
  warn: "\x1b[33m", // Yellow
  error: "\x1b[31m", // Red
  debug: "\x1b[35m", // Magenta
};

const bgColors = {
  reset: "\x1b[0m",
  error: "\x1b[41m", // Red background
  success: "\x1b[42m", // Green background
  warn: "\x1b[43m", // Yellow background
  info: "\x1b[44m", // Blue background
  debug: "\x1b[45m", // Magenta background
  cyan: "\x1b[46m", // Cyan background
  bgWhite: "\x1b[47m", // White background
};

class ServerLogger {
  static log(
    level: keyof typeof ansiColors,
    message: string,
    date: boolean = false
  ) {
    const timestamp = formatDate(new Date());
    const formattedMessage = `${ansiColors[level]}${message} ${
      date ? timestamp : ""
    } ${ansiColors.reset}`;
    console.log(formattedMessage);
  }

  static logWithBg(
    level: keyof typeof bgColors,
    message: string,
    date: boolean = false
  ) {
    const timestamp = formatDate(new Date());
    const formattedMessage = `${bgColors[level]}${
      ansiColors.fgWhite
    }${message} ${date ? timestamp : ""}${ansiColors.reset} `;
    console.log(formattedMessage);
  }

  static info(message: string, timestamp?: boolean) {
    this.log("info", message, timestamp);
  }

  static infoBg(message: string, timestamp?: boolean) {
    this.logWithBg("info", message, timestamp);
  }

  static success(message: string, timestamp?: boolean) {
    this.log("success", message, timestamp);
  }

  static successBg(message: string, timestamp?: boolean) {
    this.logWithBg("success", message, timestamp);
  }

  static warn(message: string, timestamp?: boolean) {
    this.log("warn", message, timestamp);
  }

  static warnBg(message: string, timestamp?: boolean) {
    this.logWithBg("warn", message, timestamp);
  }

  static error(message: string, timestamp?: boolean) {
    this.log("error", message, timestamp);
  }

  static errorBg(message: string, timestamp?: boolean) {
    this.logWithBg("error", message, timestamp);
  }

  static debug(message: string, timestamp?: boolean) {
    this.log("debug", message, timestamp);
  }

  static debugBg(message: string, timestamp?: boolean) {
    this.logWithBg("debug", message, timestamp);
  }

  static cyanBg(message: string, timestamp?: boolean) {
    this.logWithBg("cyan", message, timestamp);
  }
}

export { clientLogger, ServerLogger };

let cpuInfo = os.cpus();
ServerLogger.success(`Machine Model : ${cpuInfo[0].model}`);
ServerLogger.infoBg(`Number of Cores : ${cpuInfo.length}`);
ServerLogger.errorBg(`Total Memory : ${os.totalmem()}`);
ServerLogger.cyanBg(`Free Memory : ${os.freemem()}`, true);

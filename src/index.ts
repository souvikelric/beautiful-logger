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

type timeFormats = "timeOnly" | "dateOnly";

type options = {
  timestamp?: boolean;
  timeFormat?: timeFormats;
};

class ClientLogger {
  static log(msg: string, style: keyof typeof styles, options?: options) {
    const date = formatDate(new Date());
    console.log(
      `%c${msg} ${options?.timestamp ? date + " " : ""}`,
      styles[style]
    );
  }
  static info(msg: string, options?: options) {
    this.log(msg, "info", options);
  }
  static warn(msg: string, options?: options) {
    this.log(msg, "warn", options);
  }
  static error(msg: string, options?: options) {
    this.log(msg, "error", options);
  }
  static success(msg: string, options?: options) {
    this.log(msg, "success", options);
  }
}

const ansiColors = {
  fgWhite: "\x1b[97m", //White
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
    const formattedMessage = `\x1b[97m${bgColors[level]} ${message} ${
      date ? timestamp + " " : ""
    }${ansiColors.reset} `;
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

export { ClientLogger, ServerLogger };

let cpuInfo = os.cpus();
ServerLogger.success(`Machine Model : ${cpuInfo[0].model}`);
ServerLogger.infoBg(`Number of Cores : ${cpuInfo.length}`);
ServerLogger.errorBg(`Total Memory : ${os.totalmem()}`);
ServerLogger.cyanBg(`Free Memory : ${os.freemem()}`, true);

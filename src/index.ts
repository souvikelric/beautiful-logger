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
    const timestamp = formatDate(new Date());
    const formattedMessage = `${ansiColors[level]}${message} ${
      date ? timestamp : ""
    } ${ansiColors.reset}`;
    console.log(formattedMessage);
  }

  static info(message: string, timestamp?: boolean) {
    this.log("info", message, timestamp);
  }

  static success(message: string, timestamp?: boolean) {
    this.log("success", message, timestamp);
  }

  static warn(message: string, timestamp?: boolean) {
    this.log("warn", message, timestamp);
  }

  static error(message: string, timestamp?: boolean) {
    this.log("error", message, timestamp);
  }

  static debug(message: string, timestamp?: boolean) {
    this.log("debug", message, timestamp);
  }
}

export { clientLogger, ServerLogger };

let cpuInfo = os.cpus();
ServerLogger.success(`Machine Model : ${cpuInfo[0].model}`);
ServerLogger.info(`Number of Cores : ${cpuInfo.length}`);
ServerLogger.error(`Total Memory : ${os.totalmem()}`);
ServerLogger.debug(`Free Memory : ${os.freemem()}`, true);

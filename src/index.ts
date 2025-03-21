function formatDate(date: Date, format?: timeFormats) {
  const pad = (num: number) => num.toString().padStart(2, "0");

  const mm = pad(date.getMonth() + 1); // Months are 0-based
  const dd = pad(date.getDate());
  const yyyy = date.getFullYear();

  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  let dateString = `${mm}:${dd}:${yyyy} ${hh}:${min}:${ss}`;
  if (format === "dateOnly") {
    return dateString.split(" ")[0];
  } else if (format === "timeOnly") {
    return dateString.split(" ")[1];
  } else if (format === "12h") {
    let hours = date.getHours();
    if (hours > 12) {
      hours = hours % 12;
      return `${hours}:${min}:${ss} PM`;
    } else {
      return `${hours}:${min}:${ss} AM`;
    }
  }

  return dateString;
}

const styles = {
  info: "color: rgb(81, 90, 230);; font-weight: bold; background-color: #f1f1f1; padding: 3px",
  warn: "color:rgb(198, 112, 20); font-weight: bold;  background-color: #f1f1f1; padding: 3px",
  error:
    "color: rgb(240, 57, 88); font-weight: bold;  background-color: #f1f1f1; padding: 3px",
  success:
    "color: rgb(9, 152, 98); font-weight: bold;  background-color: #f1f1f1; padding: 3px",
};

const invertedStyles = {
  info: "color: white; font-weight: bold; background-color:rgb(81, 90, 230); padding: 3px",
  warn: "color:white; font-weight: bold;  background-color: rgb(227, 140, 42);; padding: 3px",
  error:
    "color: white; font-weight: bold;  background-color:rgb(240, 57, 88); padding: 3px",
  success:
    "color: white; font-weight: bold;  background-color:rgb(9, 152, 98); padding: 3px",
};

type timeFormats = "timeOnly" | "dateOnly" | "12h";

type options = {
  label?: string;
  timestamp?: boolean;
  timeFormat?: timeFormats;
  inverted?: boolean;
  clear?: boolean;
};

class ClientLogger {
  // the base static function that all the other reference
  static log<T>(msg: T, style: keyof typeof styles, options: options = {}) {
    //checking msg is an object,if it is use JSON.stringify and convert it

    let label = options?.label ?? "";
    let formattedMsg =
      typeof msg === "object" ? JSON.stringify(msg, null, 2) : msg;

    let date =
      options?.timestamp && options?.timeFormat
        ? formatDate(new Date(), options?.timeFormat)
        : formatDate(new Date());
    if (options?.clear) {
      console.clear();
    }
    if (options?.inverted) {
      if (Array.isArray(msg)) {
        console.log(
          `%c${label + "Array"}${options?.timestamp ? " " + date : ""}`,
          invertedStyles[style]
        );
        console.table(msg);
        return;
      } else if (typeof msg === "object") {
        console.log(
          `%c${label + "Object"}${options?.timestamp ? " " + date : ""}`,
          invertedStyles[style]
        );
        console.table(msg);
        return;
      }

      console.log(
        `%c${label}${formattedMsg}${options?.timestamp ? " " + date : ""}`,
        invertedStyles[style]
      );
    } else {
      if (Array.isArray(msg)) {
        console.log(
          `%c${label + "Array"}${options?.timestamp ? " " + date : ""}`,
          invertedStyles[style]
        );
        console.table(msg);
        return;
      } else if (typeof msg === "object") {
        console.log(
          `%c${label + "Object"}${options?.timestamp ? " " + date : ""}`,
          invertedStyles[style]
        );
        console.table(msg);
        return;
      }

      console.log(
        `%c${label}${formattedMsg}${options?.timestamp ? " " + date : ""}`,
        styles[style]
      );
    }
  }

  // For info
  static info<T>(
    msg: T,
    options?: {
      timestamp?: boolean;
      timeFormat?: timeFormats;
      inverted?: boolean;
      clear?: boolean;
    }
  ) {
    this.log(msg, "info", options);
  }

  // For warn
  static warn<T>(
    msg: T,
    options?: {
      timestamp?: boolean;
      timeFormat?: timeFormats;
      inverted?: boolean;
      clear?: boolean;
    }
  ) {
    this.log(msg, "warn", options);
  }

  //For error
  static error<T>(
    msg: T | number,
    options?: {
      timestamp?: boolean;
      timeFormat?: timeFormats;
      inverted?: boolean;
      clear?: boolean;
    }
  ) {
    this.log(msg, "error", options);
  }

  //For success
  static success<T>(
    msg: T,
    options?: {
      timestamp?: boolean;
      timeFormat?: timeFormats;
      inverted?: boolean;
      clear?: boolean;
    }
  ) {
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
  static log<T>(
    level: keyof typeof ansiColors,
    message: T,
    date: boolean = false
  ) {
    const timestamp = formatDate(new Date());
    const formattedMessage = `${ansiColors[level]}${message} ${
      date ? timestamp : ""
    } ${ansiColors.reset}`;
    console.log(formattedMessage);
  }

  static logWithBg<T>(
    level: keyof typeof bgColors,
    message: T,
    date: boolean = false
  ) {
    const timestamp = formatDate(new Date());
    const formattedMessage = `\x1b[97m${bgColors[level]} ${message} ${
      date ? timestamp + " " : ""
    }${ansiColors.reset} `;
    console.log(formattedMessage);
  }

  static info<T>(message: T, timestamp?: boolean) {
    this.log("info", message, timestamp);
  }

  static infoBg<T>(message: T, timestamp?: boolean) {
    this.logWithBg("info", message, timestamp);
  }

  static success<T>(message: T, timestamp?: boolean) {
    this.log("success", message, timestamp);
  }

  static successBg<T>(message: T, timestamp?: boolean) {
    this.logWithBg("success", message, timestamp);
  }

  static warn<T>(message: T, timestamp?: boolean) {
    this.log("warn", message, timestamp);
  }

  static warnBg<T>(message: T, timestamp?: boolean) {
    this.logWithBg("warn", message, timestamp);
  }

  static error<T>(message: T, timestamp?: boolean) {
    this.log("error", message, timestamp);
  }

  static errorBg<T>(message: T, timestamp?: boolean) {
    this.logWithBg("error", message, timestamp);
  }

  static debug<T>(message: T, timestamp?: boolean) {
    this.log("debug", message, timestamp);
  }

  static debugBg<T>(message: T, timestamp?: boolean) {
    this.logWithBg("debug", message, timestamp);
  }

  static cyanBg<T>(message: T, timestamp?: boolean) {
    this.logWithBg("cyan", message, timestamp);
  }
}

export { ClientLogger, ServerLogger };

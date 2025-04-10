# 🌈 beautiful-logger

A beautifully styled logger utility for both **client-side** (browser) and **server-side** (Node.js) applications. Plus, a built-in CLI tool to manage your logs across a project — list, remove, or comment them all in one go!

---

## 📦 Installation

```bash
npm install beautiful-logger

yarn add beautiful-logger
```

# Two classes available to import

## 1. ClientLogger

    Helpful for client side app logging like React and Vue Apps
    Multiple functions provided to show log of different colors
    User can pass an extra argument of true as the second parameter to show timestamp of the log

## 2. ServerLogger

    Helpful for server side apps like Node.js or Express Apps even Next.js Server Components
    Multiple functions provided to show log of different colors
    User can pass an extra argument of true as the second parameter to show timestamp of the log
    Has separate functions to show coloured output and coloured background respectively

🚀 Features

✅ Two powerful logger classes:
ClientLogger – for styled logs in the browser (JS/TS)
ServerLogger – for colorful logs in Node.js terminal
🕹️ Built-in CLI:
Count all console.log usages
Remove or comment all logs (including beautiful-logger imports)
🕒 Optional timestamps with formatting
🎨 Supports custom RGB colors
🌗 Inverted styles for contrast

📖 Usage

## 1. ClientLogger (For browser)

```javascript
import { ClientLogger } from "beautiful-logger";

ClientLogger.info("Info log");
ClientLogger.warn("Warning message", { timestamp: true });
ClientLogger.error("Error happened", { inverted: true });
ClientLogger.success("All good!", { clear: true });
ClientLogger.rgb("Custom RGB log", { r: 100, g: 200, b: 100 });
ClientLogger.rgbInverted("Inverted RGB", { r: 200, g: 50, b: 100 });
```

## 🛠️ Options

```javascript
type options = {
  label?: string,
  timestamp?: boolean,
  timeFormat?: "timeOnly" | "dateOnly" | "12h",
  inverted?: boolean,
  clear?: boolean,
  r?: number,
  g?: number,
  b?: number,
};
```

## 2. ServerLogger (For Node.js)

```javascript
import { ServerLogger } from "beautiful-logger";

ServerLogger.info("Info log");
ServerLogger.success("Success log", true); // with timestamp
ServerLogger.warn("Warning!", true);
ServerLogger.error("Something went wrong");

ServerLogger.infoBg("Info with background", true);
ServerLogger.successBg("Success background", true);
```

## 💻 CLI Commands

**The beautiful-logger CLI gives you the power to analyze and clean up logs across your project.**

**🧾 Count all logs**
`npx beautiful-logger count`

_Prints the number of all console.log and beautiful-logger logs across your project._

## 🧹 Remove all logs

`npx beautiful-logger remove`

_Deletes all console.log, ClientLogger._, ServerLogger._ calls and their import statements._

## 💬 Comment all logs

`npx beautiful-logger comment`

_Comments all logs and beautiful-logger imports instead of deleting._

## 🌐 Works With

✅ JavaScript & TypeScript
✅ Node.js
✅ Browser (via bundlers like Vite, Webpack, etc.)
✅ CLI (cross-platform)

## 🧩 Future Plans

Add support for custom themes
Enable filtering specific file types via CLI

## MIT ©

## 🙌 Contributing

PRs are welcome! Feel free to open issues or suggestions for improvement.

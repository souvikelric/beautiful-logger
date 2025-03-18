import * as os from "node:os";

let cpuInfo = os.cpus();
console.log("Machine Model : ", cpuInfo[0].model);
console.log("Number of Cores :", cpuInfo.length);
console.log("Total Memory : ", os.totalmem());
console.log("Free Memory : ", os.freemem());

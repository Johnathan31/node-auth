import chalk from "chalk";

const logger = {
  info: (...msgs) => {
    console.info(chalk.blue.bold("[INFO]"), ...msgs);
  },
  success: (...msgs) => {
    console.log(chalk.green.bold("[SUCCESS]"), ...msgs);
  },
  warn: (...msgs) => {
    console.warn(chalk.yellow.bold("[WARNING]"), ...msgs);
  },
  error: (...msgs) => {
    console.error(chalk.red.bold("[ERROR]"), ...msgs);
  },
};

export default logger;

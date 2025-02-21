import chalk from 'chalk';
export class Logger {
    static error(message) {
        console.error(`${chalk.red.bold('[ERROR]')} ${message}`);
    }
    static warn(message) {
        console.warn(`${chalk.yellow.bold('[WARN]')} ${message}`);
    }
    static info(message) {
        console.error(`${chalk.magenta.bold('[INFO]')} ${message}`);
    }
    static success(message) {
        console.error(`${chalk.green.bold('[SUCCESS]')} ${message}`);
    }
    static debug(message) {
        console.error(`${chalk.gray.bold('[DEBUG]')} ${message}`);
    }
}

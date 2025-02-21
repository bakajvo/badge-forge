import chalk from 'chalk'

export class Logger {
    static error(message: string) {
        console.error(`${chalk.red.bold('[ERROR]')} ${message}`)
    }

    static warn(message: string) {
        console.warn(`${chalk.yellow.bold('[WARN]')} ${message}`)
    }

    static info(message: string) {
        console.error(`${chalk.magenta.bold('[INFO]')} ${message}`)
    }

    static success(message: string) {
        console.error(`${chalk.green.bold('[SUCCESS]')} ${message}`)
    }

    static debug(message: string) {
        console.error(`${chalk.gray.bold('[DEBUG]')} ${message}`)
    }
}

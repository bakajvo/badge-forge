import chalk from 'chalk'
import { Format, makeBadge } from 'badge-maker'
import { getConfig } from './config.js'
import { cli, isDebug } from './index.js'
import { readFile, existsSync } from 'node:fs'
import { JSONPath } from 'jsonpath-plus'
import { getFilename, interpolateString, saveSVG } from './utils.js'
import path from 'path'
import { Logger } from './logger.js'

const readFileContent = (source: string): Promise<object> => {
    return new Promise((resolve, reject) => {
        try {
            const filePath = path.relative(process.cwd(), source)
            if (!existsSync(filePath)) {
                reject(new Error(`File not found: ${filePath}`))
            }

            readFile(filePath, 'utf-8', (error, data) => {
                if (error) {
                    reject(error)
                }
                resolve(JSON.parse(data))
            })
        } catch (error) {
            reject(error)
        }
    })
}

const fetchUrlContent = (url: string): Promise<object> => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json().then(resolve).catch(reject)
                } else {
                    reject(response.statusText)
                }
            })
            .catch(reject)
    })
}

const getDataFromSource = (source: string): Promise<object> => {
    return new Promise((resolve, reject) => {
        if (source.startsWith('http')) {
            fetchUrlContent(source).then(resolve).catch(reject)
        } else {
            readFileContent(source).then(resolve).catch(reject)
        }
    })
}

const generateBadgeAndSave = (
    message: string,
    format: Omit<Format, 'message'>,
    outputPath: string
) => {
    const svgBadge = makeBadge({
        message,
        ...format,
    })
    saveSVG(svgBadge, outputPath)
}

export const generate = async () => {
    const config = await getConfig()
    if (!config) {
        cli.error(chalk.red('No config found. Exiting...'))
    } else {
        const { badges = [], outputFolder = 'badges' } = config

        for (const badge of badges) {
            const {
                source,
                path,
                message,
                filename = badge.label,
                ...badgeFormat
            } = badge

            const outputPath = `${outputFolder}/${getFilename(filename)}.svg`

            if (!source || !path) {
                generateBadgeAndSave(message, badgeFormat, outputPath)
                continue
            }
            try {
                const data = await getDataFromSource(source)

                let params: Array<unknown> = []
                Array.isArray(path)
                    ? path
                    : [path].forEach((pointer) => {
                          const result = JSONPath({ json: data, path: pointer })
                          params = params.concat(result)
                      })
                Logger.info(`Extracted ${params} from ${source}`)
                generateBadgeAndSave(
                    interpolateString(message, params),
                    badgeFormat,
                    outputPath
                )
            } catch (error: unknown) {
                Logger.error((error as Error).message)
            }
        }
    }
}

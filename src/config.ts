import { cosmiconfig } from 'cosmiconfig'
import { Configuration } from './types.js'
import { Logger } from './logger.js'
import { isDebug } from './index.js'

const explorer = cosmiconfig('badges')

export const getConfig = async (): Promise<Configuration | null> => {
    try {
        const result = await explorer.search()
        if (result) {
            if(isDebug) {
                Logger.debug(
                    `Loaded config:\n${JSON.stringify(result.config, null, 2)}`
                )
            }
            return result.config as Configuration
        } else {
            Logger.error(`Cannot find config.`)
            return null
        }
    } catch (error) {
        Logger.error(`Failed to find config. Reason: ${error}.`)
        return null
    }
}

import { Format } from 'badge-maker'

export type CliOptions = {
    debug?: boolean
}

export type Badge = Format & {
    filename?: string
    source?: string
    path?: string | Array<string>
}

export type Configuration = {
    badges: Array<Badge>
    outputFolder?: string
}

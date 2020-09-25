import { Level } from './level.enum';
export interface Message {
    timeout?: number,
    content: string,
    level: Level
}

import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '@nestjs/common';

const logger = new Logger('FileStorage');

export function readJson<T = any>(filename: string, dir: string): T {
    const filePath = path.resolve(__dirname, '../../src', dir, filename);
    logger.log(`Reading JSON from: ${filePath}`);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export function writeJson<T = any>(filename: string, data: T, dir: string): void {
    const filePath = path.resolve(__dirname, '../../src', dir, filename);
    logger.log(`Writing JSON to: ${filePath}`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

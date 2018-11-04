import * as fs from 'fs';
import * as path from 'path';

/**
 * Check to see whether the file or folder exists.
 * 
 * @param { string } path the location of the file or folder.
 * @return { Promise }
 */
const pathExists = (path: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err && err.code === 'ENOENT') resolve(false);
            else if (err) reject(err);
            if (stats.isFile() || stats.isDirectory()) resolve(true);
        });
    });
}

/**
 * Make a directory and return the file path that was created.
 * 
 * @param { string } dirPath the location of the directory to be created.
 * @returns { Promise }
 */
const makeDir = (dirPath: string): Promise<string | NodeJS.ErrnoException> => {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirPath, (err) => {
            if (!err || (err.code === 'EEXIST')) {
                return resolve(dirPath);
            } else {
                return reject(err);
            }
        });
    });
}

/**
 * Create a directory if it doesn't exist.
 * 
 * @param { string } directory the path of the desired directory.
 * @returns { Promise } returns async function
 */
export async function ensureDirectory(directory: string): Promise<any> {
    const itExists = await pathExists(directory);
    if (itExists)
        return directory;
    let currentPath = path.resolve(directory);
    let parent = path.dirname(currentPath);
    await ensureDirectory(parent);
    return makeDir(currentPath);
}

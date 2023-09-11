const path = require('node:path');
const os = require('node:os');

const { promises: fsPromises } = require('node:fs');
const { execSync } = require('node:child_process');

execSync(`cd ../ && pwd`, { stdio: 'inherit' });

const _OS_Type = os.type();

const rootPath = path.parse(__dirname).root;

console.log(_OS_Type);
console.log(__dirname);
console.log(rootPath);

console.log(path.parse(__dirname));

/**
 * /Users/user_omn/.nvs/default/bin
 * /Library/Frameworks/Python.framework/Versions/3.11/bin
 * /Users/user_omn/.nvs/default/bin
 * /opt/homebrew/bin
 * /opt/homebrew/sbin
 * /usr/local/bin
 * /System/Cryptexes/App/usr/bin
 * /usr/bin
 * /bin
 * /usr/sbin
 * /sbin
 */

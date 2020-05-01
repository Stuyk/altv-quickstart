import fs from 'fs';
import download from 'download';
import { exec } from 'child_process';
import rl from 'readline';

const platform = process.platform === 'win32' ? 'windows' : 'linux';
const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

let options = {
    1: 'Update Server Files',
    2: 'Exit'
};

let windowsURLS = [
    {
        url: `https://cdn.altv.mp/node-module/CHANGE_ME/x64_win32/update.json`,
        destination: '.'
    },
    {
        url: `https://cdn.altv.mp/node-module/CHANGE_ME/x64_win32/modules/node-module.dll`,
        destination: './modules'
    },
    {
        url: `https://cdn.altv.mp/node-module/CHANGE_ME/x64_win32/libnode.dll`,
        destination: '.'
    },
    {
        url: `https://cdn.altv.mp/server/CHANGE_ME/x64_win32/altv-server.exe`,
        destination: '.'
    },
    {
        url: `https://cdn.altv.mp/server/CHANGE_ME/x64_win32/data/vehmodels.bin`,
        destination: './data'
    },
    {
        url: `https://cdn.altv.mp/server/CHANGE_ME/x64_win32/data/vehmods.bin`,
        destination: './data'
    }
];

let linuxURLS = [
    {
        url: `https://cdn.altv.mp/node-module/CHANGE_ME/x64_linux/update.json`,
        destination: '.'
    },
    {
        url: `https://cdn.altv.mp/node-module/CHANGE_ME/x64_linux/modules/libnode-module.so`,
        destination: './modules'
    },
    {
        url: `https://cdn.altv.mp/node-module/CHANGE_ME/x64_linux/libnode.so.72`,
        destination: '.'
    },
    {
        url: `https://cdn.altv.mp/server/CHANGE_ME/x64_linux/altv-server`,
        destination: '.'
    },
    {
        url: `https://cdn.altv.mp/server/CHANGE_ME/x64_linux/data/vehmodels.bin`,
        destination: './data'
    },
    {
        url: `https://cdn.altv.mp/server/CHANGE_ME/x64_linux/data/vehmods.bin`,
        destination: './data'
    },
    {
        url: `https://cdn.altv.mp/others/start.sh`,
        destination: '.'
    }
];

async function question(question) {
    return new Promise(resolve => {
        readline.question(`\x1b[32m${question}\x1b[0m`, res => {
            if (!res) {
                res = undefined;
            }
            resolve(res);
        });
    });
}

async function downloadAll(urls) {
    return new Promise(async resolve => {
        for (let i = 0; i < urls.length; i++) {
            console.log(urls[i].url);
            await download(urls[i].url, urls[i].destination).catch(err => {
                throw err;
            });
            console.log(`\r\n[${i + 1}/${urls.length}] Complete`);
        }

        resolve();
    });
}

async function startup() {
    let res;

    console.log('Options:');
    Object.keys(options).forEach(key => {
        console.log(`${key} - ${options[key]}`);
    });

    res = await question('Select an option: ');
    if (!res) {
        res = 2;
    }

    if (isNaN(res)) {
        res = 2;
    } else {
        res = parseInt(res);
    }

    if (res === 2) {
        console.log('Exiting');
        process.exit(-1);
        return;
    }

    // Server Update
    if (res === 1) {
        res = undefined;
        console.log('Updating Server Files');
        console.log('Select Branch');
        console.log('0: Release [Default]');
        console.log('1: Release Candidate');
        console.log('2: Dev');
        res = await question('Select Branch: ');

        if (!res) {
            res = 0;
        }

        let branchSelection;
        if (parseInt(res) === 0) {
            branchSelection = 'release';
        }

        if (parseInt(res) === 1) {
            branchSelection = 'rc';
        }

        if (parseInt(res) === 2) {
            branchSelection = 'dev';
        }

        if (platform === 'windows') {
            console.log('Windows');
            windowsURLS.forEach(res => {
                res.url = res.url.replace('CHANGE_ME', branchSelection);
            });
            console.log('You have selected the release branch.');
        } else {
            console.log('Linux');
            linuxURLS.forEach(res => {
                res.url = res.url.replace('CHANGE_ME', branchSelection);
            });
            console.log('You have selected the release branch.');
        }

        if (platform === 'windows') {
            await downloadAll(windowsURLS);
        } else {
            await downloadAll(linuxURLS);
        }

        if (platform !== 'windows') {
            exec('chmod +x ./start.sh', (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });

            exec('chmod +x ./altv-server', (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });
        }

        console.log(`\r\n Download Complete! \r\n`);
        process.exit(0);
    }
}

startup();

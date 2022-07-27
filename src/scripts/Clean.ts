import fs from 'fs';

process.argv.slice(1).forEach((fpath) => {
    const abPath: string = './' + fpath;
    if (fs.existsSync(abPath)) {
        fs.rmdirSync(abPath, { recursive: true });
    }
});
process.exit(0);

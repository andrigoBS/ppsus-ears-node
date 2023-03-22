import fs from 'fs';

interface ParamsLogInterface {
    body: any,
    params: any,
    query: any,
}

export default class GenericLogger {
    public request(path: string, userId: number | undefined, code: number, paramsLog: ParamsLogInterface, result: any): void {
        const pathDir = `log${path}`;
        const fullPath = `${pathDir}/User_${userId}.txt`;
        console.log(fullPath);

        let file: Buffer = Buffer.from('');
        if(fs.existsSync(fullPath)){
            file = fs.readFileSync(fullPath);
        } else {
            fs.mkdirSync(pathDir, { recursive: true });
        }

        const fileResult = file.toString() + `[${code}] - ${JSON.stringify(paramsLog)} - ${JSON.stringify(result)}\n`;

        fs.writeFileSync(fullPath, fileResult);
    }
}

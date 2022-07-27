import fs from 'fs';

const envFileName: string = fs.existsSync('.env') ? '.env' : '.env.development';
fs.writeFileSync('build/.env', fs.readFileSync(envFileName));

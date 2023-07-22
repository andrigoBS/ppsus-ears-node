import fs from 'fs';
import fse from 'fs-extra';

class Build {
    public clearBuild(): Build {
        const abPath = './build';

        if (fs.existsSync(abPath)) {
            fs.rmdirSync(abPath, { recursive: true });
        }

        return this;
    }

    public CopyEnv(): Build {
        let envFileName = '.env.development';

        if(fs.existsSync('.env.production')) {
            envFileName = '.env.production';
        }

        if(fs.existsSync('.env')) {
            envFileName = '.env';
        }

        fse.copySync(envFileName, 'build/.env', { overwrite: true });

        return this;
    }

    public copyTemplates(): Build {
        fse.copySync('templates', 'build/templates', { overwrite: true });

        return this;
    }
}

new Build()
    .clearBuild()
    .CopyEnv()
    .copyTemplates()
;

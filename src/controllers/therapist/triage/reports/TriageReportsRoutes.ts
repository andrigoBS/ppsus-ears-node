import AbstractRoutes from '../../../../helpers/http/AbstractRoutes';
import { RouteConfig } from '../../../../helpers/http/AbstractRoutesTypes';
import { ValidatorRequest } from '../../../../helpers/validator/ValidatorRequest';
import TriageReportsController from './TriageReportsController';

export default class TriageReportsRoutes extends AbstractRoutes {
    private controller: TriageReportsController;

    constructor() {
        super();
        this.controller = new TriageReportsController();

        this.fileHistoricSerie();
        this.fileOrientations();
        this.fileRetest();
        this.fileTest();
    }

    private fileHistoricSerie(): void {
        const config: RouteConfig = {
            description: 'Endpoint para gerar a Serie Histórica',
            method: 'get',
            params: new ValidatorRequest(undefined, undefined),
            path: '/historic-serie',
            resultType: 'application/pdf',
            withJWT: false
        };
        this.addRoute<undefined>(config, this.controller.fileHistoricSerie);
    }

    private fileOrientations(): void {
        const config: RouteConfig = {
            description: 'Endpoint para gerar as orientações do fonoaudiólogo',
            method: 'get',
            params: new ValidatorRequest(undefined, undefined),
            path: '/orientations',
            resultType: 'application/pdf',
            withJWT: false
        };
        this.addRoute<undefined>(config, this.controller.fileOrientations);
    }

    private fileRetest(): void {
        const config: RouteConfig = {
            description: 'Endpoint para gerar o relatório de reteste',
            method: 'get',
            params: new ValidatorRequest(undefined, undefined),
            path: '/retest',
            resultType: 'application/pdf',
            withJWT: false
        };
        this.addRoute<undefined>(config, this.controller.fileRetest);
    }

    private fileTest(): void {
        const config: RouteConfig = {
            description: 'Endpoint para gerar o relatório de teste',
            method: 'get',
            params: new ValidatorRequest(undefined, undefined),
            path: '/test',
            resultType: 'application/pdf',
            withJWT: false
        };
        this.addRoute<undefined>(config, this.controller.fileTest);
    }
}

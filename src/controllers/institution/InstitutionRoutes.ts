import AbstractRoutes from '../../helpers/http/AbstractRoutes';
import { RouteConfig } from '../../helpers/http/AbstractRoutesTypes';
import { InstitutionUser } from '../../entity/institution/InstitutionUser';
import { ValidatorNumber } from '../../helpers/validator/ValidatorNumber';
import { ValidatorObject } from '../../helpers/validator/ValidatorObject';
import { ValidatorRequest } from '../../helpers/validator/ValidatorRequest';
import { ValidatorString } from '../../helpers/validator/ValidatorString';
import InstitutionController from './InstitutionController';

export default class InstitutionRoutes extends AbstractRoutes {
    private institutionController = new InstitutionController();

    constructor() {
        super();

        this.create();
        this.getAll();
        this.getOne();
        this.getDashboard();
        this.getInstitutionTypes();
    }

    private create() {
        const config: RouteConfig = {
            description: 'Endpoint para recuperar todos os serviços de referencia',
            method: 'post',
            params: new ValidatorRequest(new ValidatorObject('body', [
                new ValidatorString('institutionName').required(true).withDescription('Nome da instituição'),
                new ValidatorString('password').required(true).withDescription('Senha'),
                new ValidatorString('cnes').withDescription('CNES'),
                new ValidatorString('cnpj').withDescription('CNPJ'),
                // new ValidatorString('institutionType').withDescription('Tipo de instituição'),
                // new ValidatorString('email').withDescription('Email'),
                // new ValidatorString('alternativeEmail').withDescription('Email alternativo'),
                // new ValidatorString('institutionPhone').withDescription('Telefone'),
                // new ValidatorString('institutionalCellphone').withDescription('Telefone institucional'),
                new ValidatorString('cep').withDescription('CEP'),
                new ValidatorString('publicArea').withDescription('Logradouro'),
                // "state": "sc",
                // "city":  "floripa",
                // "number": "3242",
                // "complement": "complemento",
                // "responsibleName": "nome responsavel",
                // "responsibleRole": "cargo do responsavel"
                //TODO: ajustar parametros
            ]).withDescription('Institution').required(true)),
            path: '/',
            withJWT: false
        };
        this.addRoute<InstitutionUser>(config, this.institutionController.create);
    }

    private getOne() {
        const config: RouteConfig = {
            description: 'Endpoint para recuperar uma instituição',
            method: 'get',
            params: new ValidatorRequest(undefined, undefined, new ValidatorObject('params', [
                new ValidatorNumber('id').min(1).required(true).withExample(1)
            ])),
            path: '/:id',
            withJWT: false
        };
        this.addRoute<{id: number}>(config, this.institutionController.getOne);
    }

    private getAll() {
        console.log(this.institutionController);
        const config: RouteConfig = {
            description: 'Endpoint para recuperar todas as instituições',
            method: 'get',
            params: new ValidatorRequest(),
            path: '/',
            withJWT: false
        };
        this.addRoute<never>(config, this.institutionController.getAll);
    }

    private getDashboard() {
        const config: RouteConfig = {
            description: 'Endpoint para recuperar todos os reports do dashboard de uma instituição',
            method: 'get',
            params: new ValidatorRequest(),
            path: '/dashboard',
            withJWT: true
        };
        this.addRoute<never>(config, this.institutionController.getDashboard);
    }

    private getInstitutionTypes() {
        const config: RouteConfig = {
            description: 'Tipos de instituição',
            method: 'get',
            params: new ValidatorRequest(),
            path: '/types',
            withJWT: false
        };
        this.addRoute<never>(config, this.institutionController.getInstitutionTypes);
    }
}

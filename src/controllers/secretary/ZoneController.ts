import { Request, Response } from 'express';
import { City } from '../../entity/secretaries/City';
import { State } from '../../entity/secretaries/State';
import { SecretaryUser } from '../../entity/secretaries/user/SecretaryUser';
import CryptoHelper from '../../helpers/CryptoHelper';
import AbstractController from '../AbstractController';
import { FindOneOptions } from 'typeorm';
import { HttpStatus } from '../../helpers/HttpStatus';
import SecretaryService from '../../services/SecretaryService';
import { Zone } from '../../entity/secretaries/Zone';

export default class ZoneController extends AbstractController {

    constructor() {
        super();
        const { getAll, getAllWithCities, getById, updateSecretary, createZone, createZoneUser, deleteZone, recoverZone } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.get('/', getAll);
        router.get('/with-cities', verifyJWTMiddleware, getAllWithCities);
        router.get('/:id', getById);
        router.put('/:id', verifyJWTMiddleware, updateSecretary);
        router.post('/', verifyJWTMiddleware, createZone);
        router.post('/user', createZoneUser);
        router.delete('/:id', deleteZone);
        router.get('/recover/:id', recoverZone);
    }

    private getAll = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para recuperar todas as secretarias regionais'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */

        let zones = Zone.createQueryBuilder('z')
            .select(['z.id AS id', 'z.secretary.name AS name'])
        ;
        if(req.query.stateId){
            zones = zones.where('z.state = :state',  { state: req.query.stateId });
        }
        zones = await zones.execute();
        return res.status(HttpStatus.OK).json(zones);
    };

    private getAllWithCities = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para recuperar todas as secretarias regionais'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */

        const values = [
            { id: 1, name: 'Região 1', values: [{ id: 1, name:'cidade 1' }, { id: 2, name:'cidade 2' }] },
            { id: 2, name: 'Região 2', values: [{ id: 3, name:'cidade 3' }, { id: 4, name:'cidade 4' }] },
            { id: 3, name: 'Região 3', values: [{ id: 5, name:'cidade 5' }, { id: 6, name:'cidade 6' }] },
            { id: 4, name: 'Região 4', values: [{ id: 7, name:'cidade 7' }, { id: 8, name:'cidade 8' }] },
            { id: 5, name: 'Região 5', values: [{ id: 9, name:'cidade 9' }, { id: 10, name:'cidade 10' }] },
            { id: 0, name: 'Cidades não vinculadas', values: [{ id: 11, name:'cidade 11' }, { id: 12, name:'cidade 12' }] },
        ];

        const state = await SecretaryUser.createQueryBuilder('u')
            .select(['u.state.id AS id'])
            .where('u.id = :stateUser', { stateUser: req.body.jwtObject.id })
            .getRawOne()
        ;

        const zones = await Zone.createQueryBuilder('z')
            .select(['z.id AS id', 'z.secretary.name AS name'])
            .where('z.state = :state',  { state: state.id })
            .getRawMany()
        ;

        for (const zone of zones) {
            zone.values = await City.createQueryBuilder('c')
                .select(['c.id AS id', 'c.name AS name'])
                .where('c.zone = :zone',  { zone: zone.id })
                .getRawMany()
            ;
        }

        const notLinked = await City.createQueryBuilder('c')
            .select(['c.id AS id', 'c.name AS name'])
            .where('c.state = :state',  { state: state.id })
            .getRawMany()
        ;
        zones.push({ id: 0, name: 'Cidades não vinculadas', values: notLinked });

        return res.status(HttpStatus.OK).json(zones);
    };

    private getById = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para recuperar uma secretaria regional pelo id'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const zone = await Zone.findOne(req.params.id);
        if (!zone) {
            res.status(HttpStatus.NOT_FOUND).json({ error: 'ID não encontrado' });
        }
        return res.status(HttpStatus.OK).json({ zone });
    };

    private updateSecretary = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para atualizar uma secretaria regional pelo id'
           #swagger.parameters['secretary'] = {
               in: 'body',
               description: 'Secretaria',
               required: 'true',
               schema: {$ref: '#/definitions/Secretary'}
           }
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const id = Number(req.params.id);
        const zone = await Zone.findOne(id);
        const [status, response] = await SecretaryService.saveSecretary(zone, req.body);
        return res.status(status).json(response);
    };

    private createZone = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para criar uma região'
           #swagger.parameters['secretary'] = {
               in: 'body',
               required: 'true',
               description: 'Secretaria Regional',
               schema: {$ref: '#/definitions/ZoneCreate'}
           }
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        let zone = req.body as Zone;
        zone.secretary.emails = [...new Set(zone.secretary.emails)];
        const { emails } = zone.secretary;
        if (emails) {
            const result = await SecretaryService.verifyUniqueEmail(emails, 0, Zone);
            if (result.length > 0) {
                return res.status(HttpStatus.CONFLICT).json({
                    message: `Os seguintes emails já estão cadastrados em outras secretarias: ${result}`,
                });
            }
        }
        try {
            zone = await Zone.save(zone);
            return res.status(HttpStatus.OK).json(zone);
        } catch (e: any) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    };

    private createZoneUser = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para criar uma região'
           #swagger.parameters['secretary'] = {
               in: 'body',
               required: 'true',
               description: 'Secretaria Regional',
               schema: {$ref: '#/definitions/ZoneCreate'}
           }
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        let zone = req.body as SecretaryUser;
        try {
            zone.password = CryptoHelper.encrypt(zone.password);
            zone = await SecretaryUser.save(zone);
            return res.status(HttpStatus.OK).json(zone);
        } catch (e: any) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    };

    private deleteZone = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para Deletar uma região'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        try {
            const zone = new Zone();
            zone.id = Number(req.params.id);
            await zone.softRemove();
            return res.status(HttpStatus.OK).json({ disabled: zone.disableDate });
        } catch (e: any) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    };

    private recoverZone = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para Reativar uma região'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        try {
            const zone = await Zone.findOne({
                id: req.params.id,
                withDeleted: true,
            } as FindOneOptions);
            await zone.recover();
            return res.status(HttpStatus.OK).json({ recovered: zone });
        } catch (e: any) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    };
}

import { Request, Response } from 'express';
import { SecretaryUser } from '../../entity/secretaries/user/SecretaryUser';
import AbstractController from '../AbstractController';
import { FindOneOptions } from 'typeorm';
import { HttpStatus } from '../../helpers/HttpStatus';
import SecretaryService from '../../services/SecretaryService';
import { Zone } from '../../entity/secretaries/Zone';

export default class ZoneController extends AbstractController {

    constructor() {
        super();
        const { getAll, getById, updateSecretary, createZone, createZoneUser, deleteZone, recoverZone } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.get('/', getAll);
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
        const zones = await Zone.createQueryBuilder('z')
            .select(['z.id AS id', 'z.secretary.name AS name'])
            .execute()
        ;
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

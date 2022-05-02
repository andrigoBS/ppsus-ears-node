import AbstractController from "../AbstractController";
import {HttpStatus} from "../../helpers/HttpStatus";
import {Request, Response} from "express";
import {Zone} from "../../entity/secretaries/Zone";
import SecretaryService from "../../services/SecretaryService";
import {FindOneOptions} from "typeorm";

export default class ZoneController extends AbstractController {

    constructor() {
        super()
        const {getAll, getById, updateSecretary, createZone, deleteZone, recoverZone} = ZoneController
        const {verifyJWTMiddleware} = this.getJwt()
        const router = this.getRouter()
        router.get("/", getAll)
        router.get("/:id", getById)
        router.put("/:id", verifyJWTMiddleware, updateSecretary)
        router.post("/", verifyJWTMiddleware, createZone)
        router.delete("/:id", deleteZone)
        router.get("/recover/:id", recoverZone)
    }

    private static getAll = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para recuperar todas as secretarias regionais'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const [zones, count] = await Zone.findAndCount()
        return res.status(HttpStatus.OK).json({zones, count})
    }

    private static getById = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para recuperar uma secretaria regional pelo id'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const zone = await Zone.findOne(req.params.id)
        if (!zone) {
            res.status(HttpStatus.NOT_FOUND).json({error: "ID não encontrado"})
        }
        return res.status(HttpStatus.OK).json({zone})
    }

    private static updateSecretary = async (req: Request, res: Response) => {
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
        const id = parseInt(req.params.id)
        const zone = await Zone.findOne(id)
        const [status, response] = await SecretaryService.saveSecretary(zone, req.body)
        return res.status(status).json(response)
    }
    
    private static createZone = async (req: Request, res: Response) => {
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
        let zone = req.body as Zone
        zone.secretary.emails = [...new Set(zone.secretary.emails)]
        const {emails} = zone.secretary
        if (emails) {
            const result = await SecretaryService.verifyUniqueEmail(emails, 0, Zone)
            if (result.length > 0)
                return res.status(HttpStatus.CONFLICT).json({
                    message: `Os seguintes emails já estão cadastrados em outras secretarias: ${result}`
                })
        }
        try {
            zone = await Zone.save(zone);
            return res.status(HttpStatus.OK).json(zone)
        } catch (e: any) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: e.message})
        }
    }

    private static deleteZone = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para Deletar uma região'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        try {
            const zone = new Zone()
            zone.id = parseInt(req.params.id)
            await zone.softRemove()
            return res.status(HttpStatus.OK).json({disabled: zone.disableDate})
        } catch (e: any) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: e.message})
        }
    }

    private static recoverZone = async (req: Request, res: Response) => {
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
            } as FindOneOptions)
            await zone.recover()
            return res.status(HttpStatus.OK).json({recovered: zone})
        } catch (e: any) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: e.message})
        }
    }
}

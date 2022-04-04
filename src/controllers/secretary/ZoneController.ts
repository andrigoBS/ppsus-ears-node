import AbstractController from "../AbstractController";
import {HttpStatus} from "../../helpers/HttpStatus";
import {Request, Response} from "express";
import {Zone} from "../../entity/secretaries/Zone";
import SecretaryService from "../../services/SecretaryService";

export default class ZoneController extends AbstractController {

    constructor() {
        super()
        const {getAll, getById, updateSecretary} = ZoneController
        const {verifyJWTMiddleware} = this.getJwt()
        const router = this.getRouter()
        router.get("/", getAll)
        router.get("/:id", getById)
        router.put("/:id", verifyJWTMiddleware, updateSecretary)
    }

    private static getAll = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['ZoneSecretary']
           #swagger.description = 'Endpoint para recuperar todas as secretarias de estado'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const [zones, count] = await Zone.findAndCount()
        return res.status(HttpStatus.OK).json({zones, count})
    }

    private static getById = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['ZoneSecretary']
           #swagger.description = 'Endpoint para recuperar uma secretaria do estado pelo id'
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
           #swagger.tags = ['ZoneSecretary']
           #swagger.description = 'Endpoint para atualizar uma secretaria do estado pelo id'
           #swagger.parameters['secretary'] = {
               in: 'body',
               required: 'true',
               description: 'Nome da secretaria',
               type: 'string',
               schema: {
                  name: "Secretaria de SC",
                  emails: ["email@email.com", "email@email.com"]
               }
           }
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const {name, emails} = req.body;
        const id = parseInt(req.params.id)
        const zone = await Zone.findOne(id);
        const [status, response] = await SecretaryService.saveSecretary(zone, {name, emails})
        return res.status(status).json(response)
    }
}

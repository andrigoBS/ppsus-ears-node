import { HttpError, HttpStatus } from '../AbstractHttpErrors';
import { Request, Response } from 'express';
import { InstitutionUser } from '../../entity/institution/InstitutionUser';
import UserService from '../users/UserService';
import InstitutionService from './InstitutionService';

export default class InstitutionController {
    private institutionService: InstitutionService;
    private userService: UserService;

    constructor() {
        this.institutionService = new InstitutionService();
        this.userService = new UserService();
    }

    public async create(req: Request, res: Response) {
        try{
            const institutionUserJson = req.body;

            const institution = await this.institutionService.create(institutionUserJson.institution);
            institutionUserJson.institution = institution.id;

            const institutionUser = await this.userService.save<InstitutionUser>('institution', institutionUserJson);
            return res.status(HttpStatus.OK).json(institutionUser);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async getOne(req: Request, res: Response) {
        try {
            const institution = await this.institutionService.findOneById(req.params.id);
            return res.status(HttpStatus.OK).json(institution);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const institutions = await this.institutionService.findAll();
            return res.status(HttpStatus.OK).json(institutions);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async getDashboard(req: Request, res: Response) {
        try {
            const dashboard = await this.institutionService.getDashboard();
            return res.status(HttpStatus.OK).json(dashboard);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async getInstitutionTypes(req: Request, res: Response) {
        try {
            const institutionTypes = await this.institutionService.getInstitutionTypes();
            return res.status(HttpStatus.OK).send(institutionTypes);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }
}

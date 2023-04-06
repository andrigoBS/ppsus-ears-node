import { HttpStatus } from '../../helpers/http/AbstractHttpErrors';
import { Institution } from '../../entity/institution/Institution';
import { InstitutionUser } from '../../entity/institution/InstitutionUser';
import UserService from '../users/UserService';
import InstitutionService from './InstitutionService';

export default class InstitutionController {
    public async create(institutionUser: InstitutionUser) {
        if(!institutionUser.institution.id) {
            const institutionService = new InstitutionService();

            const institution = await institutionService.create(institutionUser.institution);
            institutionUser.institution = { id: institution.id } as Institution;
        }
        const userService = new UserService();

        const result = await userService.save<InstitutionUser>('institution', institutionUser);
        return { httpStatus: HttpStatus.OK, result };
    }

    public async getOne(params: {id: number}) {
        const institutionService = new InstitutionService();

        const result = await institutionService.findOneById(params.id);
        return { httpStatus: HttpStatus.OK, result };
    }

    public async getAll() {
        const institutionService = new InstitutionService();

        const result = await institutionService.findAll();
        return { httpStatus: HttpStatus.OK, result };
    }

    public async getDashboard() {
        const institutionService = new InstitutionService();

        const result = await institutionService.getDashboard();
        return { httpStatus: HttpStatus.OK, result };
    }

    public async getInstitutionTypes() {
        const institutionService = new InstitutionService();

        const result = await institutionService.getInstitutionTypes();
        return { httpStatus: HttpStatus.OK, result };
    }
}

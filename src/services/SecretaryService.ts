import { State } from '../entity/secretaries/State';
import { Zone } from '../entity/secretaries/Zone';
import { HttpStatus } from '../helpers/HttpStatus';
import { SecretaryComponent } from '../entity/decorators/components/Secretary';
import { Equal, Like, Not } from 'typeorm';
import { validateOrReject } from 'class-validator';
import { RestResponse } from '../helpers/ComposedTypes';
import ErrorHelper from '../helpers/ErrorHelper';

export default class SecretaryService {

    public static async saveSecretary(entity: Secretary , secretary: SecretaryComponent): Promise<RestResponse> {
        if (!entity) {
            return [HttpStatus.NOT_FOUND, { message: 'ID não encontrado' }];
        }
        if (secretary.emails) {
            secretary.emails = [...new Set(secretary.emails)];
            const { id, constructor } = entity;
            const matchingEmails = await SecretaryService.verifyUniqueEmail(secretary.emails, id, constructor as SecretaryType);
            if (matchingEmails.length !== 0) {
                return [HttpStatus.CONFLICT, {
                    message: `Os seguintes emails já estão cadastrados em outras secretarias: ${matchingEmails}`,
                }];
            }
        }
        try {
            Object.assign(entity.secretary, secretary);
            await validateOrReject(entity);
            await entity.save();
            return [HttpStatus.OK, { entity }];
        } catch (e: any) {
            return ErrorHelper.validationError(e) ||
                [HttpStatus.INTERNAL_SERVER_ERROR, { message: e.message }];
        }
    }

    public static async verifyUniqueEmail(emails: string[], ignoreId: number, secretary: SecretaryType): Promise<string[]> {
        // @ts-ignore
        const dbEmails = await secretary.find({
            select: ['secretary.emails'],
            where: emails.map((email: string) => ({
                secretary: {
                    emails: Like(`%${email}%`),
                },
                id: Not(Equal(ignoreId)),
            })),
        });
        return dbEmails
            .flatMap((local) => local.secretary.emails)
            .filter((email) => {
                if (!email) { return false; }
                return emails.includes(email);
            }) as string[];
    }

}

type Secretary = State | Zone | undefined;

type SecretaryType = typeof Zone | typeof State;

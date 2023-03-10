import ReportsRepository from './ReportsRepository';

export default class ReportsService {
    private readonly reportsRepository: ReportsRepository;

    constructor() {
        this.reportsRepository = new ReportsRepository();
    }

    public async getBabiesPassFailSecretary(userID: number) {
        // const institutionsIDs: number[] = await this.reportsRepository.getInstitutionsIDsOfSecretary(userID);
        // return this.getBabiesPassFail(institutionsIDs);
    }

    public async getBabiesPassFailTherapist(userID: number) {
        const institutionsIDs: number[] = await this.reportsRepository.getInstitutionsIDsOfTherapist(userID);
        return this.getBabiesPassFail(institutionsIDs);
    }

    public async getBabiesPassFailInstitution(userID: number) {
        const idInstitution = await this.reportsRepository.getInstitutionsIDsOfInstitutionUser(userID);
        const institutionsIDs: number[] = [idInstitution];
        return this.getBabiesPassFail(institutionsIDs);
    }

    private async getBabiesPassFail(institutionsIDs: number[]) {
        const pass = await this.reportsRepository.passBabiesByInstitutions(institutionsIDs);
        const fails = await this.reportsRepository.failBabiesByInstitutions(institutionsIDs);

        return {
            labels: ['Falhou', 'Passou'],
            quantities: [fails, pass],
            title: 'Quantidade de bebes que passaram e falharam.',
        };
    }

    public async getBabiesComeBorn(userType: string, userID: number) {
        const come = 10;
        const born = 5;

        return {
            labels: ['Compareceram', 'Nasceram'],
            quantities: [come, born],
            title: 'Quantos compareceram para o teste e quantos que nasceram (vivos).',
        };
    }

    public async getIndicatorsPercent(userType: string, userID: number) {
        const indicators = [];
        for (let i = 0; i < 20; i++) {
            indicators.push({ label: 'Indicador '+i, quantities: Math.random() * 100 });
        }

        return {
            labels: indicators.map(indicator => indicator.label),
            quantities: indicators.map(indicator => indicator.quantities),
            title: 'Porcentagem para cada indicador.',
        };
    }

    public async getIndicators(userType: string, userID: number) {
        const indicators = [];
        for (let i = 0; i < 40; i++) {
            indicators.push({ label: 'Indicador '+i, quantities: Math.random() * 100 });
        }

        return {
            labels: indicators.map(indicator => indicator.label),
            quantities: indicators.map(indicator => indicator.quantities),
            title: 'Único ou múltiplo (Relacionado a quantidade de indicadores selecionados no momento da consulta).',
        };
    }

    public async getEquipment(userType: string, userID: number) {
        const equipments = [];
        for (let i = 0; i < 40; i++) {
            equipments.push({ label: 'Equipamento '+i, quantities: Math.random() * 100 });
        }

        return {
            labels: equipments.map(equipment => equipment.label),
            quantities: equipments.map(equipment => equipment.quantities),
            title: 'Passou e falhou (Para analisar melhor os resultados comparando com os equipamentos)',
        };
    }
}

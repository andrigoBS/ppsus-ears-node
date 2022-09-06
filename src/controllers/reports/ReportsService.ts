import ReportsRepository from './ReportsRepository';

export default class ReportsService {
    private readonly reportsRepository: ReportsRepository;

    constructor() {
        this.reportsRepository = new ReportsRepository();
    }

    public async getBabiesPassFail() {
        const pass = 10;
        const fails = 5;

        return {
            labels: ['Passou', 'Falhou'],
            quantities: [pass, fails],
            title: 'Quantidade de bebes que passaram e falharam.',
        };
    }

    public async getBabiesComeBorn() {
        const come = 10;
        const born = 5;

        return {
            labels: ['Compareceram', 'Nasceram'],
            quantities: [come, born],
            title: 'Quantos compareceram para o teste e quantos que nasceram (vivos).',
        };
    }

    public async getIndicatorsPercent() {
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

    public async getIndicators() {
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

    public async getEquipment() {
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

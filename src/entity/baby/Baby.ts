import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn, ManyToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";

import {Guardian} from "../guardian/Guardian";
import {JoinTable} from "typeorm/browser";

/**
 * Bebê que será submetido aos exames e, eventualmente,
 * encaminhado à um serviço de referência.
 */
@Entity("bebe")
export class Baby extends BaseEntity {

    @PrimaryGeneratedColumn({name: "id_bebe",
        comment: "Chave primária do bebê"
    })
    id: number;

    @Column({name: "peso", type: "float",
        comment: "Peso do bebê"
    })
    weight: number;

    @Column({name: "altura", type: "float",
        comment: "Altura do bebê"
    })
    height: number;

    @Column({name: "circumferencia", type: "float",
        comment: "Circunferência da cabeça do bebê"
    })
    circumference: number;

    @Column({name: "data_nascimento", type: "datetime", update: false,
        comment: "Data de nascimento do responsável (para cálculo de idade e afins)"
    })
    birthDate: Date;

    @Column({name: "idade_gestacional", type: "int", update: false,
        comment: "Tempo de duração da gestação do bebê marcado em semanas"
    })
    gestationalAge: number;

    @Column({name: "tipo_parto", type: "enum", update: false,
        comment: "Tipo do parto do bebê"
    })
    childBirthType: ChildBirth;

    @Column({name: "obito_materno", type: "boolean", update: false,
        comment: "Chave primária do responsável"
    })
    maternalDeath: boolean

    // Controle

    @CreateDateColumn({name: "data_cadastro", type: "datetime",
        comment: "Data de cadastro do bebê"
    })
    registrationDate: Date;

    @DeleteDateColumn({name: "data_desativado", type: "datetime", nullable: true,
        comment: "Coluna usada para o Soft Delete, caso tenha um valor, o serviço de referencia foi inativado nessa data"
    })
    disableDate: Date;

    // Relacionamentos

    @JoinColumn({name: "fk_mae_bio"})
    @OneToOne(() => Guardian, {
        nullable: false
    })
    birthMother: Guardian;

    @JoinTable ({name: "bebe_responsavel",
        joinColumn: {name: "fk_bebe"}, inverseJoinColumn: {name: "fk_responsavel"}
    })
    @ManyToMany(() => Guardian, guardian => guardian.ward)
    guardians: Guardian;

}

/**
 * Tipos de parto aceitos pelo sistema
 */
export enum ChildBirth {
    CESAREAN = "Parto Cirúrgico (Cesárea)",
    NATURAL = "Parto Vaginal Natural",
    VACUUM = "Parto Vaginal com Extrator a vácuo",
    FORCEPS = "Parto Vaginal com Fórceps",
    WATER = "Parto na água",
}
import {Column, JoinColumn, ManyToOne} from "typeorm";
import {City} from "../../geography/City";


export class AddressComponent {

    @Column({name: "rua", type: "varchar", length: 255,
        comment: "Rua em que se encontra esse endereço"
    })
    street: string;

    @Column({name: "numero", type: "int",
        comment: "Numero do estabelecimento"
    })
    number: number;

    @Column({name: "complemento", type: "varchar", length: 255, nullable: true,
        comment: "Complemento para o endereço"
    })
    adjunct: string;

    @Column({name: "CEP", type: "varchar", length: 8,
        comment: "CEP do endereço"
    })
    cep: string;

    @JoinColumn({name: "fk_municipio"})
    @ManyToOne(() => City, {nullable: false})
    city: City;

}
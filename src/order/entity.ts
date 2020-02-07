import {Column, Entity} from 'typeorm';
import {AbstractEntity} from '../abstract/entity';

@Entity()
export class Order<T> extends AbstractEntity {
    @Column({
        type: 'varchar',
        length: 2048,
        transformer: {
            from: (value: string) => value.split(','),
            to: (value: number[]) => value.join(','),
        },
    })
    order: number[];

    items: { [id: number]: T };
}

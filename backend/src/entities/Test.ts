
// create a test enttity

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    @Field()
    name: string;
}
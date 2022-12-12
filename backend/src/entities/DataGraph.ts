
// Data Graph entity
import {ObjectType, Field} from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    BaseEntity,
    DeleteDateColumn,
    ManyToOne
} from "typeorm";

import { DataFile } from "./DataFile";


@ObjectType()
@Entity()
export class DataGraph extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;
 
    // add a name field
    @Field()
    @Column({unique: true})
    name!: string;

    @Field()
    @Column({ default: '' })
    description!: string;

    // Many-to-one relationship with a DataFile must not be null
    @ManyToOne(() => DataFile, (dataFile) => dataFile.graphs)
    @Field(() => DataFile, { nullable: false })
    dataFile!: DataFile;
    

    @Field()
    @CreateDateColumn()
    createdAt: Date;
  
    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
  
    // Deleted at field
    @Field()
    @DeleteDateColumn()
    deletedAt: Date;
    
}

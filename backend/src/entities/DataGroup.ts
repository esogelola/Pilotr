// create a data group entity that will be used to create a new group that tracks the graphs created by the company, user id, and company id

import {ObjectType, Field} from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    BaseEntity,
    OneToMany,
    DeleteDateColumn,
    ManyToOne
} from "typeorm";

import { Company } from "./Company";
import { DataFile } from "./DataFile";


@ObjectType()
@Entity()
export class DataGroup extends BaseEntity{
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

    @Field()
    @Column({ default: '' })
    localDataPath!: string;

    @Field()
    @Column({ default: 0 })
    totalData!: number;

    // Many-to-one relationship with Company, must not be null
    @ManyToOne(() => Company, (company) => company.dataGroups)
    @Field(() => Company, { nullable: false })
    company!: Company;

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
    
    // One-to-many relationship with DataFile
    @OneToMany(() => DataFile, (dataFile) => dataFile.dataGroup)
    @Field(() => [DataFile])
    files: DataFile[];


}
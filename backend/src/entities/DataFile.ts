import {ObjectType, Field, Root} from "type-graphql";
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
import { DataGraph } from "./DataGraph";

import { DataGroup } from "./DataGroup";
import { User } from "./User";




@ObjectType()
@Entity()
export class DataFile extends BaseEntity{
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
    content!: string;

    @Field()
    @Column({ default: '' })
    localDataPath!: string;

    @Field()
    @Column({ default: 0 })
    size!: number;

    @Field()
    @Column({type:"enum", enum:["CSV", "JSON", "XML", "OTHER"]})
    type!: string;

    // attach a user to the file
    @ManyToOne(() => User, (user) => user.files)
    @Field(() => User, { nullable: false })
    owner!: User;


    // Many-to-one relationship with Company, must not be null
    @ManyToOne(() => DataGroup, (dataGroup) => dataGroup.files)
    @Field(() => DataGroup, { nullable: false })
    dataGroup!: DataGroup;

    // One-to-many relationship with DataGraph
    @OneToMany(() => DataGraph, (dataGraph) => dataGraph.dataFile)
    @Field(() => [DataGraph])
    graphs: DataGraph[];


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

    @Field( () => String )
    async staticFileUrl(@Root() dataFile: DataFile): Promise<string> {
        const dataGroup = await dataFile.dataGroup;
        const company = await dataGroup.company;
    
        // Construct the file path based on the requirements specified in the question
        const companyDirectory = company.name.toLowerCase().replace(/\s/g, '-');
        const dataGroupDirectory = dataGroup.localDataPath.toLowerCase().replace(/\s/g, '-');
        const dataFileName = `${dataFile.name}.${dataFile.type.toLowerCase()}`;


        return `http://localhost:4000/static/${companyDirectory}/${dataGroupDirectory}/${dataFileName}`;
    }
}
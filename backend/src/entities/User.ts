
import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Company } from "./Company";
import { DataFile } from "./DataFile";



// User entity 
@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field()
  @Column({ default: "" })
  firstName: string;

  @Field()
  @Column({ default: "" })
  lastName: string;

  // job title field
  @Field()
  @Column({ default: "" })
  jobTitle: string;

  // attach files to user
  @OneToMany(() => DataFile, (file) => file.owner)
  files: DataFile[];
  

 // role field with enum of roles
  @Field()
  @Column({ type: "enum", enum: ["ADMIN", "USER"], default: "USER" })
  role: string;

 //account status field with enum of account status
  @Field()
  @Column({ type: "enum", enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" })
  status: string;

  //Many to one relationship with company entity
  @Field(() => Company)
  @ManyToOne(() => Company, (company) => company.users)
  userCompany: Company;

  // company id field
  @Field( () => Number , { nullable: true })
  @Column()
  companyId: number;

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
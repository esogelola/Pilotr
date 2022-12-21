import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
  DeleteDateColumn
} from "typeorm";

import { User } from "./User";
import { DataGroup } from './DataGroup';


// Company entity
@ObjectType()
@Entity()
export class Company extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  // Employee count field
  @Field()
  @Column({ default: 0 })
  employeeCount: number;

  // Company address field
  @Field()
  @Column({ default: "" })
  address: string;

  // company country field 
  @Field()
  @Column({ default: "" })
  country: string;




  // one to many relatioinship with user entity
  @Field(() => [User])
  @OneToMany(() => User, (user) => user.userCompany)
  users: User[];



  @Field()
  @Column({ unique: true })
  name!: string;

  @Field(() => [DataGroup])
  @OneToMany(() => DataGroup , (dataGroup) => dataGroup.company)
  dataGroups: DataGroup[];

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







import { Request, Response } from "express";
import { Session } from "express-session";
import { User } from "./entities/User";
import { Field, InputType, ObjectType } from "type-graphql";
import Redis from 'ioredis';
import { Company } from "./entities/Company";
import { DataGroup } from './entities/DataGroup';
import { DataGraph } from './entities/DataGraph';
import { DataFile } from './entities/DataFile';

export type MyContext = {
  req: Request & { session: Session & { userId?: number } } ;
  res: Response;
  redis: Redis
};



export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

export  enum UserStatus {
  DISABLED,
  ACTIVE,
}
export enum  DataFileType {'CSV', 'XML', 'JSON', 'Other'}

export enum GraphType  {'Pie', 'Line', 'Other'};

// User input type for creating a new user account
@InputType()
export class UserInput  {
  
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  password: string;

  @Field()
  jobTitle: string;

  @Field()
  role: UserRole;

};

@InputType()
export class AddUserInput{
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;

  @Field()
  jobTitle: string;

  @Field( {nullable: true})
  role?: UserRole;


}


@ObjectType()
export class UserResponse{
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class DataGroupResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => DataGroup, { nullable: true })
  dataGroup?: DataGroup;
}

@ObjectType()
export class DataFileResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => DataFile, { nullable: true })
  dataFile?: DataFile;
}

@ObjectType()
export class DataGraphResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => DataGraph, { nullable: true })
  dataGraph?: DataGraph;
}

export type UserQuery = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  jobTitle?: string;
  companyId?: number;
  role?: UserRole;
  status?: UserStatus;
};


@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class CompanyResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Company, { nullable: true })
  company?: Company;

  @Field(() => User, { nullable: true })
  user?: User;
}
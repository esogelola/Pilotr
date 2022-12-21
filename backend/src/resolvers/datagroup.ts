import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Company } from "../entities/Company";
import { DataGroup } from "../entities/DataGroup";
import { AppDataSource } from "../data-source";
import { DataGroupResponse } from "../types";

import { createCompanyDir } from "../utils/createCompanyDir";
import path from "path";

// create a data group resolver
@Resolver(DataGroup)
export class DataGroupResolver {
  private dataGroupRepo = AppDataSource.getRepository(DataGroup);
  private companyRepo = AppDataSource.getRepository(Company);

  // Add a middleware to check if the user is a system admin
  // @UseMiddleware(isSystemAdmin)
  @Query(() => [DataGroup])
  async dataGroups(): Promise<DataGroup[]> {
    return this.dataGroupRepo.find();
  }

  @Mutation(() => DataGroupResponse)
  async createDataGroup(
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("companyId") companyId: number
  ): Promise<DataGroupResponse> {
    if (name.length <= 2) {
      return {
        errors: [
          {
            field: "name",
            message: "length must be greater than 2",
          },
        ],
      };
    }

    const company = await this.companyRepo.findOne({
      where: { id: companyId },
      relations : ["dataGroups"]
    });
    if (!company) {
      return {
        errors: [
          {
            field: "company",
            message: "company not found",
          },
        ],
      };
    }

    const companyDir = createCompanyDir(path.join(company.name, name));
    if (!companyDir) {
      return {
        errors: [
          {
            field: "company",
            message: "company directory not created",
          },
        ],
      };
    }
    const dataGroup = new DataGroup();
    dataGroup.name = name;
    dataGroup.description = description;
    dataGroup.localDataPath = path.join(company.name, name);
    dataGroup.totalData = 0;
    dataGroup.files = [];
    dataGroup.company = company;

    await this.dataGroupRepo.save(dataGroup);

    company.dataGroups.push(dataGroup);
    await this.companyRepo.save(company);

    return { dataGroup };
  }

  @Mutation(() => DataGroupResponse)
  async updateDataGroup(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("companyId") companyId: number
  ): Promise<DataGroupResponse> {
    const dataGroup = await this.dataGroupRepo.findOne({ where: { id } });
    if (!dataGroup) {
      return {
        errors: [
          {
            field: "dataGroup",
            message: "dataGroup not found",
          },
        ],
      };
    }
    const company = await this.companyRepo.findOne({
      where: { id: companyId },
    });
    if (!company) {
      return {
        errors: [
          {
            field: "company",
            message: "company not found",
          },
        ],
      };
    }
    dataGroup.name = name;
    dataGroup.description = description;
    dataGroup.company = company;
    await this.dataGroupRepo.save(dataGroup);
    return { dataGroup };
  }

  @Mutation(() => Boolean)
  async deleteDataGroup(@Arg("id") id: number): Promise<boolean> {
    const dataGroup = await this.dataGroupRepo.findOne({ where: { id } });
    if (!dataGroup) {
      return false;
    }
    await this.dataGroupRepo.remove(dataGroup);
    return true;
  }

  @Query(() => DataGroup, { nullable: true })
  dataGroup(@Arg("id") id: number): Promise<DataGroup | undefined | null> {
    return this.dataGroupRepo.findOne({ where: { id } });
  }

  @Query(() => DataGroup, { nullable: true })
  dataGroupByName(
    @Arg("name") name: string
  ): Promise<DataGroup | undefined | null> {
    return this.dataGroupRepo.findOne({ where: { name } });
  }

  // Query to find all  data groups by company id
  @Query(() => [DataGroup], { nullable: true })
  async dataGroupsByCompanyId(
    @Arg("companyId") companyId: number
  ): Promise<DataGroup[] | undefined | null | {}> {
    
    const company = await this.companyRepo.findOne({ where: { id: companyId }, relations : ["dataGroups"] })
    if (!company) {
        return {
          errors: [
            {
              field: "company",
              message: "company not found",
            },
          ],
        };
      }
      console.log(company.dataGroups)
   

    return company.dataGroups;



    
        
  }

        
}

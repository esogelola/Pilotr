import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { AppDataSource } from "../data-source";
import { DataFileResponse, MyContext } from '../types';

import { DataFile } from "../entities/DataFile";
import { DataGroup } from "../entities/DataGroup";
import { createFileInCompanyDir } from '../utils/createCompanyDir';
import { User } from '../entities/User';


@Resolver(DataFile)
export class DataFileResolver {
  private dataFileRepo = AppDataSource.getRepository(DataFile);
  private dataGroupRepo = AppDataSource.getRepository(DataGroup);
  private userRepo = AppDataSource.getRepository(User);
  // Add a middleware to check if the user is a system admin
  // @UseMiddleware(isSystemAdmin)
  @Query(() => [DataFile])
  async dataFiles(): Promise<DataFile[]> {
    return this.dataFileRepo.find();
  }

  @Query(() => DataFileResponse)
  async dataFile(@Arg("id") id: number): Promise<DataFileResponse> {
    const dataFile = await this.dataFileRepo.findOne({ where: { id: id } });
    if (!dataFile) {
      return {
        errors: [
          {
            field: "id",
            message: "Data file not found",
          },
        ],
      };
    }
    return { dataFile };
  }

  @Mutation(() => Boolean)
  async deleteFile(@Arg("id") id: number): Promise<Boolean> {
    const dataFile = await this.dataFileRepo.findOne({ where: { id: id } });
    if (!dataFile) {
      return false;
    }
    // delete file from disk
    // deleteFileFromDisk(dataFile.localDataPath);

    await this.dataFileRepo.remove(dataFile);
    return true;
  }

  // mutation to create a data file and add it to a data group and company
  @Mutation(() => DataFileResponse)
  async createDataFile(
    @Ctx() { req }: MyContext,
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("dataGroupId") dataGroupId: number,
    @Arg("content") content: string
    

  ): Promise<DataFileResponse> {
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



    const dataGroup = await this.dataGroupRepo.findOne({
      where: { id: dataGroupId },
      relations: ["company"],
    });
    if (!dataGroup) {
      return {
        errors: [
          {
            field: "dataGroup",
            message: "data group not found",
          },
        ],
      };
    }

    const file = new DataFile();
    file.name = name;
    file.description = description;
    file.content = content;
    file.dataGroup = dataGroup;


    const userId = req.session.userId;
    if (!userId) {
      return {
        errors: [
          {
            field: "userId",
            message: "user not found",
          },
        ],
      };
    }

    // check if user is a member of the data group
    // const user = dataGroup.users.find((user) => user.id === userId);

    const user = this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      return {
        errors: [
          {
            field: "user",
            message: "user not found",
          },
        ],
      };
    }

    file.size = content.length;
    file.type = name.split(".")[1].toUpperCase(); // uppercase -> file.type = file.type.toUpperCase();


   
 
    

    // write file to  disk
    const companyDir = createFileInCompanyDir(
      dataGroup.company.name,
      dataGroup.name,
      file.name,
    );
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

    await this.dataFileRepo.save(file);
    return { dataFile: file };
  }

  // Query to find all files by data group id

  @Query(() => [DataFile])
  async dataFilesByDataGroupId(
    @Arg("dataGroupId") dataGroupId: number
  ): Promise<DataFile[] | undefined | null | {}> {
    const dataGroup = await this.dataGroupRepo.findOne({
      where: { id: dataGroupId },
      relations: ["files", "company"],

    });
    if (!dataGroup) {
      return {
        errors: [
          {
            field: "dataGroupId",
            message: "Data group not found",
          },
        ],
      };
    }
    return dataGroup.files;
  }
}

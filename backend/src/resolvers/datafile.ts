import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { DataGroup } from "../entities/DataGroup";
import { AppDataSource } from "../data-source";
import { DataFileResponse } from "../types";

import { DataFile } from "../entities/DataFile";
import { User } from "../entities/User";


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
}

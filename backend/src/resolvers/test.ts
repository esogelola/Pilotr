// create a test resolver
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Test } from "../entities/test";
import { AppDataSource } from "../data-source";

@Resolver(Test)
export class TestResolver {
  private testRepo = AppDataSource.getRepository(Test);
 

  @Query(() => [Test])
  async tests(): Promise<Test[]> {
    return this.testRepo.find();
    
  }

  @Mutation(() => Test)
  async createTest(@Arg("name") name: string): Promise<Test> {
    const test = this.testRepo.create({ name });
    return this.testRepo.save(test);
  }
}

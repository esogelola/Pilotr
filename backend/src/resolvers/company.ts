// create a company resolver
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { Company } from "../entities/Company";
import { AppDataSource } from "../data-source";

import { AddUserInput, CompanyResponse, MyContext, UserResponse } from "../types";
import argon2 from "argon2";
import { User } from "../entities/User";
import { createCompanyDir } from "../utils/createCompanyDir";
@Resolver(Company)
export class CompanyResolver {
  private companyRepo = AppDataSource.getRepository(Company);
  private userRepo = AppDataSource.getRepository(User);
  // Add a middleware to check if the user is a system admin
  // @UseMiddleware(isSystemAdmin)
  @Query(() => [Company])
  async companies(): Promise<Company[]> {
    return this.companyRepo.find();
  }

  @Query(() => Company, { nullable: true })
  async company(@Arg("id") id: number): Promise<Company | undefined | null> {
    return this.companyRepo.findOne({where : {id}, relations: ["users"]});
  }

  @Mutation(() => CompanyResponse)
  async createCompany(
    @Arg("name") name: string,
    @Arg("address") address: string,
    @Arg("country") country: string,
    @Arg("employeeCount") employeeCount: number,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<CompanyResponse> {
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

    const hashedPassword = await argon2.hash(password);

    const company = new Company();
    company.name = name;
    company.address = address;
    company.country = country;
    company.employeeCount = employeeCount;
    await this.companyRepo.save(company);

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = hashedPassword;
    user.role = "ADMIN";
    user.status = "ACTIVE";
    user.jobTitle = "CEO";
    user.companyId = 0;
    if (password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than 2",
          },
        ],
      };
    }

    try {
      await this.userRepo.save(user);
    } catch (err) {
      if (err.code === "23505") {
        // duplicate username error
        return {
          errors: [
            {
              field: "email",
              message: "email already taken",
            },
          ],
        };
      }
    }

    // set the company id for the user
    user.companyId = company.id;
    user.userCompany = company;
    await this.userRepo.save(user);

    // set the users for the company
    company.users = [user];
    await this.companyRepo.save(company);

    // create company directory
    const createdCompanyDIR =  await createCompanyDir(company.name);
    if (createdCompanyDIR) {
      console.log("Company directory created");
    } else {
      return {
        errors: [
          {
            field: "company",
            message: "company directory not created",
          },
        ],
      };
    }
    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.userId = user.id;

    return { company, user };
  }

  // update company
  @Mutation(() => CompanyResponse)
  async updateCompany(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Arg("address") address: string,
    @Arg("country") country: string,
    @Arg("employeeCount") employeeCount: number,
    @Ctx() { req }: MyContext
  ): Promise<CompanyResponse> {
    if (!req.session.userId) {
      return {
        errors: [
          {
            field: "user",
            message: "not authenticated",
          },
        ],
      };
    }

    const company = await this.companyRepo.findOne({ where: { id } });
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

    if (typeof name !== "undefined") {
      company.name = name;
    }
    if (typeof address !== "undefined") {
      company.address = address;
    }
    if (typeof country !== "undefined") {
      company.country = country;
    }
    if (typeof employeeCount !== "undefined") {
      company.employeeCount = employeeCount;
    }

    await this.companyRepo.save(company);

    return { company };
  }

  @Mutation(() => Boolean)
  async deleteCompany(
    @Arg("id") id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    if (!req.session.userId) {
      return false;
    }

    const company = await this.companyRepo.findOne({ where: { id } });
    if (!company) {
      return false;
    }

    await this.companyRepo.remove(company);

    return true;
  }


  @Mutation(() => UserResponse)
  async addUser(
    @Arg("companyId") companyId: number,
    @Arg("options") options: AddUserInput,
  ): Promise<UserResponse> {

    // find the company by id
    const company = await this.companyRepo.findOne({ where: { id: companyId } });
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

    // change the default password to a random string
    // send the user an email with the password
    // the user can change the password after login
    const hashedPassword = await argon2.hash("test123");
    const user = new User();
    user.firstName = options.firstName;
    user.lastName = options.lastName;
    user.email = options.email;
    user.password = hashedPassword;
    user.jobTitle = options.jobTitle;

    // four things we set ourselves
    user.companyId = companyId;
    user.userCompany = company;
    user.role =  options.role ? options.role : "USER";
    user.status =  "ACTIVE";


    try {
      await this.userRepo.save(user);
    } catch (err) {
      if (err.code === "23505") {
        // duplicate username error
        return {
          errors: [
            {
              field: "email",
              message: "email already taken",
            },
          ],
        };
      }
    }

    // store user id session
    // this will set a cookie on the user
    // keep them logged in


    return { user };
  }

}

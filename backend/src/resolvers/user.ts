// create a user resolver

import { Resolver, Query, Arg, Int, Mutation, Ctx, UseMiddleware } from 'type-graphql';
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";

import { UserResponse, MyContext, UserInput } from '../types';
import argon2 from 'argon2';
import { COOKIE_NAME } from '../constants';
import { isAuth } from '../middleware/isAuth';


@Resolver(User)
export class UserResolver {
  private userRepo = AppDataSource.getRepository(User);



  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userRepo.find({ relations: ["userCompany"]});
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => Int) id: number): Promise<User | undefined | null> {
    
    return await this.userRepo.findOne({where: {id}});
   
  }

  


  @Mutation(() => UserResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "that email doesn't exist",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }


  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }

  
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }
    const userId = req.session.userId;

    const user = await this.userRepo.findOne(
      {
        where: { id: userId },
      },
      
    );
    return user;
  }

  
  @Mutation(() => UserResponse)
  @UseMiddleware(isAuth)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("options") options: UserInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (options.password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than 2",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      return {
        errors: [
          {
            field: "id",
            message: "user not found",
          },
        ],
      };
    }

    if (user.id !== req.session.userId) {
      return {
        errors: [
          {
            field: "id",
            message: "not authorized",
          },
        ],
      };
    }

    Object.assign(user, options);
    user.password = hashedPassword;

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

    return { user };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUser(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      return false;
    }

    if (user.id !== req.session.userId) {
      return false;
    }

    await this.userRepo.delete(id);
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async changePassword(
    @Arg("id", () => Int) id: number,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      return false;
    }

    if (user.id !== req.session.userId) {
      return false;
    }

    const hashedPassword = await argon2.hash(password);
    user.password = hashedPassword;
    await this.userRepo.save(user);

    return true;
  }

}
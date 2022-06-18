import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { User } from "@prisma/client";

export class CreateUserUseCase {
  async execute({ name, email }: CreateUserDTO): Promise<User> {
    const userAlreadyExits = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExits) {
      // error
      throw new AppError("User already exists!");
    }

    //create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return user;
  }
}

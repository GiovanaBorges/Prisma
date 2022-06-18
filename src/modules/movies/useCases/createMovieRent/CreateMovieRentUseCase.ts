import { MovieRent } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateMovieRentDTO } from "../../dtos/CreateMovieRentDTO";
import { CreateMovieUseCase } from "../createMovie/CreateMovieUseCase";
import { CreateMovieRentController } from "./CreateMovieRentController";

export class CreateMovieRentUseCase {
  async execute({ movieId, userId }: CreateMovieRentDTO): Promise<void> {
    //verificar se o filme existe
    const movieExists = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movieExists) {
      throw new AppError("movie does not exists! ");
    }

    // verificar se o filme nao esta alugado por outra pessoa

    const movieAlreadyRented = await prisma.movieRent.findFirst({
      where: {
        movieId,
      },
    });

    // verificar se o usuario existe

    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new AppError("User does not exists!");
    }

    // criar a locacao

    await prisma.movieRent.create({
      data: {
        movieId,
        userId,
      },
    });
  }
}

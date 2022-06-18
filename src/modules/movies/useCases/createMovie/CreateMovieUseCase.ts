import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateMovieDTO } from "../../dtos/CreateMovieDTO";

export class CreateMovieUseCase {
  async execute({
    title,
    release_date,
    duration,
  }: CreateMovieDTO): Promise<Movie> {
    const movieAlreadyExits = await prisma.movie.findUnique({
      where: {
        title,
      },
    });

    if (movieAlreadyExits) {
      // error
      throw new AppError("movie already exists!");
    }

    //create user
    const movie = await prisma.movie.create({
      data: {
        title,
        duration,
        release_date,
      },
    });

    return movie;
  }
}

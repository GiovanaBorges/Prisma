import { Movie } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../../../prisma/client";
import { GetMoviesByReleaseDateUseCase } from "./GetMoviesByReleaseDateUseCase";

export class GetMoviesByReleaseDateController {
  async handle(req: Request, res: Response) {
    const getMoviesByReleaseDateUseCase = new GetMoviesByReleaseDateUseCase();

    const result = await getMoviesByReleaseDateUseCase.execute();

    return res.status(201).json(result);
  }
}

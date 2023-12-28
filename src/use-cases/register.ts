import { hash } from "bcryptjs";
import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/users-repository";
import { UseAlreadyExistsError } from "./errors/use-already-exists-error";

interface RegisterUseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UseAlreadyExistsError();
    }

    //const prismaUsersRepository = new PrismaUsersRepository();

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
    return { user };
  }
}

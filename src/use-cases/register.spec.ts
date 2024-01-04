import { UsersRepository } from "./../repositories/users-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { UseAlreadyExistsError } from "./errors/use-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoee@xample.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("should  hash user password upon registration ", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoee@xample.com",
      password: "123456",
    });
    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
  it("shold not be to register with same email twice ", async () => {
    const email = "johndoee@xample.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });
    await expect(
      async () =>
        await sut.execute({
          name: "John Doe",
          email,
          password: "123456",
        })
    ).rejects.toBeInstanceOf(UseAlreadyExistsError);
  });
});

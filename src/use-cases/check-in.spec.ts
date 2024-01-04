import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-checkins-repository";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    vi.setSystemTime(new Date(2021, 0, 1, 12, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2021, 0, 1, 12, 0, 0));
    await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-id",
        userId: "user-id",
      })
    ).rejects.toBeInstanceOf(Error);
  });
  it("should not be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2021, 0, 1, 12, 0, 0));
    await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
    });

    vi.setSystemTime(new Date(2021, 0, 2, 12, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });
});

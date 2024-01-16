import { CheckIn } from "@prisma/client";
import { expect, describe, it, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";
import dayjs from "dayjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("validate check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);
  });

  vi.useFakeTimers();
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate the check in", async () => {
    console.log(checkInsRepository);
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-id",
      user_id: "user-id",
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.valiidated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].valiidated_at).toEqual(expect.any(Date));
  });
  it("should not be able to validate inexistent checkin", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "inexistent-checkin-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to validate the checkin after 20 minutes of its creation", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 0, 1, 13, 0, 0));

    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-id",
      user_id: "user-id",
    });

    const twentyMinutesInMs = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyMinutesInMs);

    await expect(async () => {
      await sut.execute({
        checkInId: createdCheckIn.id,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});

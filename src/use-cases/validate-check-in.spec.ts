import { CheckIn } from "@prisma/client";
import { expect, describe, it, beforeEach, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-checkins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("validate check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);
  });

  // vi.useFakeTimers();
  afterEach(() => {
    // vi.useRealTimers();
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
    const { checkIn } = await sut.execute({
      checkInId: "inexistent-checkin-id",
    });

    expect(checkIn.valiidated_at).toEqual(expect.any(Date));
  });
});

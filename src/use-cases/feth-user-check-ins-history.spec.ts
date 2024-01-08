import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-checkins-repository";
import { FethUserCheckInsHistoryUseCase } from "./feth-user-check-ins-history";
import { a } from "vitest/dist/suite-dF4WyktM";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FethUserCheckInsHistoryUseCase;

describe("fetch User check-in History", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FethUserCheckInsHistoryUseCase(checkInsRepository);
  });

  it("should be able to fetch check-in history", async () => {
    await checkInsRepository.create({
      user_id: "user-id",
      gym_id: "gym-id",
    });

    await checkInsRepository.create({
      user_id: "user-id",
      gym_id: "gym-02",
    });

    const { checkIns } = await sut.execute({
      userId: "user-id",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-id" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });
  it("should be able to fetch paginated              check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: "user-id",
        gym_id: `gym-${i}`,
      });
    }

    const { checkIns } = await sut.execute({
      userId: "user-id",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});

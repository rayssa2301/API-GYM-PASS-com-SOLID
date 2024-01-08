import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-checkins-repository";
import { FethUserCheckInsHistoryUseCase } from "./feth-user-check-ins-history";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("fetch User check-in History", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({
      user_id: "user-id",
      gym_id: "gym-id",
    });

    await checkInsRepository.create({
      user_id: "user-id",
      gym_id: "gym-02",
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-id",
    });

    expect(checkInsCount).toEqual(2);
  });
});

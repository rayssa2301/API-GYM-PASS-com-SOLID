import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      id: "Near gym",
      name: "Near gym",
      phone: "",
      description: "gym-description",
      latitude: -5.080556,
      longitude: -42.7692032,
    });

    await gymsRepository.create({
      id: "Far gym",
      name: "Far gym",
      phone: "",
      description: "gym-description",
      latitude: -5.180656,
      longitude: -42.8792032,
    });

    const { gyms } = await sut.execute({
      userLatitude: -5.0700239,
      userLongitude: -42.7414095,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ id: "Near gym" })]);
  });
});

import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("fetch User check-in History", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      id: "gym-01",
      title: "gym-01",
      phone: "",
      description: "gym-description",
      latitude: -5.0700239,
      longitude: -42.7462617,
    });

    await gymsRepository.create({
      id: "gym-02",
      title: "gym-02",
      phone: "",
      description: "gym-description",
      latitude: -5.0700239,
      longitude: -42.7462617,
    });

    const { gyms } = await sut.execute({
      query: "gym-01",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ id: "gym-01" })]);
  });

  it("should be able to fetch paginated gyms history search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `gym-${i}`,
        title: `gym-${i}`,
        phone: "",
        description: "gym-description",
        latitude: -5.0700239,
        longitude: -42.7462617,
      });
    }

    const { gyms } = await sut.execute({
      query: "gym",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "gym-21" }),
      expect.objectContaining({ title: "gym-22" }),
    ]);
  });
});

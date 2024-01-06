import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-checkins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: "gym-id",
      name: "gym-name",
      phone: "",
      description: "gym-description",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });

    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2021, 0, 1, 12, 0, 0));
    await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-id",
        userId: "user-id",
        userLatitude: 0,
        userLongitude: 0,
      })
    ).rejects.toBeInstanceOf(Error);
  });
  it("should not be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2021, 0, 1, 12, 0, 0));
    await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date(2021, 0, 2, 12, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: 0,
      userLongitude: 0,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });
  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-01",
      name: "gym-name",
      phone: "",
      description: "gym-description",
      latitude: new Decimal(-5.0700239),
      longitude: new Decimal(-42.7462617),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-id",
        userLatitude: -5.0713516,
        userLongitude: -42.7414095,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});

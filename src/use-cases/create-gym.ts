import { GymsRepository } from "./../repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface CreateGymUseRequest {
  title: string;
  name: string;
  description: string;
  phone: string;
  latitude: number;
  longitude: number;
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    description,
    name,
    phone,
    latitude,
    longitude,
  }: CreateGymUseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      description,
      name,
      phone,
      latitude,
      longitude,
    });
    return { gym };
  }
}

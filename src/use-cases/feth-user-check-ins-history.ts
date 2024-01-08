import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../repositories/check-ins-repository";

interface FethUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface FethUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FethUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FethUserCheckInsHistoryUseCaseRequest): Promise<FethUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );

    return {
      checkIns,
    };
  }
}

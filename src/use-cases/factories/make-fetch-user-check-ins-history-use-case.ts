import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository";
import { FethUserCheckInsHistoryUseCase } from "../feth-user-check-ins-history";

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FethUserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}

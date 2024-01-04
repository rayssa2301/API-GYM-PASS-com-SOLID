import { randomUUID } from "node:crypto";
import { CheckInsRepository } from "../check-ins-repository";
import { CheckIn, Prisma } from "@prisma/client";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkInOnSameDate = this.items.find((checkIn) => checkIn.user_id);
    if (!checkInOnSameDate) {
      return null;
    }
    return checkInOnSameDate;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      valiidated_at: data.valiidated_at ? new Date(data.valiidated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);
    return checkIn;
  }
}

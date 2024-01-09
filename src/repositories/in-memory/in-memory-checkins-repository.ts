import { randomUUID } from "node:crypto";
import { CheckInsRepository } from "../check-ins-repository";
import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id);

    if (!checkIn) {
      return null;
    }
    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }
  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20);
  }
  async countByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId).length;
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

  async save(checkIn: CheckIn) {
    const checkInIdex = this.items.findIndex((item) => item.id === checkIn.id);

    if (checkInIdex > 0) {
      this.items[checkInIdex] = checkIn;
    }
    return checkIn;
  }
}

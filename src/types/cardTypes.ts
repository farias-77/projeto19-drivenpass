import { cards } from "@prisma/client";

export type TCard = Omit<cards, 'id' | 'userId'>
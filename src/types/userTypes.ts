import { users } from "@prisma/client";

export type TUser = Omit<users, 'id'>
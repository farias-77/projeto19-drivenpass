import { credentials } from "@prisma/client";

export type TCredential = Omit<credentials, 'id'| 'userId'>
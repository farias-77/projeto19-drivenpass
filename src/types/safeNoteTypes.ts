import { safeNotes } from "@prisma/client";

export type TsafeNote = Omit<safeNotes, 'id' | 'userId'>
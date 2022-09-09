import { wifiNetworks } from "@prisma/client";

export type TWifi = Omit<wifiNetworks, 'id' | 'userId'>
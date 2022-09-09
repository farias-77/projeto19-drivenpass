import prisma from "../database/databaseConnection";
import { wifiNetworks } from "@prisma/client";
import { TWifi } from "../types/wifiTypes";

export async function findWifiById(wifiId: number){
    const wifi: wifiNetworks[] = await prisma.wifiNetworks.findMany({
        where:{
            id: wifiId
        }
    });

    return wifi[0] || null;
}

export async function findWifisByUserId(userId: number){
    const wifi: wifiNetworks[] = await prisma.wifiNetworks.findMany({
        where:{
            userId
        }
    });

    return wifi;
}

export async function insertWifi(wifiNetwork: TWifi, userId: number){
    return await prisma.wifiNetworks.create({
        data:{
            ...wifiNetwork,
            userId
        }
    });
}

export async function deleteWifiById(wifiId: number){
    return await prisma.wifiNetworks.delete({
        where:{
            id: wifiId
        }
    });
}
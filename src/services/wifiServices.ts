import * as wifiRepositories from "../repositories/wifiRepository";
import { wifiNetworks } from "@prisma/client";
import { TWifi } from "../types/wifiTypes";
import Cryptr from "cryptr";

export async function insertWifi(wifiNetwork: TWifi, userId: number){
    const encryptedPassword: string = encryptsPassword(wifiNetwork.password);

    return await wifiRepositories.insertWifi({...wifiNetwork, password: encryptedPassword}, userId);
}

export async function getAllWifisByUserId(userId: number){
    const wifis: wifiNetworks[] = await wifiRepositories.findWifisByUserId(userId);
    const decryptedPasswordWifis = wifis.map(wifi => {
        return {...wifi, password: decryptsPassword(wifi.password)};
    });

    return decryptedPasswordWifis;
}

function encryptsPassword(password: string){
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    return cryptr.encrypt(password);
}

function decryptsPassword(password: string){
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    return cryptr.decrypt(password);
}
import prisma from "../database/databaseConnection";
import { TUser } from "../types/userTypes";

export async function findByEmail(email: string){
    return await prisma.users.findMany({
        where: {
            email
        }
    });
}

export async function insertUser(user: TUser) {
    return await prisma.users.create({
        data: user
    })
}
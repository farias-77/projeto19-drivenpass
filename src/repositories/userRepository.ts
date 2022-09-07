import prisma from "../database/databaseConnection";
import { TUser } from "../types/userTypes";

export async function findByEmail(email: string){
    const user = await prisma.users.findMany({
        where: {
            email
        }
    });

    return user[0];
}

export async function insertUser(user: TUser) {
    return await prisma.users.create({
        data: user
    })
}
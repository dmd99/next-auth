import { getVerificationTokenByEmail } from '@/data/token'
import { v4 as uuidv4 } from 'uuid'
import prisma from '@/lib/db';


export const generateVerificationToken = async(email: string) => {

    const expireAt = new Date(new Date().getTime() + 3600 + 1000 )
    const token = uuidv4()
    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await prisma.verificationToken.delete({
            where: {id: existingToken.id}
        })
    }

    const verificationToken = await prisma.verificationToken.create({
        data:{
            email,
            token,
            expireAt
        }
    })
    
    return verificationToken
}
import { io } from "../app";
import { prisma } from "../utils/prisma";

class ProfileUserService {
  async execute(user_id: string){
    const user = await prisma.user.findFirst({
      where: {
        id: user_id
      }
    })

    return user
  }
}

export {ProfileUserService}
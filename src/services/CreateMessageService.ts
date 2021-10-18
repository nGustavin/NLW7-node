import { io } from "../app";
import { prisma } from "../utils/prisma";

class CreateMessageService {
  async execute(text: string, user_id: string){
    const message = await prisma.message.create({
      include: {
        user: true
      },
      data: {
        text,
        user_id
      }
    })


    const infoWS = {
      text: message.text,
      user_id: message.user_id,
      created_at: message.created_at,
      
      user:{
        name: message.user.name,
        avatar_url: message.user.avatar_url
      }
    }

    io.emit('new_message', infoWS)

    return message
  }
}

export {CreateMessageService}
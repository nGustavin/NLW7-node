import {Request, Response} from 'express'
import { AuthenticateUserService } from '../services/AuthenticateUserService'

class AuthenticateUserController {
    async handle(req: Request, res: Response){
        // const { code } = req.query
        const service = new AuthenticateUserService()

        // service.execute(code)
    }
}

export {AuthenticateUserController}
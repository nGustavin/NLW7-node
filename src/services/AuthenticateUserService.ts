/**
* Receber code
* Recuperar o acess_token no github
* Recuperar info do usuario do github
* Verificar se o usuario existe no DB
* --- true = Gera um token
* --- false = Cria no DB, gera um token
* 
* Return: Token and user info.
*/
import 'dotenv/config'
import axios from 'axios'
import { prisma } from '../utils/prisma'
import {sign} from 'jsonwebtoken'

interface IAcessTokenResponse {
    access_token: string
}

interface IUserResponse {
    avatar_url: string;
    login: string,
    id: number;
    name: string;
}

class AuthenticateUserService {
    async execute(code: string){
        const url = 'https://github.com/login/oauth/access_token'

        const { data: acessTokenResponse } = await axios.post<IAcessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            headers: {
                "Accept": "application/json"
            }
        })

        try{
            const response = await axios.get<IUserResponse>(`https://api.github.com/user`, {
                headers: {
                    authorization: `Bearer ${acessTokenResponse.access_token}`
                }
            })

            const { avatar_url, id, login, name } = response.data

            let user = await prisma.user.findFirst({
                where: {
                    github_id: id
                }
            })

            if(!user){
                user = await prisma.user.create({
                    data: {
                        avatar_url,
                        login,
                        name,
                        github_id: id
                    }
                })
            }

            const token = sign(
                {
                    user: {
                        name: user.name,
                        avatar_url: user.avatar_url,
                        id: user.id
                    }
                },
                process.env.JWT_SECRET,
                {
                    subject: user.id,
                    expiresIn: '1d'
                }
            )

            return { token, user }
        }catch(err){
            console.log(err.message, err.stack)
        }
    }
}

export { AuthenticateUserService }
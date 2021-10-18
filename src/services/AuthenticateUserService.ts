/**
 * Receber code
 * Recuperar o acess_token no github
 * Verificar se o usuario existe no DB
 * --- true = Gera um token
 * --- false = Cria no DB, gera um token
 * 
 * Return: Token and user info.
 */

class AuthenticateUserService {
    async execute(code: string, ){

    }
}

export { AuthenticateUserService }
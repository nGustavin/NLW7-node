import 'dotenv/config'
import express from 'express'

const app = express()

app.get('/github', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get('/signin/callback', (req, res) => {
    const { code } = req.query
    
    
})

app.listen(4000, () => console.log('🚀 Server is running on port 4000'))
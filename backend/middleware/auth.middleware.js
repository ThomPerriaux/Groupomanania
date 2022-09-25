const jwt = require('jsonwebtoken')

//gestion du token
module.exports = (req, res, next) => {
     try {
          const token = req.headers.authorization.split(' ')[1] //la partie du token récupérée est celle après l'espace
          const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET') //on verifie le token et la clé de cryptage
          const userId = decodedToken.userId //emet un userID et renseigne aussi sur l'expiration
          req.auth = {
               userId: userId,
          }
          next()
     } catch (error) {
          res.status(401).json({ error })
     }
}
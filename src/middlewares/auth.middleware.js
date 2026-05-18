const jwt = require('jsonwebtoken');

function verificarToken (req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ erro: 'Acesso negado. Token não fornecido' });
    }
}

const token = authHeader.split(' ')[1];

if (!token) {
    return res.status(401).json({ erro: 'Acesso negado. TOken mal formatado' });
}

try {
    const dadosDecodificados = jwt.verify(token, process.env.JWT_SECRET);

    req.usuarioLogado = dadosDecodificados;

    next();

} catch (erro) {
    return res.status(403).json({ erro: 'Token inválido ou expirado' });
}



module.exports = verificarToken;
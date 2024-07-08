import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '1h', // Puedes ajustar el tiempo de expiración según tus necesidades
    });
};

export default generateToken;

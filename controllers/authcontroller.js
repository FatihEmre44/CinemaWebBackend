const usermodel=require("../models/User");
var JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
require('dotenv').config();

const registercheck=async(req,res)=>{
    try{
        const { username, email, password,role } = req.body;
        if(!email || !username || !password){
            return res.status(400).send({
                success: false,
                message: 'Kayit basarisiz - Tüm alanları doldurun'
            })
        }
        //email control
        const kontrol = await usermodel.findOne({ email });
        if(kontrol){
            return res.status(400).send({
                success: false,
                message: 'Kayit basarisiz - Aynı email ile kayıt yapılmış'
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const haspas = bcrypt.hashSync(password, salt); 
        //new user 
        const newuser = await usermodel.create({
            username,
            email,
            password:haspas,
            role,
        })
        res.status(201).send({
            success: true,
            message: 'KAYIT TAMAMLANDI'
        })
    }
    catch (error) {
        console.log('Register Error:', error);
        return res.status(500).send({
            success: false,
            message: 'Kayıt sırasında hata oluştu'
        });
}}
const logincheck=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Email ve şifre gerekli'
            });
        }
        const user = await usermodel.findOne({ email });
        if(!user){
            return res.status(400).send({
                success: false,
                message: 'Böyle bir kullanıcı yok'
            });
        }
        const controlpassword=await bcrypt.compare(password, user.password);
       if (!controlpassword) {
            return res.status(401).send({
                success: false,
                message: 'Şifre yanlış'
            });
        }
        const token = JWT.sign(
        { id: user._id }, 
        process.env.JWT_SECRET, 
       { expiresIn: '7d' }
      );
      const userResponse = {...user.toObject()};
      delete userResponse.password;

      res.status(200).send({
        success: true,
        message: 'Giriş yapıldı',
        token,
        userResponse,
})
    }
    catch (error) {
        console.log('Login Error:', error);
        return res.status(500).send({
            success: false,
            message: 'Giriş sırasında hata oluştu'
        })
    }
}
module.exports = { registercheck, logincheck };

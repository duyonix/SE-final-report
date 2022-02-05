/* const { Router } = require('express')*/
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const argon2 = require('argon2');
const mongoose = require('mongoose')
const firebase = require('../firebase')

const generateToken = (payload) => {
    const { id, username } = payload;
    const accessToken = jwt.sign({ id, username },
        process.env.ACCESS_TOKEN_SECRET
    );
    return accessToken
};

const checkEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true
    }
    return false
}

const checkPhoneNumber = (phoneNumber) => {
    if (/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phoneNumber)) {
        return true
    }
    return false
}

const getSignedUrlNotAvatar = async(fullName) => {
    const splited = fullName.split(' ')
    const character = splited[splited.length - 1][0].toUpperCase()
    const destinationFirebase = `avatar/not avatar/${character}.jpg`
    const config = {
        action: 'read',
        expires: '03-17-2025'
    };
    const url = await firebase.bucket.file(destinationFirebase).getSignedUrl(config);
    return url
}

class AuthorizeController {
    signup = async(req, res) => {
        const username = req.body.username;
        var password = req.body.password;
        const email = req.body.email;
        const phoneNumber = req.body.phoneNumber;
        const fullName = req.body.fullName;
        try {
            if (!checkEmail(email)) throw new Error("not a email")
            if (!checkPhoneNumber(phoneNumber)) throw new Error("not a phone number")

            const user = await User.findOne({ username });
            if (user) {
                throw new Error("Username already taken")
            }

            password = await argon2.hash(password);
            const avatarUrls = await getSignedUrlNotAvatar(fullName)
            const avatarUrl = avatarUrls[0]
            const ifHasAvatar = false
            const newUser = new User({
                username,
                password,
                fullName,
                email,
                phoneNumber,
                avatarUrl,
                ifHasAvatar
            });
            await newUser.save();
            res.status(200).json({ success: true, message: 'Người dùng đã được tạo' });
        } catch (err) {
            if (err.message == "Username already taken") {
                res
                    .status(400)
                    .json({ success: false, message: 'Tên tài khoản đã tồn tại' });
            } else if (err.message == 'not a email') {
                res
                    .status(400)
                    .json({ success: false, message: 'Email sai định dạng mất rồi' });
            } else if (err.message == 'not a phone number') {
                res
                    .status(400)
                    .json({ success: false, message: 'Số điện thoại sai định dạng mất rồi' });
            } else {
                console.log(err)
                res.status(400).json({ success: false, message: 'Lỗi rồi :(' });
            }

        }
    };

    login = async(req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        User.findOne({ username: username },
            'username password',
            async function(err, user) {
                try {
                    if (err) {
                        throw new Error("ERROR")
                    }
                    if (!user) {
                        throw new Error("User doesnt exist")
                    }
                    const passwordValid = await argon2.verify(
                        user.password,
                        password
                    );
                    if (!passwordValid) {
                        throw new Error("Wrong password")
                    }
                    const token = generateToken(user);
                    user.password = undefined
                    user.username = undefined
                    return res.status(200).json({ success: true, token, user });
                } catch (err) {
                    if (err.message == "Wrong password")
                        return res.status(400).json({ success: false, message: 'Sai mật khẩu' })
                    else if (err.message == "User doesnt exist")
                        return res.status(400).json({ success: false, message: 'Người dùng này không tồn tại' })
                    else return res.status(400).json({ success: false, message: 'Lỗi rồi :(' })
                }
            }
        );

    };
}

module.exports = new AuthorizeController();
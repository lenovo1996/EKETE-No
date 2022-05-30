const moment = require(`moment-timezone`);
const TIMEZONE = process.env.TIMEZONE;
const client = require(`../config/mongodb`);
const SDB = process.env.DATABASE; // System Database
const jwt = require(`../libs/jwt`);

const crypto = require('crypto');
const bcrypt = require(`../libs/bcrypt`);
const mail = require(`../libs/nodemailer`);
const { otpMail } = require('../templates/otpMail');
const { verifyMail } = require('../templates/verifyMail');
const { sendSMS } = require('../libs/sendSMS');
const { stringHandle } = require('../utils/string-handle');

const UserAdminService = require(`../services/admin`)
const { runInNewContext } = require('vm')

let removeUnicode = (text, removeSpace) => {
    /*
        string là chuỗi cần remove unicode
        trả về chuỗi ko dấu tiếng việt ko khoảng trắng
    */
    if (typeof text != 'string') {
        return '';
    }
    if (removeSpace && typeof removeSpace != 'boolean') {
        throw new Error('Type of removeSpace input must be boolean!');
    }
    text = text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
    if (removeSpace) {
        text = text.replace(/\s/g, '');
    }
    return text;
};

module.exports._checkVerifyLink = async (req, res, next) => {
    try {
        ['UID'].map((e) => {
            if (!req.body[e]) {
                throw new Error(`400: Thiếu thuộc tính ${e}!`);
            }
        });
        let link = await client.db(SDB).collection(`VerifyLinks`).findOne({
            UID: req.body.UID,
        });
        if (!link) {
            throw new Error('400: UID không tồn tại!');
        }
        res.send({ success: true, data: link });
    } catch (err) {
        next(err);
    }
};


module.exports._rigister = async (req, res, next) => {
    try {
        ['phone', 'passwoed'].map((e) => {
            if(!req.body[e]){
                throw new Error(`400: Thieu thuoc tinh ${e}!`)
            }
        });

    req.body.prefix = stringHandle(req.body.phone, {
        removeUnicode: true,
        removeSpace: true,
        lowerCase: true,
    });

    req.body.phone = string (req.body.phone).trim().toLowerCase();
    req.body.password = bcrypt.hash(req.body.password);
    let userAdminEKT = await client.db(SDB).collection('UserAdminEKT').findOne({ prefix: req.body.prefix});

    let userAdmin = await client
        .db(SDB)
        .collection('UserAdminEKT')
        .findOne({
            $or: [{ phone: req.body.phone }],
        });
    if (userAdmin){
        throw new Error('So dien thoai da duoc su dung')
    }

    let otpCode = String(Math.random()).substr(2, 6);
    let verifyId = crypto.randomBytes(10).toString(`hex`)
    let verifyLink = `https://${req.body.prefix}.${process.env.DOMAN}/verify-account?uid=${verifyId}`;
    let _verifyLink = {
        phone: req.body.phone,
        UID: String(verifyId),
        verify_link: verifyLink,
        verify_timelife: moment().tz(TIMEZONE).add(5, `minutes`).format()

    };

    let verifiMessage = `[VIESOFTWARE] Ma OTP cua quy khach la ${otpCode}`;
    sendSMS([req.body.phone], verifyMessage, 2, 'VIESOFTWARE');

    let [userAdmin_id] = await Promise.all([
        client
            .db(SDB)
            .collection('AppSetting')
            .findOne({name: 'UserAdmin' })
            .then((doc) => {
                if(doc) {
                    if (doc.value) {
                        return Number(doc.value)
                    }
                }
                return 0;
            })
    ])
    userAdmin_id++;

    let _userAdmin = {
        userAdmin_id: userAdmin_id,
        code: String(userAdmin_id).padStart(6, '0'),
        prefix: req.body.prefix,
        phone: req.body.phone,
        password: req.body.password,
        fullname: req.body.fullname,
        address: req.body.address,
        avatar: req.body.avatar || 'https://images.hdqwalls.com/download/doctor-strange-comic-hero-z5-2560x1600.jpg',
        active: false,
        otp_code: otpCode,
        otp_timelife: moment().tz(TIMEZONE).add(5, 'minutes').format()

    };
    await client
        .db(SDB)
        .collection('UserAdminEKT')
        .insertOne(_userAdmin),
    await client
        .db(SDB)
        .collection('AppSetting')
        .updateOne({ name: 'UserAdmin' }, { $set: { name: 'UserAdmin', value: userAdmin_id } }, { upsert: true })
    res.send({success: true,data: _userAdmin});

    } catch (error) {
        next(error)
        
    }};

    
module.exports._update = async (req, res, next) => {
    try {
        
        // let user = await client.db(SDB).collection('UsersEKT').findOne({phone: req.params.user_phone})
        req.params.userAdmin_id = Number(req.params.userAdmin_id);
        let user = await client.db(req.user.database).collection('UsersEKT').findOne(req.params);
        console.log(1);
        
        if (!user) {
            throw new Error(`400: Người dùng không tồn tại!`);
        }
        delete req.body._id;
        delete req.body.userAdmin_id;
        delete req.body.code;
        delete req.body.phone;
        delete req.body.password;
        // delete req.body.fullname;
        // delete req.body.address;
        // delete req.body.job;
        

        let _userAdmin = { ...user, ...req.body };
        _userAdmin = {
            user_id: _userAdmin.userAdmin_id,
            code: _userAdmin.code,
            phone: _userAdmin.phone,
            password: _userAdmin.password,
            avatar: _userAdmin.avatar,
            fullname: _userAdmin.fullname,
            address: _userAdmin.address,
            job: _userAdmin.job,

        };
        req['body'] = _userAdmin;
        await UserAdminService._update(req, res, next);
    } catch (err) {
        next(err);
    }
};

    
    module.exports._verifyOTP = async (req, res, next) => {
        try {
            ['phone', 'otp_code'].map((e) => {
                if (!req.body[e]) {
                    throw new Error(`400: Thiếu thuộc tính ${e}!`);
                }
            });
            const prefix = (req.headers && req.headers.shop) || false;
            
            let business = await (async () => {
                if (!prefix) {
                    let result = client.db(SDB).collection('UsersEKT').findOne({ phone: req.body.phone });
                    return result;
                }
                let result = client.db(SDB).collection('UsersEKT').findOne({ prefix: prefix });
                return result;
            })();
            
            let user = await client.db(SDB).collection('UsersEKT').findOne({ phone: req.body.phone });
            if (!user) {
                throw new Error('400: Tài khoản người dùng không tồn tại!');
            }
            if (req.body.otp_code != user.otp_code) {
                throw new Error('400: Mã xác thực không chính xác!');
            }
            if (user.active == false) {
                delete user.password;
                await client
                    .db(SDB)
                    .collection('UsersEKT')
                    .updateOne(
                        { phone: req.body.phone },
                        {
                            $set: {
                                active: true,
                            },
                        }
                    );
                
                let accessToken = await jwt.createToken({  _user: user }, 30 * 24 * 60 * 60);
                res.send({
                    success: true,
                    message: 'Kích hoạt tài khoản thành công!',
                    data: { accessToken: accessToken },
                });
            } else {
                delete user.password;
                await client
                    .db(SDB)
                    .collection('UsersEKT')
                    .updateOne({ phone: req.body.phone }, { $set: { otp_code: true, otp_timelife: true } });
                let accessToken = await jwt.createToken({  _user: user }, 30 * 24 * 60 * 60);
                res.send({
                    success: true,
                    message: `Mã OTP chính xác, xác thực thành công!`,
                    data: { accessToken: accessToken },
                });
            }
        } catch (err) {
            next(err);
        }
        console.log(3);
    
    };
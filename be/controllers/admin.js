

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

const UserAdminService = require(`../services/admin`);

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
module.exports._checkAdmin = async (req, res, next) => {
    try {
        if (req.body.phone == undefined) throw new Error('400: Vui lòng truyền số điện thoại');

        var user = await client.db(SDB).collection('UsersAdminEKT').findOne({
            phone: req.body.phone,
        });
        return res.send({ success: true, data: user , massage: "aakaka" });
        
    } catch (err) {
        next(err);
    }
    console.log(4);

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

module.exports._register = async (req, res, next) => {
    try {
        [ 'phone', 'password'].map((e) => {
            if (!req.body[e]) {
                throw new Error(`400: Thiếu thuộc tính ${e}!`);
            }
        });

        req.body.prefix = stringHandle(req.body.phone, {
            removeUnicode: true,
            removeSpace: true,
            lowerCase: true,
        });
        req.body.phone = String(req.body.phone).trim().toLowerCase();
        req.body.password = bcrypt.hash(req.body.password);

        let userAdmin = await client
            .db(SDB)
            .collection('UsersAdminEKT')
            .findOne({
                $or: [{ phone: req.body.phone }],
            });
        if (userAdmin) {
            throw new Error('400: Số điện thoại hoặc email đã được sử dụng!');
        }
        let otpCode = String(Math.random()).substr(2, 6);
        let verifyId = crypto.randomBytes(10).toString(`hex`);
        let verifyLink = `https://${req.body.prefix}.${process.env.DOMAIN}/verify-account?uid=${verifyId}`;
        let _verifyLink = {
            phone: req.body.phone,
            UID: String(verifyId),
            verify_link: verifyLink,
            verify_timelife: moment().tz(TIMEZONE).add(5, `minutes`).format(),
        };

        let verifyMessage = `[VIESOFTWARE] Mã OTP của quý khách là ${otpCode}`;
        sendSMS([req.body.phone], verifyMessage, 2, 'VIESOFTWARE');
        
        let [userAdmin_id] = await Promise.all([
            client
                .db(SDB)
                .collection('AppSetting')
                .findOne({ name: 'UsersAdmin' })
                .then((doc) => {
                    if (doc) {
                        if (doc.value) {
                            return Number(doc.value);
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
            email: req.body.email,
            address: req.body.address,
            job: req.body.job,
            avatar: req.body.avatar || 'https://images.hdqwalls.com/download/doctor-strange-comic-hero-z5-2560x1600.jpg',
            active: false,
            otp_code: otpCode,
            otp_timelife: moment().tz(TIMEZONE).add(5, 'minutes').format(),
            last_login: moment().tz(TIMEZONE).format(),
            create_date: moment().tz(TIMEZONE).format(),
            last_update: moment().tz(TIMEZONE).format(),
            active: true,
            slug_name: removeUnicode(`${req.body.fullname}`, true).toLowerCase(),
            slug_address: removeUnicode(`${req.body.address}`, true).toLowerCase(),
        };
        await client
            .db(SDB)
            .collection('UsersAdminEKT')
            .insertOne(_userAdmin),
        await client
        .db(SDB)
        .collection('AppSetting')
        .updateOne({ name: 'UsersAdmin' }, { $set: { name: 'UsersAdmin', value: userAdmin_id } }, { upsert: true })
        res.send({success: true,data: _userAdmin});

    }catch (err) {
        next(err);
    }

};

module.exports._create = async (req,res, next)=> {
    try {
        req.body.phone = String(req.body.phone).trim().toLocaleLowerCase()
        req.body.password = bcrypt.hash(req.body.password);
        let userAdmin = await client
            .db(SDB)
            .collection('UsersAdminEKT')
            .findOne({
                $or: [{ phone: req.body.phone }],
            });
        if (userAdmin) {
            throw new Error('400: Số điện thoại đã được sử dụng!');
        }
        let userAdmin_id = await client
            .db(SDB)
            .collection('AppSetting')
            .findOne({ name: 'UsersAdmin' })
            .then((doc) => {
                if (doc) {
                    if (doc.value) {
                        return Number(doc.value);
                    }
                }
                return 0;
            });
        userAdmin_id++;
        let _userAdmin = {
            userAdmin_id: userAdmin_id,
            code: String(userAdmin_id).padStart(6, '0'),
            prefix: req.body.prefix,
            phone: req.body.phone,
            password: req.body.password,
            fullname: req.body.fullname,
            email: req.body.email,
            address: req.body.address,
            birthday: req.body.birthday,
            role: req.body.role,
            department: req.body.department,
            job: req.body.job,
            last_login: moment().tz(TIMEZONE).format(),
            create_date: moment().tz(TIMEZONE).format(),
            last_update: moment().tz(TIMEZONE).format(),
            active: true,
            slug_name: removeUnicode(`${req.body.fullname}`, true).toLowerCase(),
            slug_address: removeUnicode(`${req.body.address}`, true).toLowerCase(),
        };
        await client
            .db(SDB)
            .collection('AppSetting')
            .updateOne({ name: 'UsersAdmin' }, { $set: { name: 'UsersAdmin', value: userAdmin_id } }, { upsert: true });
        req[`body`] = _userAdmin;
        await UserAdminService._create(req, res, next);
    } catch (err) {
        next(err);
    }
};

module.exports._login = async (req, res, next) => {
    try {

        ['phone', 'password'].map((e) => {
            if (!req.body[e]) {
                throw new Error(`400: Thiếu thuộc tính ${e}!`);
            }
        });
        var phone = req.body.phone;
        let userAdmin = await client.db(SDB).collection('UsersAdminEKT').findOne({phone})


        if (!userAdmin) {
            throw new Error(`404: Tài khoản không chính xác!`);
        }
        if (userAdmin.active == false) {
            throw new Error(`403: Tài khoản chưa được xác thực!`);
        }
        if (!bcrypt.compare(req.body.password, user.password)) {
            res.send({ success: false, message: `Mật khẩu không chính xác!` });
            return;
        }
        delete userAdmin.password;
        userAdmin.isadmin = true;
        let [accessToken, _update] = await Promise.all([
            jwt.createToken({ ...userAdmin, database: SDB, _userAdmin: userAdmin }, 30 * 24 * 60 * 60),
            client
                .db(SDB)
                .collection(`UsersAdminEKT`)
                .updateOne({ userAdmin_id: Number(userAdmin.userAdmin_id) }, { $set: { last_login: moment().tz(TIMEZONE).format() } }),
        ]);
        res.send({ success: true, data: { accessToken } });
    } catch (err) {
        next(err);
    }
};

module.exports._update = async (req, res, next) => {
    try {
        
        req.params.userAdmin_id = Number(req.params.userAdmin_id);
        let userAdmin = await client.db(SDB).collection('UsersAdminEKT').findOne(req.params);
        
        if (!userAdmin) {
            throw new Error(`400: Người dùng không tồn tại!`);
        }
        delete req.body._id;
        delete req.body.userAdmin_id;
        delete req.body.code;
        delete req.body.phone;


        let _userAdmin = { ...userAdmin, ...req.body };
        _userAdmin = {
            userAdmin_id: _userAdmin.userAdmin_id,
            code: _userAdmin.code,
            phone: _userAdmin.phone,
            password: _userAdmin.password,
            email: _userAdmin.email,
            avatar: _userAdmin.avatar,
            fullname: _userAdmin.fullname,
            address: _userAdmin.address,
            birthday: _userAdmin.birthday,
            role: _userAdmin.role,
            department: _userAdmin.department,
            job: _userAdmin.job,
            last_update: moment().tz(TIMEZONE).format(),
        };
        req['body'] = _userAdmin;
        await UserAdminService._update(req, res, next);
    } catch (err) {
        next(err);
    }
};

module.exports._delete = async (req, res, next) => {
    try {
        await client
            .db(SDB)
            .collection(`UsersAdminEKT`)
            .deleteOne({userAdmin_id: Number(req.params.userAdmin_id)});
        res.send({
            success: true,
            message: 'Xóa người dùng thành công!',
        });
    } catch (err) {
        next(err);
    }
};

module.exports._getUser = async(req,res,next)=>{
    try {
        await UserAdminService._get(req, res, next);
    } catch (err) {
        next(err);
    }
}
module.exports._getOne = async(req,res,next)=>{
    try {
        await UserAdminService._getOne(req, res, next);
    } catch (err) {
        next(err);
    }

}

module.exports._getOTP = async (req, res, next) => {
    try {
        ['phone'].map((e) => {
            if (!req.body[e]) {
                throw new Error(`400: Thiếu thuộc tính ${e}`);
            }
        });
        let userAdmin = await client.db(SDB).collection('UsersAdminEKT').findOne({ phone: req.body.phone });
        if (!userAdmin) {
            throw new Error('400: Tài khoản người dùng không tồn tại!');
        }
        let otpCode = String(Math.random()).substr(2, 6);
        let verifyMessage = `[VIESOFTWARE] Mã OTP của quý khách là ${otpCode}`;
        sendSMS([req.body.phone], verifyMessage, 2, 'VIESOFTWARE');
        await client
            .db(SDB)
            .collection(`UsersAdminEKT`)
            .updateOne(
                { phone: req.body.phone },
                {
                    $set: {
                        otp_code: otpCode,
                        otp_timelife: moment().tz(TIMEZONE).add(5, 'minutes').format(),
                    },
                }
            );
        res.send({ success: true, data: `Gửi OTP đến số điện thoại thành công!` });
    } catch (err) {
        next(err);
    }
    console.log(2);
};


module.exports._loginAdmin = async (req, res, next) => {
    try {
        ['phone', 'password'].map((e) => {
            if (!req.body[e]) {
                throw new Error(`400: Thiếu thuộc tính ${e}!`);
            }
        });

        var phone = req.body.phone;
        let userAdmin = await client.db(SDB).collection('UsersAdminEKT').findOne({phone})
        if (!userAdmin) {
            throw new Error(`404: Tài khoản không chính xác!`);
        }
        if (userAdmin.active == false) {
            throw new Error(`403: Tài khoản chưa được xác thực!`);
        }
        if (!bcrypt.compare(req.body.password, userAdmin.password)) {
            res.send({ success: false, message: `Mật khẩu không chính xác!` });
            return;
        }
        delete userAdmin.password;
        userAdmin.isadmin = true;
        let otpCode = String(Math.random()).substr(2, 6);
        let verifyMessage = `[VIESOFTWARE] Mã OTP của quý khách là ${otpCode}`;
        sendSMS([req.body.phone], verifyMessage, 2, 'VIESOFTWARE');
        await client
            .db(SDB)
            .collection(`UsersAdminEKT`)
            .updateOne(
                { phone: req.body.phone },
                {
                    $set: {
                        otp_code: otpCode,
                        otp_timelife: moment().tz(TIMEZONE).add(5, 'minutes').format(),
                    },
                }
            );
        res.send({ success: true, data: `Gửi OTP đến số điện thoại thành công!` });
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
        
        
        let userAdmin = await client.db(SDB).collection('UsersAdminEKT').findOne({ phone: req.body.phone });
        if (!userAdmin) {
            throw new Error('400: Tài khoản người dùng không tồn tại!');
        }
        if (req.body.otp_code != userAdmin.otp_code) {
            throw new Error('400: Mã xác thực không chính xác!');
        }
        if (userAdmin.active == false) {
            delete userAdmin.password;
            await client
                .db(SDB)
                .collection('UsersAdminEKT')
                .updateOne(
                    { phone: req.body.phone },
                    {
                        $set: {
                            active: true,
                        },
                    }
                );
            
            let accessToken = await jwt.createToken({  _userAdmin: userAdmin }, 30 * 24 * 60 * 60);
            res.send({
                success: true,
                message: 'Kích hoạt tài khoản thành công!',
                data: { accessToken: accessToken },
            });
        } else {
            delete userAdmin.password;
            userAdmin.isadmin = true;
            let accessToken = await jwt.createToken({ ...userAdmin, database: SDB, _userAdmin: userAdmin }, 30 * 24 * 60 * 60);
            
            await client
                .db(SDB)
                .collection('UsersAdminEKT')
                .updateOne(
                    { phone: req.body.phone }, 
                    { $set: { otp_code: true, otp_timelife: true,last_login: moment().tz(TIMEZONE).format() },  },
                    { userAdmin_id: Number(userAdmin.userAdmin_id) },
                    
                    );
            res.send({
                success: true,
                message: `Mã OTP chính xác, xác thực thành công!`,
                data: {  accessToken },
            });
        }
    } catch (err) {
        next(err);
    }


};
module.exports._recoveryPassword = async (req, res, next) => {
    try {
        ['phone', 'password'].map((e) => {
            if (!req.body[e]) {
                throw new Error(`400: Thiếu thuộc tính ${e}!`);
            }
        });
        
        let userAdmin = await client.db(SDB).collection('UsersAdminEKT').findOne({ phone: req.body.phone });
        if (userAdmin.active != true) {
            throw new Error(`400: Tài khoản chưa được xác thực OTP!`);
        }
        await client
            .db(SDB)
            .collection('UsersAdminEKT')
            .updateOne(
                { phone: req.body.phone },
                {
                    $set: {
                        password: bcrypt.hash(req.body.password),
                        otp_code: false,
                        otp_timelife: false,
                    },
                }
            );
        let _userAdmin = await client
            .db(SDB)
            .collection(`UsersAdminEKT`)
            .findOne({phone: req.body.phone})
                
        delete _userAdmin.password;
        let accessToken = await jwt.createToken({ _userAdmin: userAdmin }, 30 * 24 * 60 * 60);
        res.send({
            success: true,
            message: 'Khôi phục mật khẩu thành công!',
            data: { accessToken: accessToken },
        });
    } catch (err) {
        next(err);
    }
};
module.exports._refreshToken = async (req, res, next) => {
    try {
        if (req.body.refreshToken == undefined) throw new Error('400: Vui lòng truyền refreshToken');
        try {
            let decoded = await jwt.verifyToken(req.body.refreshToken);
            let user = decoded.data;

            let userNew = await client
                .db(SDB)
                .collection(`UsersAdminEKT`)
                .findOne({phone: req.body.phone})
            if (!userNew) return res.status(404).send({ success: false, message: 'Không tìm thấy người dùng này' });

            let accessToken = await jwt.createToken(userNew, 30 * 24 * 60 * 60);
            let refreshToken = await jwt.createToken(userNew, 30 * 24 * 60 * 60 * 10);
            res.send({ success: true, accessToken, refreshToken });
        } catch (error) {
            console.log(error);
            throw new Error(`400: Refresh token không chính xác!`);
        }
    } catch (err) {
        next(err);
    }
};



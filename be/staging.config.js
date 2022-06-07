module.exports = {
    apps: [
        {
            script: 'index.js',
            name: 'AO-Staging',
            watch: true,
            env: {
                LOCAL_PORT: '6000',
                GLOBAL_PORT: '6001',
                SOCKET_PORT: '6002',
                DOMAIN: 'staging.ekata.vn',
                END_POINT: 'api',
                TIMEZONE: 'Asia/Ho_Chi_Minh',
                EMAIL_HOST: 'mail.ekata.vn',
                EMAIL_PORT: 587,
                EMAIL_USER: 'phi@ekata.vn',
                EMAIL_PASSWORD: 'lephi966',
                MONGO_DATABASE_URI: 'mongodb://localhost:27018',
                DATABASE: 'RootAO',
                access_key_wasabi: 'FPGND4WEL36P7YBI22RU',
                secret_key_wasabi: 'iRLPt3iEwt0tCQf1rOLueI0fPAzjHsFwcd3K70e6',
                NODE_ENV: 'staging',
            },
        },
    ],
    deploy: {
        sandbox: {
            user: 'root',
            host: ['103.176.178.98'],
            ref: 'origin/develop',
            repo: 'git@github.com:anhday123/EKETE-No.git',
            path: '/root/AO-Sandbox',
            'post-deploy': 'cd /root/AO-Sandbox/source/be && npm install && pm2 reload sandbox.config.js --env sandbox',
        },
    },
};

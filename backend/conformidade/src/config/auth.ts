import axios from 'axios';

export default async (req, res, next) => {

    /*if (req.headers['authorization'] === undefined) {
        res.sendStatus(403);
        return;
    }*/

    try {
        const response = await axios.get(
            'https://auth.eficilog.com/auth/realms/eficilog.com/protocol/openid-connect/userinfo',
        {
            headers: { Authorization: req.headers['authorization'] }
        });

        if ((response.data.groups as string[]).includes('/Eficilog/OEAexperts')) {
            res.locals.cnpjs = [
                '07953689',
                '00643123',
                '83064741',
                '08532602',
                '82618455',
                '03428954',
                '80777030',
                '77752293'
            ];
        } else {
            res.locals.cnpjs = ['08532602'];
        }
    } catch {
        res.locals.cnpjs = ['08532602'];
    }

    next();
};
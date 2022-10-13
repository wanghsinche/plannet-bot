const axios = require('axios')
const fs = require('fs')
const path = require('path')
const { postURL } = require('./constant')


async function postMsg(text, notify){
    const cookie = fs.readFileSync(path.resolve(process.cwd(), 'cookie.txt'))

    const res = await axios.post(postURL, {
        "req_data": {
            "type": "topic",
            text,
            "image_ids": [],
            "file_ids": [],
            "mentioned_user_ids": []
          }
    }, {
        headers: {
            'content-type': 'application/json',
            'cookie': cookie,
            origin: 'https://wx.zsxq.com',
            referer: 'https://wx.zsxq.com/'
        }
    })
    notify(JSON.stringify(res.data))
}

module.exports = {
    postMsg
}

import axios from 'axios';

const proxyURL = 'https://api.codetabs.com/v1/proxy?quest='

export async function getPhotoList(amount, startIdx = 0, tag= 'dog') {
    const requests = []
    for (let i = startIdx; i < startIdx + amount; i++) {
        requests.push(await axios.get(`${proxyURL}https://loremflickr.com/json/640/480/${tag}`).then(data => data.data))
    }
    return requests
}

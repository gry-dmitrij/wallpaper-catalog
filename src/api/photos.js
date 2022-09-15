import axios from 'axios';

const baseURL = 'https://api.codetabs.com/v1/proxy?quest='

export async function getPhotoList(amount, startIdx = 0, tag= 'dog') {
    // https://loremflickr.com/320/240/dog?lock=${id}
    console.log('request start')
    const requests = []
    for (let i = startIdx; i < startIdx + amount; i++) {
        requests.push(await axios.get(`${baseURL}https://loremflickr.com/json/640/480/${tag}`).then(data => data.data))
    }
    console.log('request end')
    return requests
}

// https://picsum.photos/v2/list?page=2&limit=100

export async function getPhotoList2(amount, page = 1, tag= 'dog') {
    // https://loremflickr.com/320/240/dog?lock=${id}
    return axios.get(`${baseURL}https://picsum.photos/v2/list?page=${page}&limit=${amount}`).then(data => data.data)
}

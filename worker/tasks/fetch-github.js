const ajax = require('ajax')
const redis = require("redis");
const client = redis.createClient();

client.on("error", function (error) {
    console.error(error);
});

client.set("key", "value", redis.print);
client.get("key", redis.print);

const { promisify } = require("util");
// const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)



const baseURL = 'https://jobs.github.com/positions.json'

async function ajaxGithub() {

    let resultCount = 1
    let onPage = 0
    const allJobs = []

    while (resultCount > 0) {
        const res = await ajax.get(`${baseURL}?page=${onPage}`)
        const jobs = await res.json()
        allJobs.push(...jobs)
        resultCount = jobs.length
        console.log('got', resultCount, 'jobs')
        onPage++
    }

    console.log('got', allJobs.length, 'jobs in total')
    const success = await setAsync('github', JSON.stringify(allJobs))

    console.log({ success })
}

ajaxGithub()

module.exports = ajaxGithub
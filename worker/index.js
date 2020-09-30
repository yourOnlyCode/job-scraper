var CronJob = require('cron').CronJob;

const ajaxGithub = require('./tasks/fetch-github')

var job = new CronJob('* * * * *', ajaxGithub, null, true, 'America/Los_Angeles');
job.start();
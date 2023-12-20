const { CronJob } = require("cron");

const { getConnection } = require("../utils/global");
const {
  HourlyLstStored,
  DayLstHistoricalStored,
  HourlyStakingStored,
  DayHistoricalStakingStored,
} = require("../utils/store-cronjob");

/* =================================================
  Runing Cronjob Hourly 0 * * * *
================================================= */

const HourlyCronjob = new CronJob(
  "0 */1 * * *",
  async () => {
    var d = new Date();
    var timestamp = Date.parse(d);

    const connection = await getConnection();

    await HourlyLstStored(timestamp, connection);
    await HourlyStakingStored(connection);
  },
  null,
  true,
  "America/Los_Angeles"
);

/* =================================================
  Runing Cronjob  Everydayey 0 0 * * *
================================================= */

const DayCronjob = new CronJob(
  "5 0 */1 * *",
  async () => {
    var d = new Date();
    var timestamp = Date.parse(d);

    const connection = await getConnection();

    await DayHistoricalStakingStored(timestamp, connection);
    await DayLstHistoricalStored(timestamp, connection);
  },
  null,
  true,
  "America/Los_Angeles"
);

const CronJobsFunction = () => {
  HourlyCronjob.start();
  DayCronjob.start();
};

module.exports = CronJobsFunction;

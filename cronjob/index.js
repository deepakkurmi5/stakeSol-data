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

    HourlyLstStored(timestamp, connection);
    HourlyStakingStored(connection);
  },
  null,
  true,
  "America/Los_Angeles"
);

/* =================================================
  Runing Cronjob  Everydayey 0 0 * * *
================================================= */

const DayCronjob = new CronJob(
  "0 0 */1 * *",
  async () => {
    var d = new Date();
    var timestamp = Date.parse(d);

    const connection = await getConnection();

    DayLstHistoricalStored(timestamp, connection);
    DayHistoricalStakingStored(timestamp, connection);
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

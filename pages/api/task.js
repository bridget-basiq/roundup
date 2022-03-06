export default function handler(req, res) {
    let sydneyTime = new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"});
    console.log("cron running at " + sydneyTime);
    res.status(200).json("cron running at " + sydneyTime);
  }
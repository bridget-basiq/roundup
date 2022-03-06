export default function handler(req, res) {
    console.log("cron running");
    res.status(200).json("cron running");
  }
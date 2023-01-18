// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

var spawn = require("child_process").spawn;
console.log("spawned");

const handTracker = spawn('python', ['./handTracking.py']);

handTracker.stdout.on('data', (data) => {
  console.log(data)
});

// export default function handler(req, res) {
//   let handTracker = spawn('python', ['./handTracking.py']);
//   let posToSend = [];

//     for await (const data of handTracker.stdout){
//       // console.log(data.toString());
//       posToSend = data;
//     }
//   return res.status(200).json({ message: posToSend})
// }

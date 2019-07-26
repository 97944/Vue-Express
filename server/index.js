const express = require("express");
const bodyParser = require("body-parser");
// corsポリシーに抵触するため、その対策としてcorsを利用する
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", function(req, res) {
  res.send({
    message: "Hello world!"
  });
});

app.get("/members", function(req, res) {
  // 本来は、DBからデータ等を取得する
  const members = [
    {
      name: "戌亥 稔",
      email: "minoru_inui@unirita.co.jp",
      avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
    },
    {
      name: "渡辺 孝則",
      email: "takanori_watanabe@unirita.co.jp",
      avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
    },
    {
      name: "中島 瑠伽",
      email: "ruka_nakajima@unirita.co.jp",
      avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
    }
  ];
  res.send(members);
});

app.listen(process.env.PORT || 3000);

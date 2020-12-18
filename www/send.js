console.log("loaded");
let reserve = 0;
function send() {
  reserve++;                                               //回数カウント
  console.log(reserve);
  let showReserve = document.getElementById("yes");        //(空白)を取得
  let noReserve = document.getElementById("no");           //予約ないよを取得
  console.log(showreserve.textContent);
};
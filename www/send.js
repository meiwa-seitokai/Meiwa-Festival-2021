console.log("loaded");
let reserve = 0;
function send() {
  reserve++;
  console.log(reserve);
  let showReserve = document.querySelector('ons-list-item[id="101HR"]');        //101HRの予約内容を取得
  showReserve = showReserve.textContent
  console.log(showReserve);
};
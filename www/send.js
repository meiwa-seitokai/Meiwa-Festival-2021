const HR = "101HR";
const destination = "Reserve_" + HR;
let reserveNum = 0;
//仮でログイン状況、予約送信先、現在の予約番号  (todo : 取得できるようにする)

document.addEventListener('show', function(event) {
  var page = event.target;

  if (page.id === 'g_assign_number') {
   console.log("loaded");
   let Logining = document.querySelector("ons-list-header[id='LoginNow']");
   Logining.innerHTML = HR;   //ログイン状況を表示
   };

});

function send() {
 let showReserve = document.querySelector("ons-list-item[id=HR]").textContent;   //101HRの予約番号を取得
 reserveNum++;
 console.log(reserveNum);
 //console.log(showReserve);
 
 const Reserve = ncmb.DataStore(destination);
 const reserve = new Reserve();
 reserve.set("reserveNum", reserveNum)
        .save()  //ニフクラに送信
};
const HR = "101HR";
const destination = "Reserve_" + HR;
let reserveNum = 0;

document.addEventListener('show', function(event) {
  var page = event.target;

  if (page.id === 'g_assign_number') {
   console.log("loaded");
   let Logining = document.querySelector("ons-list-header[id='LoginNow']");
   Logining.innerHTML = HR;   //ログイン状況
   };

});

function send() {
 let showReserve = document.querySelector("ons-list-item[id=HR]").textContent;   //101HRの予約内容を取得
 reserveNum++;
 console.log(reserveNum);
 //console.log(showReserve);
 
 const Reserve = ncmb.DataStore(destination);
 const reserve = new Reserve();
 reserve.set("reserveNum", reserveNum)
        .save()  //ニフクラに送信
};
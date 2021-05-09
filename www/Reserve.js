let reserveNum = 0;
//仮で現在の予約番号  (todo : 取得できるようにする)

//ローディング画面
function showModal() {
  var modal = document.querySelector('ons-modal');
  modal.show();
  setTimeout(function() { modal.hide(); }, 2000);
}


document.addEventListener('show', function(event) {
  let page = event.target;
  if (page.id === "situation") {

  //予約確認
  document.getElementById('GetReserve').onclick = function() {
    Information()
  }

  //QRコードリーダー呼び出し
  document.getElementById('QR').onclick = function() {
    showModal()
    scan()
  }

}});


//データ取得
function Information() {
  var tableSource = "";
  let GetReserveInfo = ncmb.DataStore("PgmClass");
  GetReserveInfo.order("ID").fetchAll()
                .then(function(results){
  for (var i = 0; i < results.length; i++) {
    //データ仕分け
    let TmpInfo = results[i]
    let ReserveInfo = {
        ID: TmpInfo.ID,
        MO: TmpInfo.MO,
        NAME: TmpInfo.PgmNm,
        PLACE: TmpInfo.PgmPl,
        OUT: TmpInfo.PgmGn,
        IN: TmpInfo.PgmIn,
        TIME: TmpInfo.PgmTm
        };
    let WaitPeople = ReserveInfo.IN - ReserveInfo.OUT
    let WaitMinutes = WaitPeople * ReserveInfo.TIME
    console.log(ReserveInfo);
    tableSource += "<ons-list-item><div><span class='list-item__title' id=MO" + i + ">" + ReserveInfo.MO + "</span></div>\n<div class='right'><span class='list-item__subtitle' id=WAIT" + i + ">" + WaitMinutes + "分</span></div></ons-list-item>\n";
  }
  InReserve(tableSource)
  })

                .catch(function(error){
  alert("データを取得できませんでした。ネットワーク接続を確認してください。" + "\n" + error.code);
  })

}

//予約表示させる
function InReserve(tableSource) {
  console.log(tableSource);

  document.getElementById("ReserveSituation").innerHTML = tableSource;

}


//QRコード読み取り
function scan() {
  cordova.plugins.barcodeScanner.scan(

    function onSuccess (result) {
      if (result.cancelled === 1) {
        return;
      }
      check(result.text);
    },

    function onError (error) {
      alert("スキャンに失敗しました。もう一度やり直してください。" + "\n" + error );
      location.reload(true);
    },

    { //カメラオプション
      preferFrontCamera : false,
      showFlipCameraButton : false,
      showTorchButton : false,
      torchOn : false,  //Android only
      saveHistory : false,  //Android only
      prompt : "スキャンエリアにQRコードを入れてください。",  //Android
      resultDisplayDuration : 0,  //Android only
      formats : "QR_CODE", 
      orientation : "unset",  //Android only (portrait|landscape)
      disableAnimations : false,  //iOS
      disableSuccessBeep : true  //iOS and Android
    }
  );
  console.log("scaning...")
}

function check(Raw_Destination) {
  console.log(Raw_Destination);
  let destination = Raw_Destination.split(/[\n\r:]/);
  destination = destination[1]
  console.log(destination)  //送信先決定

  //ダイアログ表示
  document
  .getElementById('ReserveCheck')
  .show();

  document.getElementById('LetSend').onclick = function send() {

    //ダイアログ閉じる
    document
    .getElementById('ReserveCheck')
    .hide();

    reserveNum++;
    console.log(reserveNum);
 
    //二フクラに送信
    let SendTo = "Reserve_" + destination
    //console.log(SendTo)

    let Reserve = ncmb.DataStore(SendTo);
    let reserve = new Reserve();
    reserve.set("reserveNum", reserveNum)
           .save()
           .then(function(reserve){
             console.log("Save Succeed!")
           })
           .catch(function(err){
             console.log("Save Failed!")
           });
  }
};
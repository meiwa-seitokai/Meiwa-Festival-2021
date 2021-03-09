let reserveNum = 0;
//仮で現在の予約番号  (todo : 取得できるようにする)

document.addEventListener('show', function(event) {
  let page = event.target;

  if (page.id === "situation") {
    document.getElementById('QR').onclick = function() {
      scan()    //QRコードリーダー呼び出し
    }
  }

});

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
      prompt : "スキャンエリアにQRコードを入れてください",  //Android
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
  }
}
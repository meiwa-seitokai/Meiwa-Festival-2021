//v1.0.0 2021/07/15 15:06 完成
//v1.1.0 2021/07/23 23:53
//v1.2.0 2021/08/19 23:48 追加受注完了

//データ取得定義
let GetReserveInfo = ncmb.DataStore("PgmClass");

//ローディング画面
function showModal() {
  var modal = document.querySelector('ons-modal');
  modal.show();
  setTimeout(function() { modal.hide(); }, 2000);
}

//ボタン押したときの挙動など
document.addEventListener('show', function(event) {
  let page = event.target;
  if (page.id === "situation") {

  //表示したら自動で読み込む
    Information()

  //予約確認
  document.getElementById('GetReserve').onclick = function() {
    Information()
  }

  //QRコードリーダー呼び出し
  document.getElementById('QR').onclick = function() {
    showModal()
    scan()
  }
}

  if (page.id === "info") {

  //運営者モード
  document.getElementById("GoLogin").onclick = function() {
    document.getElementById('myNavigator').pushPage('Login.html')
  }

}});


//データ取得
function Information() {
  var tableSource = "";
  var ReserveSource = "";
  

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
        TIME: TmpInfo.PgmTm,
        TorF: TmpInfo.TorF
        };
    let WaitPeople = ReserveInfo.IN - ReserveInfo.OUT
    let WaitMinutes = WaitPeople * ReserveInfo.TIME
    console.log(ReserveInfo);

    if (ReserveInfo.TorF != 0) {
      tableSource += "<ons-list-item><div><span class='list-item__title' id=MO" + i + ">" + ReserveInfo.MO + "</span></div>\n<div class='right'><span class='list-item__subtitle' id=WAIT" + i + ">" + WaitMinutes + "分</span></div></ons-list-item>\n";
    }

    let SaveReserve = localStorage.getItem(ReserveInfo.MO)

    if (SaveReserve === null) {
      SaveReserve = "empty"
    }else{
      console.log(SaveReserve)
    }

    if (SaveReserve >= ReserveInfo.OUT) {
      ReserveSource += '<ons-list-header id=' + i + '>' + ReserveInfo.MO + '</ons-list-header>\n<ons-list-item modifier="longdivider">' + SaveReserve + '</ons-list-item>';
    }

    if (SaveReserve < ReserveInfo.OUT) {
      localStorage.removeItem(ReserveInfo.MO);
      console.log("削除したよ")
    }


  }
  InReserve(tableSource, ReserveSource)
  })

                .catch(function(error){
  alert("データを取得できませんでした。ネットワーク接続を確認してください。" + "\n" + error.code);
  })
}

//予約表示させる
function InReserve(tableSource, ReserveSource) {

  if (ReserveSource === "") {
    console.log(SaveReserve)
    ReserveSource = '<ons-list-header>整理券情報</ons-list-header>\n<ons-list-item modifier="longdivider"></ons-list-item>';
  }

  console.log(tableSource);
  console.log(ReserveSource);
  document.getElementById("ReserveSituation").innerHTML = tableSource;
  document.getElementById("SaveReserve").innerHTML = ReserveSource;
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

//予約を送信する所
function check(Raw_Destination) {
  let reserveNum = "";
  let TorF = "";

  console.log(Raw_Destination);
  let destination = Raw_Destination.split(/[\n\r:]/);
  destination = destination[1]
  console.log(destination)  //送信先決定

  //予約番号取得
  GetReserveInfo.equalTo("MO", destination).order("PgmIn").limit(1).fetchAll()
                .then(function(results){
    for (var i = 0; i < results.length; i++) {
      let TmpInfo = results[i]
      reserveNum += TmpInfo.PgmIn
      TorF += TmpInfo.TorF
      console.log("Before" + reserveNum);
      reserveNum++;

    }})
                .catch(function(err){
    alert("接続に失敗しました。ネットワーク接続を確認してください。" + "\n" + error.code);
    })

  //ダイアログ表示
  let ReserveCheck = confirm(destination + 'に送信しますか？');
  if (ReserveCheck) {

    //予約送信
    GetReserveInfo.equalTo("MO", destination).fetch()
      .then(function(reserve){

        console.log("After" + reserveNum);

        if (reserveNum > 35 && TorF == 0) {
          alert("満員になったので予約を締め切りました。")
          return;
        }

        reserve.set("PgmIn", reserveNum);
        reserve.update();
        alert("送信しました。");

        localStorage.setItem(destination, reserveNum);

        console.log("Save Success!")
        return;
      })
      .catch(function(err){
        alert("データを取得できませんでした。ネットワーク接続を確認してください。" + "\n" + error.code);
      });

  } else {
    alert("送信しませんでした。");
  }
};

//HR委員用入場記録
//ログイン
function Login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  ncmb.User.login(username, password)
  .then(function(data){
    ons.notification.alert('Congratulations!');
    document.getElementById('myNavigator').pushPage('Admin.html')
  })

  .catch(function(err){
    ons.notification.alert('Incorrect username or password.');
  });
}

function PushChange() {
  document.getElementById("myNavigator").pushPage("Change.html")
}

document.addEventListener('show', function(event) {
  let page = event.target;

  if (page.id === "Admin") {
    ShowUser()
  }

  if (page.id === "Change") {
    GetChange()
}});

function ShowUser() {
    //ログインユーザー表示
    let currentUser = ncmb.User.getCurrentUser()
    let LoginUser = currentUser.get("MO")
    //console.log("ログイン中のユーザー:" + LoginUser);
    document.getElementById("Logining1").innerHTML = LoginUser + "管理画面";
}

function GetChange() {
    //ログインユーザー表示
    let currentUser = ncmb.User.getCurrentUser()
    let LoginUser = currentUser.get("MO")
    //console.log("ログイン中のユーザー:" + LoginUser);
    document.getElementById("Logining2").innerHTML = LoginUser + "入場管理画面";

    //予約取得（一件だけなのでこの処理で良い）
    GetReserveInfo.equalTo("MO", LoginUser).order("PgmIn").limit(1).fetchAll()
    .then(function(results){
      for (var i = 0; i < results.length; i++) {
        let ChangePeople = results[i];
        let ChangeWaitPeople = ChangePeople.PgmIn
        let ChangeExitPeople = ChangePeople.PgmGn
        let ChangeNowPeople = ChangeWaitPeople - ChangeExitPeople
        console.log("HR人数" + ChangeNowPeople);

        let ChangeSituationText = "入場 " + ChangeWaitPeople + " 組" + "出場 " + ChangeExitPeople + " 組";
        document.getElementById("ChangeSituation").innerHTML = ChangeSituationText;
}})};

//できたあああああああああああ
//入場記録送信
function SendPeople() {
  GetChange()
  let currentUser = ncmb.User.getCurrentUser()
  let LoginUser = currentUser.get("MO")

  let GetSituation = document.getElementById("ChangeSituation").textContent
  GetSituation = GetSituation.split(" ")
  let SendWaitPeople = GetSituation[1]
  let SendExitPeople = GetSituation[3]
  SendExitPeople++;

  if (SendExitPeople > SendWaitPeople) {
    alert("エラー！\nホームルーム内の人数がマイナスになっています！");
    SendExitPeople--;
    return;
  }

GetReserveInfo.equalTo("MO", LoginUser).fetch()
  .then(function(results){
    results.set("PgmGn", SendExitPeople)
    results.update();
    document.getElementById("myNavigator").popPage();
  })
  .catch(function(err){
    alert("データを送信できませんでした。ネットワーク接続を確認してください。\n" + error.code);
    return;
  });
};
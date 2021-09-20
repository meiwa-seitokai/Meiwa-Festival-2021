function popHRinfo () {
  document.getElementById("myNavigator").pushPage("homeInfo.html")
};

function popHRinfo2 () {
  document.getElementById("myNavigator").pushPage("homeInfo2.html")
};

function popMusic () {
  document.getElementById("myNavigator").pushPage("Music.html")
}

function popTimes () {
  document.getElementById("myNavigator").pushPage("timeTable.html")
}

function popPampmain () {
  document.getElementById("myNavigator").pushPage("Pampmain.html")
}

function popPamppe () {
  document.getElementById("myNavigator").pushPage("Pamppe.html")
}

function popPampHR () {
  document.getElementById("myNavigator").pushPage("PampHR.html")
}

function popPampplay () {
  document.getElementById("myNavigator").pushPage("Pampplay.html")
}

function popPampother () {
  document.getElementById("myNavigator").pushPage("Pampother.html")
}

function termsOfService () {
  document.getElementById("myNavigator").pushPage("termsOfService.html")
}

function privacyPolicy () {
  document.getElementById("myNavigator").pushPage("privacyPolicy.html")
}

function popStaffList () {
  document.getElementById("myNavigator").pushPage("StaffList.html")
}

document.addEventListener('show', function(event) {
let page = event.target;

if (page.id === "home") {

  var today = new Date();

  let year = today.getFullYear()
  let month = today.getMonth() + 1
  let day = today.getDate()

  console.log("今日は" + year + "年" + month + "月" + day + "日です。")

  if (year === 2021 && month === 9){
    let putName = "TitleFlame"

    if (day === 25){
      putName = "day1"
    }

    if (day === 26){
      putName = "day2"
    }

    if (day === 27){
      putName = "day3"
    }

    let putDays = '<img src="contents/Home/' + putName + '.png" width="100%" class="Title">';
    document.getElementById("Title").innerHTML = putDays;

  }
}

})
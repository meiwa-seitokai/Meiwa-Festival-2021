

//PDF管理用js

document.addEventListener('show', function(event) {
let page = event.target;

/*

if (page.id === "pamphlet") {

let pdfElement = document.getElementById("pamp").innerHTML
if (pdfElement === "") {

let pdfName = '';

ncmb.File.include("fileName", "test").order("fileName").fetchAll()
    .then(function(Files){
    for (var i = 1; i < Files.length-3; i++) {
      let FileInfo = Files[i]
      pdfName += `<embed src="https://mbaas.api.nifcloud.com/2013-09-01/applications/5haqSkiaiQIV9tMn/publicFiles/test-` + i + '.png" type="image/png" width="100%" height="100%">'
    }
    
    //console.log(pdfName)
    document.getElementById("pamp").innerHTML = pdfName;

    })
}}

*/

if (page.id === "Pampmain") {

let pdfElement = document.getElementById("Pampmain1").innerHTML
if (pdfElement === "") {

let pdfName = '';

  for (var i = 1; i < 7; i++) {
    pdfName += `<embed src="contents/Pamphlet/main/main-` + i + '.png" type="image/png" width="100%" height="auto">'
  }
    
  //console.log(pdfName)
  document.getElementById("Pampmain1").innerHTML = pdfName;

}}


if (page.id === "Pamppe") {

let pdfElement = document.getElementById("Pamppe1").innerHTML
if (pdfElement === "") {

let pdfName = '';

  for (var i = 1; i < 17; i++) {
    pdfName += `<embed src="contents/Pamphlet/pe/pe-` + i + '.png" type="image/png" width="100%" height="auto">'
  }
    
  //console.log(pdfName)
  document.getElementById("Pamppe1").innerHTML = pdfName;

}}


if (page.id === "PampHR") {

let pdfElement = document.getElementById("PampHR1").innerHTML
if (pdfElement === "") {

let pdfName = '';

  for (var i = 1; i < 18; i++) {
    pdfName += `<embed src="contents/Pamphlet/HR/HR-` + i + '.png" type="image/png" width="100%" height="auto">'
  }
    
  //console.log(pdfName)
  document.getElementById("PampHR1").innerHTML = pdfName;

}}


if (page.id === "Pampplay") {

let pdfElement = document.getElementById("Pampplay1").innerHTML
if (pdfElement === "") {

let pdfName = '';

  for (var i = 1; i < 10; i++) {
    pdfName += `<embed src="contents/Pamphlet/play/play-` + i + '.png" type="image/png" width="100%" height="auto">'
  }
    
  //console.log(pdfName)
  document.getElementById("Pampplay1").innerHTML = pdfName;

}}


if (page.id === "Pampother") {

let pdfElement = document.getElementById("Pampother1").innerHTML
if (pdfElement === "") {

let pdfName = '';

  for (var i = 1; i < 12; i++) {
    pdfName += `<embed src="contents/Pamphlet/other/other-` + i + '.png" type="image/png" width="100%" height="auto">'
  }
    
  //console.log(pdfName)
  document.getElementById("Pampother1").innerHTML = pdfName;

}}


if (page.id === "timeTable") {

let pdfElement = document.getElementById("timeTable1").innerHTML
if (pdfElement === "") {

let pdfName = '';

  for (var i = 1; i < 4; i++) {
    pdfName += `<embed src="contents/Pamphlet/time/time-` + i + '.png" type="image/png" width="100%" height="auto">'
  }
    
  //console.log(pdfName)
  document.getElementById("timeTable1").innerHTML = pdfName;

}}


})
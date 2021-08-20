//PDF管理用js

document.addEventListener('show', function(event) {
let page = event.target;
if (page.id === "pamphlet") {

let pdfName = '';

ncmb.File.include("fileName", "test").order("fileName").fetchAll()
    .then(function(Files){
    for (var i = 1; i < Files.length-3; i++) {
      let FileInfo = Files[i]
      pdfName += `<embed src="https://mbaas.api.nifcloud.com/2013-09-01/applications/5haqSkiaiQIV9tMn/publicFiles/test-` + i + '.pdf" type="application/pdf" width="100%" height="100%">'
    }
    
    //console.log(pdfName)
    document.getElementById("pamp").innerHTML = pdfName;

    })
}})

let downloadBtn = document.querySelector(".download");
let openBtn = document.querySelector(".open");

downloadBtn.addEventListener("click",(e)=>{
    let jsonData = JSON.stringify([sheetDB,graphComponentMatrix]);
    let file = new Blob([jsonData],{type:"application/json"});
    // let file = null;
    let a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json"
    a.click();
    // console.log("adafadfadfad")
})

openBtn.addEventListener("click",(e)=>{
    let input = document.createElement("input");
    input.setAttribute('type',"file");
    // console.log("input");
    input.click();
    input.addEventListener("change",(e)=>{
        // console.log("change");
        let fr = new FileReader();
        let files = input.files;
        let fileObj = files[0];
        fr.readAsText(fileObj);

        fr.addEventListener("load",(e)=>{
            let readSheetData = JSON.parse(fr.result);
            // console.log('load');
            addSheetBtn.click();
            sheetDB = readSheetData[0];
            graphComponentMatrix = readSheetData[1];

            collectedSheetDB[collectedSheetDB.length-1]=sheetDB;
            collectedGraphComponents[collectedGraphComponents.length-1]=graphComponentMatrix
            handleSheetProp();
        })

    })
})
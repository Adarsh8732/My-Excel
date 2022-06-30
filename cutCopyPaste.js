let ctrlKey ;
document.addEventListener("keydown",(e)=>{
    // console.log(e.ctrlKey+"down");
    ctrlKey = e.ctrlKey;
})
document.addEventListener("keyup",(e)=>{
    // console.log(e.ctrlKey+"up");
    ctrlKey = e.ctrlKey;
})

for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
        let cell = document.querySelector( `.cell[rid="${i}"][cid="${j}"]`);
        handleSelectedCell(cell);
    }
}
let rangeStorage = [];
function handleSelectedCell(cell){
    cell.addEventListener("click",(e)=>{
        // console.log(ctrlKey);
        if(!ctrlKey){
            return;
        }
        if(rangeStorage.length>=2){
            defaultSelectedUI();
            rangeStorage=[];
            return;
        }
        cell.style.border = "3px solid green";
        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        rangeStorage.push([rid,cid]);
    })
}
function  defaultSelectedUI(){
    for(let i=0;i<rangeStorage.length;i++){
        let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
        cell.style.border="1px solid lightgray";
    }
}

let copyBtn = document.querySelector(".copy");
let cutBtn = document.querySelector(".cut");
let pasteBtn = document.querySelector(".paste");

let copyData = [];
copyBtn.addEventListener("click", (e) => {
    if (rangeStorage.length < 2) return;
    copyData = [];

    let [strow, stcol, endrow, endcol] = [ rangeStorage[0][0], rangeStorage[0][1], rangeStorage[1][0], rangeStorage[1][1] ];

    for (let i = strow;i <= endrow;i++) {
        let copyRow = [];
        for (let j = stcol;j <= endcol;j++) {
            let cellProp = sheetDB[i][j];
            copyRow.push(cellProp);
        }
        copyData.push(copyRow);
    }

    defaultSelectedUI();
})

cutBtn.addEventListener("click", (e) => {
    if (rangeStorage.length < 2) return;

    let [strow, stcol, endrow, endcol] = [ rangeStorage[0][0], rangeStorage[0][1], rangeStorage[1][0], rangeStorage[1][1] ];

    for (let i = strow;i <= endrow;i++) {
        for (let j = stcol;j <= endcol;j++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);

            // DB
            let cellProp = sheetDB[i][j];
            cellProp.value = "";
            cellProp.bold = false;
            cellProp.italic = false;
            cellProp.underline = false;
            cellProp.fontSize = 14;
            cellProp.fontFamily = "monospace";
            cellProp.fontColor = "#000000";
            cellProp.BGcolor = "#000000";
            cellProp.alignment = "left";

            // UI
            cell.click();
        }
    }

    defaultSelectedUI();
})



pasteBtn.addEventListener("click" ,(e) => {
    // Past cells data work
    if (rangeStorage.length < 2) return;

    let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
    let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);

    // Target
    let address = addressBar.value;
    let [stRow, stCol] = decodeRIDCIDFromAddress(address);


    // r -> refers copydata row
    // c -> refers copydata col
    for (let i = stRow,r = 0;i <= stRow+rowDiff;i++,r++) {
        for (let j = stCol,c = 0;j <= stCol+colDiff;j++,c++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            // console.log(cell);
            if (!cell) continue;

            // DB
            let data = copyData[r][c];
            let cellProp = sheetDB[i][j];

            cellProp.value = data.value;
            cellProp.bold = data.bold;
            cellProp.italic = data.italic;
            cellProp.underline = data.underline;
            cellProp.fontSize = data.fontSize;
            cellProp.fontFamily = data.fontFamily;
            cellProp.fontColor = data.fontColor;
            cellProp.BGcolor = data.BGcolor;
            cellProp.alignment = data.alignment;

            // UI
            cell.click();
        }
    }
})
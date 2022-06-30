let sheetsFolderCont = document.querySelector(".sheet-folder-cont");
let addSheetBtn = document.querySelector(".sheet-add-icon")

addSheetBtn.addEventListener("click",(e)=>{
    let sheet = document.createElement("div");
    sheet.setAttribute("class","sheet-folder");

    let allSheetFolders = document.querySelectorAll(".sheet-folder");

    sheet.setAttribute("id",allSheetFolders.length);
    sheet.innerHTML=`<div class="sheet-content"> Sheet ${allSheetFolders.length+1}</div>`;
    sheetsFolderCont.appendChild(sheet);
    // 
    // console.log("adfadfa");
    createSheetDB();
    createGraphComponents();
    handleSheetActiveNess(sheet);
    sheet.click();
})
function handleSheetActiveNess(sheet){
    sheet.addEventListener("click",(e)=>{
        let sheetIndex = Number(sheet.getAttribute("id"));
        // console.log(sheetIndex)
        handleSheetDB(sheetIndex);
        handleSheetProp();
        handleSheetUI(sheet);
        handleSheetRemoval(sheet);
    })
}
function handleSheetProp(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            let cell = document.querySelector( `.cell[rid="${i}"][cid="${j}"]`);
            // console.log(cell);
            cell.click();
        }
    }
    let firstCell = document.querySelector(".cell");
    firstCell.click()

}
function handleSheetUI(sheet){
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    // console.log("adfadf");
    for(let i=0;i<allSheetFolders.length;i++){
        allSheetFolders[i].style.backgroundColor = "transparent";
    }
    sheet.style.backgroundColor = "lightgray"
}
function handleSheetDB(index){
    // console.log(index)
    sheetDB=collectedSheetDB[index];
    graphComponentMatrix = collectedGraphComponents[index];
}

function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown",(e)=>{
        if(e.button != 2){
            return;
        }
        let allSheetFolders =  document.querySelectorAll(".sheet-folder");
        if(allSheetFolders.length==1){
            alert("You need to have atlease one sheet");
            return;
        }
        let response = confirm("Your sheet will be removed ");
        if(response==false)
            return;
        let sheetIdx = Number(sheet.getAttribute("id"));
        collectedSheetDB.splice(sheetIdx,1);
        collectedGraphComponents.splice(sheetIdx,1);

        // ui 
        handleSheetUIRemoval(sheet);

        sheetDB = collectedSheetDB[0];
        graphComponentMatrix = collectedGraphComponents[0];
        handleSheetProp();
    })
}
function handleSheetUIRemoval(sheet){
    sheet.remove();
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFolders.length;i++){
        allSheetFolders[i].setAttribute("id",i);
        let sheetConent = allSheetFolders[i].querySelector(".sheet-content");
        sheetConent.innerText = `Sheet ${i+1}`;
        allSheetFolders[i].style.backgroundColor = "transparent";
    }
    allSheetFolders[0].style.backgroundColor = "lightgray";
}
function createSheetDB(){
    let sheetDB=[];
    for(let i=0;i<rows;i++){
        let sheetRow = [];
        for(let j=0;j<26;j++){
            let cellProp ={
                bold:false,
                italic:false,
                underline:false,
                alignment:"left",
                fontFamily:"monospace",
                fontSize:"14",
                fontColor:"#000000",
                BGcolor:"#000000",
                value:"",
                formula:"",
                children:[]
            }
            sheetRow.push(cellProp);
        }
        sheetDB.push(sheetRow);
    }
    collectedSheetDB.push(sheetDB); 
    // console.log(collectedSheetDB);
}

function createGraphComponents(){
    let graphComponentMatrix = [];
    for(let i=0;i<rows;i++){
        let row = [];
        for(let j=0;j<cols;j++){
            row.push([]);
        }
        graphComponentMatrix.push(row);
    }
    collectedGraphComponents.push(graphComponentMatrix);
    // console.log(collectedGraphComponents)
}
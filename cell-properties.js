let collectedSheetDB=[];
let sheetDB=[];
{
    let addSheetBtn = document.querySelector(".sheet-add-icon");
    addSheetBtn.click(); 
    // handleSheetProp();
}
// for(let i=0;i<rows;i++){
//     let sheetRow = [];
//     for(let j=0;j<26;j++){
//         let cellProp ={
//             bold:false,
//             italic:false,
//             underline:false,
//             alignment:"left",
//             fontFamily:"monospace",
//             fontSize:"14",
//             fontColor:"#000000",
//             BGcolor:"#000000",
//             value:"",
//             formula:"",
//             children:[]
//         }
//         sheetRow.push(cellProp);
//     }
//     sheetDB.push(sheetRow);
// }
let bold = document.querySelector(".bold")
let italic = document.querySelector(".italic")
let underline = document.querySelector(".underline")
let fontSize = document.querySelector(".font-size-prop")
let fontFamily = document.querySelector(".font-family-prop")
let fontColor = document.querySelector(".font-color-prop")
let BGcolor = document.querySelector(".BGcolor-prop")
let alignment = document.querySelectorAll(".alignment")
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

// /// prop listener 
// let addressBar = document.querySelector(".address-bar");

function decodeRIDCIDFromAddress(address){
    let rid = Number(address.slice(1)-1);
    let cid = Number(address.charCodeAt(0))-65;
    return [rid,cid];
}

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

bold.addEventListener("click",(e)=>{
    let address = addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    cellProp.bold=!cellProp.bold;
    cell.style.fontWeight = cellProp.bold?"bold":"normal";
    bold.style.backgroundColor = cellProp.bold?activeColorProp:inactiveColorProp;
})

italic.addEventListener("click",(e)=>{
    let address = addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    cellProp.italic=!cellProp.italic;
    cell.style.fontStyle = cellProp.italic?"italic":"normal";
    italic.style.backgroundColor = cellProp.italic?activeColorProp:inactiveColorProp;
})
underline.addEventListener("click",(e)=>{
    let address = addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    cellProp.underline=!cellProp.underline;
    cell.style.textDecoration = cellProp.underline?"underline":"none";
    underline.style.backgroundColor = cellProp.underline?activeColorProp:inactiveColorProp;
})
fontSize.addEventListener("change",(e)=>{
    let address = addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    cellProp.fontSize=fontSize.value;
    cell.style.fontSize = cellProp.fontSize+"px";
})
fontFamily.addEventListener("change",(e)=>{
    let address = addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    cellProp.fontFamily=fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamily;
})
fontColor.addEventListener("change",(e)=>{
    let address = addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    // console.log(fontColor.value);
    cellProp.fontColor=fontColor.value;
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})
BGcolor.addEventListener("change",(e)=>{
    let address = addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    cellProp.BGcolor=BGcolor.value;
    cell.style.backgroundColor = cellProp.BGcolor;
})
alignment.forEach((alignElem)=>{
    // console.log("srtewtw");
    alignElem.addEventListener("click",(e)=>{
        let address = addressBar.value;
        let [cell,cellProp] = getCellAndCellProp(address);
        let alignValue = e.target.classList[0];
        // console.log("adfadff",e.target.classList[0]);
        cellProp.alignment=alignValue;
        cell.style.textAlign = cellProp.alignment;
        switch (alignValue) {
            case "left":
                leftAlign.style.backgroundColor=activeColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=activeColorProp;
                break;
            default:
                break;
        }
    })
})

function getCellAndCellProp(address){
    let [rid,cid] = decodeRIDCIDFromAddress(address);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell,cellProp];
}

let allCells = document.querySelectorAll(".cell");
allCells.forEach((cell)=>{
    addListenerToAttachCellProperties(cell);
})

function addListenerToAttachCellProperties(cell){
    cell.addEventListener("click",(e)=>{
        // console.log(cell);
        let address = addressBar.value;
        let [rid,cid] = decodeRIDCIDFromAddress(address);
        let cellProp = sheetDB[rid][cid];

        cell.style.fontWeight = cellProp.bold?"bold":"normal"; 
        cell.style.fontStyle = cellProp.italic?"italic":"normal";
        cell.style.textDecoration = cellProp.underline?"underline":"none";
        cell.style.fontSize = cellProp.fontSize+"px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor==="#000000"?"transparent":cellProp.BGcolor;;
        cell.style.textAlign = cellProp.alignment;

        // for buttons 

        bold.style.backgroundColor = cellProp.bold?activeColorProp:inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic?activeColorProp:inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline?activeColorProp:inactiveColorProp;
        fontSize.value = cellProp.fontSize;
        fontColor.value = cellProp.fontColor;
        fontFamily.value = cellProp.fontFamily;
        BGcolor.value = cellProp.BGcolor;

        switch (cellProp.alignment) {
            case "left":
                leftAlign.style.backgroundColor=activeColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=activeColorProp;
                break;
            default:
                break;
        }

        let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;
        
    })
}

for(let i=0;i<100;i++){
    for(let j=0;j< 26;j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur",(e)=>{
            let address = addressBar.value;
            let [cell,cellProp] = getCellAndCellProp(address);
            let enteredData = cell.innerText;
            if(enteredData == cellProp.value)
                return;
            cellProp.value = enteredData;
            // console.log(cellProp.value);
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCells(address);
        })
    }
}
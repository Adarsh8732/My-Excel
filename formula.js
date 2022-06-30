
let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener(("keydown"),async(e)=>{
    let inputFormula = formulaBar.value;
    if(e.key == "Enter" && inputFormula){
        
        let address = addressBar.value;
        let [cell,cellProp] = getCellAndCellProp(address);
        if(inputFormula !== cellProp.formula){
            removeChildFromParent(cellProp.formula);
        }
        // check is it cyclic 
        addChildToGraphComponents(inputFormula,address);
        let cycleRes = isGraphCyclic(graphComponentMatrix);
        // console.log(isCylic);
        if(cycleRes){
            // alert("your Formula is cyclic");
            let response = confirm("Your Formula is cyclic Do you want to trace it");
            while(response){
                await isGraphCyclicTracePath(cycleRes);
                response = confirm("Your Formula is Cyclic Do you want to trace it");
            }
            removeChildFromGraphComponents(inputFormula,address);
            return;
        }

        let evaluatedValue = evaluatedFormula(inputFormula);
        setCellUIAndCellProp(evaluatedValue,inputFormula,addressBar.value);
        addChildToParent(inputFormula);


        updateChildrenCells(address);
    }
})




function evaluatedFormula(formula){
    let encodedFormula = formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [cell,cellProp] = getCellAndCellProp(encodedFormula[i]);
            // console.log(cellProp.value);
            encodedFormula[i]=cellProp.value
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}


function setCellUIAndCellProp(evaluatedValue,formula,address){
    // let address = addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);

    cell.innerText = evaluatedValue;

    cellProp.value = evaluatedValue;
    cellProp.formula = formula;
}

function addChildToParent(formula){
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [parentCell,parentCellProp] = getCellAndCellProp(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
            // console.log(parentCellProp)
        }
    }
}

function removeChildFromGraphComponents(formula,childAddress){
    let [crid,ccid] = decodeRIDCIDFromAddress(childAddress);
    let encodedFormula = formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [prid,pcid]= decodeRIDCIDFromAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].pop();
        }
    }
}
function addChildToGraphComponents(formula,childAddress){
    let [crid,ccid] = decodeRIDCIDFromAddress(childAddress);
    let encodedFormula = formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [prid,pcid]= decodeRIDCIDFromAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].push([crid,ccid]);
        }
    }
}

function removeChildFromParent(formula){
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90 ){
            let [parentCell,parentCellProp] = getCellAndCellProp(encodedFormula[i]);
            let idx = parentCellProp.children.indexOf(childAddress);
            let [pr,pc] = decodeRIDCIDFromAddress(encodedFormula[i]);
            ///////remove same child from graph array to other wise it may give error
            graphComponentMatrix[pr][pc].splice(idx,1);
            parentCellProp.children.splice(idx,1);
            // console.log(parentCellProp);
        }
    }
}

function updateChildrenCells(parentAddress){
    let [parcell,parcellProp] = getCellAndCellProp(parentAddress);
    // console.log(parcellProp.children);
    // for(let childAddress in parcellProp.children){
    let children = parcellProp.children;
    for(let i=0;i<children.length;i++){
        let childAddress = children[i];
        // console.log(childAddress);
        let [cell,cellProp] = getCellAndCellProp(childAddress);
        let formula = cellProp.formula;
        let evaluatedValue = evaluatedFormula(formula);
        // cellProp.value = evaluatedValue;
        // cell.innerText = evaluatedValue;
        setCellUIAndCellProp(evaluatedValue,formula,childAddress);
        updateChildrenCells(childAddress);
    }
}

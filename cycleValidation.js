// const { ConsoleMessage } = require("puppeteer");
let collectedGraphComponents = [];
let graphComponentMatrix = [];
// for(let i=0;i<rows;i++){
//     let row = [];
//     for(let j=0;j<cols;j++){
//         row.push([]);
//     }
//     graphComponentMatrix.push(row);
// }
function isGraphCyclic(graphComponentMatrix){
    let visited = [];
    let dfsvisited = [];
    for(let i=0;i<rows;i++){
        let visitedRow = [];
        let dfsvisitedRow = [];
        for(let j=0;j<cols;j++){
            visitedRow.push(false);
            dfsvisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsvisited.push(dfsvisitedRow);
    }
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            if(visited[i][j]===false && graphComponentMatrix[i][j].length>0){
                let res = dfsCycleDEtection(graphComponentMatrix,i,j,visited,dfsvisited)
                if(res){
                    // console.log(dfsvisited);
                    // return [i,j];
                    console.log(res);
                    return res;
                }
            }
        }
    }
    return null;
}
function dfsCycleDEtection(graphComponentMatrix,srcr,srcc,visited,dfsvisited){
    // console.log(srcr+" "+srcc);
    visited[srcr][srcc] = true;
    dfsvisited[srcr][srcc]=true;
    for(let children=0;children<graphComponentMatrix[srcr][srcc].length;children++){
        let [nbrr,nbrc]= graphComponentMatrix[srcr][srcc][children];
        if(visited[nbrr][nbrc]==false){
            let res = dfsCycleDEtection(graphComponentMatrix,nbrr,nbrc,visited,dfsvisited);
            if(res){
                return res;
            }
        }
        else if(visited[nbrr][nbrc] && dfsvisited[nbrr][nbrc]){
            return [nbrr,nbrc];
            // return true;
        }
    }
    dfsvisited[srcr][srcc]= false;
    return null;
}
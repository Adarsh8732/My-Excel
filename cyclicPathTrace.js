async function isGraphCyclicTracePath(cycleRes){
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
    // for(let i=0;i<rows;i++){
    //     for(let j=0;j<cols;j++){
    //         if(visited[i][j]===false && graphComponentMatrix[i][j].length>0){
    //             let res = dfsCycleDEtectionTracePath(graphComponentMatrix,i,j,visited,dfsvisited)
    //             if(res){
    //                 console.log(dfsvisited);
    //                 return true;
    //             }
    //         }
    //     }
    // }
    let res = await dfsCycleDEtectionTracePath(graphComponentMatrix,cycleRes[0],cycleRes[1],visited,dfsvisited);
    if(res){
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
}
async function dfsCycleDEtectionTracePath(graphComponentMatrix,srcr,srcc,visited,dfsvisited){
    // console.log(srcr+" "+srcc);
    visited[srcr][srcc] = true;
    dfsvisited[srcr][srcc]=true;
    let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);
    cell.style.backgroundColor = "lightblue";

    await ColorPromise();

    for(let children=0;children<graphComponentMatrix[srcr][srcc].length;children++){
        let [nbrr,nbrc]= graphComponentMatrix[srcr][srcc][children];
        if(visited[nbrr][nbrc]==false){
            let res = await dfsCycleDEtectionTracePath(graphComponentMatrix,nbrr,nbrc,visited,dfsvisited);
            if(res){
                await ColorPromise();
                cell.style.backgroundColor = "transparent";
                return Promise.resolve(true);
            }
        }
        else if(visited[nbrr][nbrc] && dfsvisited[nbrr][nbrc]){
            let cell2 = document.querySelector(`.cell[rid="${nbrr}"][cid="${nbrc}"]`);
            cell2.style.backgroundColor = "lightsalmon";
            await ColorPromise();
            cell2.style.backgroundColor = "transparent";

            await ColorPromise();
            cell.style.backgroundColor = "transparent";
            return Promise.resolve(true);
        }
    }
    dfsvisited[srcr][srcc]= false;
    return Promise.resolve(false);
}

function ColorPromise(){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res();
        },1000);
    })
}
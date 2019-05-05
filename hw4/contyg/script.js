
function createTable() {
    
    // add table to document
    const table = document.createElement("table");
    table.setAttribute("id", "onlyOne");
    table.style.border = "1px solid black";
    table.style.textAlign = "center";
    document.body.appendChild(table);

    // add caption
    const caption = document.createElement("caption");
    const capText = document.createTextNode("(row, col)");
    caption.appendChild(capText);
    table.insertBefore(caption, table.childNodes[0]);
        
    // create and populate table
    for (let i = 0; i < 4; i++) {
        // set up row
        const id = "row" + i;
        let row;
        
        // if header row
        if(i === 0) {
            const header = table.createTHead();
            row = header.insertRow(0);
            row.style.fontWeight = "bold";

        } else {
            row = document.createElement("tr");
        } 
        
        row.style.fontSize = "24px";
        row.setAttribute("id", id);

        // insert cells for each row
        for (let j = 4; j > 0; j--) {
            let cell = row.insertCell(0); 
            let contents = "( " + i + " , " + j + " )";
            
            // header row
            if(i === 0) {
                contents = "Header " + j;
            }

            cell.textContent = contents;
            cell.style.border = "1px solid black";
            cell.setAttribute("row", i);
            cell.setAttribute("col", j);
            cell.setAttribute("selected", false);
        }

        // add row
        document.getElementById("onlyOne").appendChild(row);
    }
}

function insertButtons() {
    // arrow btns
    const up = document.createElement("button");
    const down = document.createElement("button");
    const left = document.createElement("button");
    const right = document.createElement("button");
    
    // mark cell
    const markCell = document.createElement("button");
    
    // add ids
    up.setAttribute("id", "upBtn");
    down.setAttribute("id", "downBtn");
    left.setAttribute("id", "leftBtn");
    right.setAttribute("id", "rightBtn");
    markCell.setAttribute("id", "markCellBtn");

    // add text
    const upText = document.createTextNode("UP");
    const downText = document.createTextNode("DOWN");
    const leftText = document.createTextNode("LEFT");
    const rightText = document.createTextNode("RIGHT");
    const markText = document.createTextNode("Mark Cell");

    up.appendChild(upText);
    down.appendChild(downText);
    left.appendChild(leftText);
    right.appendChild(rightText);
    markCell.appendChild(markText);

    markCell.style.backgroundColor = "yellow";

    // add listeners
    up.addEventListener("click", moveCell);
    down.addEventListener("click", moveCell);
    left.addEventListener("click", moveCell);
    right.addEventListener("click", moveCell);
    markCell.addEventListener("click", mark);


    // add btns
    document.body.appendChild(up);
    document.body.appendChild(down);
    document.body.appendChild(left);
    document.body.appendChild(right);
    document.body.appendChild(markCell);
}

function moveCell(event) {
    const oldCell = document.querySelector(`td[selected=true]`);
    let row = oldCell.getAttribute("row");
    let col = oldCell.getAttribute("col");

    oldCell.style.borderWidth = "1px";
    oldCell.setAttribute("selected", false);

    console.log("old cell", oldCell)
    const btnId = event.target.getAttribute("id");
    
    console.log(btnId);
    switch(btnId) {
        case "upBtn":
            if(row > 1) {
                row--;
            }
            break;
        case "downBtn":
            if(row < 3) {
                row++;
            }
            break;
        case "leftBtn":
            if(col > 1) {
                col--;
            }
            break;
        case "rightBtn":
            if(col < 4) {
                col++;
            }
            break;
        default:
            break;
    }
    selectCell(row, col);
    console.log("move cell, position", row, col);

}

function selectCell(rowNum, col) {
    const rowId = "#row" + rowNum;
    const row = document.querySelector(rowId);
    const cell = row.querySelectorAll(`td[col='${col}']`);
    cell[0].style.borderWidth = "thick";
    cell[0].setAttribute("selected", true);
}

function mark(rowNum, col) {
    const rowId = "#row" + rowNum;
    const row = document.querySelector(rowId);
    const cell = row.querySelectorAll(`td[col='${col}']`);
    cell[0].style.backgroundColor = "yellow";
}

createTable();
insertButtons();
selectCell(1, 1);
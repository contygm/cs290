
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
    const btnId = event.target.getAttribute("id");
    const btn = document.getElementById(btnId);
    const row = btn.getAttribute("row");
    console.log("move cell", row, btn);
}

function mark(row, col) {
    const rowId = "#row" + row;
    var container = document.querySelector(rowId);
    var cell = container.querySelectorAll(`td[col='${col}']`);
    cell[0].style.backgroundColor = "yellow";
    console.log("mark cell", cell)
}

createTable();
insertButtons();
mark(1, 1);
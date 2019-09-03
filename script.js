'use script';

const toDos = [];

// タスク追加時の処理
document.getElementById("add-btn").addEventListener("click", () => {
    addToDo();
    trClear();
    createTable();
});

// ラジオボタンを選択時の処理
const radioChecks = document.getElementsByName("taskState");
for (let i = 0; i < radioChecks.length; i++) {
    radioChecks[i].addEventListener("change", () => {
        displayChange();
    });
};

//　hideクラスを付与する関数
// 汚いコード　もっとスマートに書きたい部分
const displayChange = () => {
    const tr = document.getElementsByClassName("todo")
    if (radioChecks[0].checked) {
        for (let i = 0; i < tr.length; i++) {
            tr[i].classList.remove("hide");
        };
    } else if (radioChecks[1].checked) {
        for (let i = 0; i < tr.length; i++) {
            tr[i].classList.remove("hide");
            if (toDos[i].state !== "doing") {
                tr[i].classList.add("hide");
            };
        };
    } else {
        for (let i = 0; i < tr.length; i++) {
            tr[i].classList.remove("hide");
            if (toDos[i].state !== "done") {
                tr[i].classList.add("hide");
            };
        };
    };
};

// Todoを配列に追加する関数
const addToDo = () => {
    const target = document.forms.input.newTask;
    const inputText = target.value;
    const toDo = {text: inputText, state: "doing"};
    toDos.push(toDo);
    target.value = "";
};

// trタグをクリアする関数
const trClear = () => {
    const target = document.getElementById("toDoArea");
    target.innerHTML = "";
};

//　テーブル作成関数
const createTable = () => {
    toDos.forEach( (todo) => {
        const tr = document.createElement("tr");
        tr.classList.add("todo");

        const idTd = document.createElement("td");
        idTd.innerHTML = toDos.indexOf(todo);

        const textTd = document.createElement("td");
        textTd.innerHTML = todo.text;
        
        const btnTd = document.createElement("td");
        const stateBtn = createStateBtn(todo);
        const deleteBtn = createDeleteBtn(todo);
        btnTd.appendChild(stateBtn);
        btnTd.appendChild(deleteBtn);
        
        tr.appendChild(idTd);
        tr.appendChild(textTd);
        tr.appendChild(btnTd);

        const target = document.getElementById("toDoArea");
        target.appendChild(tr);
    });
};

// 状態ボタン作成
const createStateBtn = (todo) => {
    const stateBtn = document.createElement("button");
    stateBtn.setAttribute("class", "state-btn");
    const btnText = {doing: "作業中", done: "完了"};
    stateBtn.innerHTML = btnText[todo.state];
    // クリック時の処理
    stateBtn.addEventListener("click", () => {
        if (todo.state === "doing") {
            todo.state = "done";
        } else {
            todo.state = "doing";
        };
        trClear();
        createTable();
    });
    return stateBtn;
};

// 削除ボタン作成
const createDeleteBtn = (todo) => {
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "delete-btn");
    deleteBtn.innerHTML = "削除";
    //　クリック時の処理
    deleteBtn.addEventListener("click", () => {
        const id = toDos.indexOf(todo);
        toDos.splice(id, 1);
        trClear();
        createTable();
        displayChange();
    });
    return deleteBtn;
};
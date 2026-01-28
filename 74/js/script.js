//タイトル名用の配列
let titleArray = [];

//詳細用の配列
let detailArray = [];

/*メモを表示する関数*/
function displayMemo() {
    let titleArrayJson = localStorage.getItem("title");
    let detailArrayJson = localStorage.getItem("detail");
    titleArray = JSON.parse(titleArrayJson);
    detailArray = JSON.parse(detailArrayJson);
    console.log(titleArray);
    console.log(detailArray);
    let cnt = 0;
    if (titleArray != null) {
        for (let i = 0; i < titleArray.length; i++) {
            let memoContainer = document.createElement("div");
            memoContainer.id = `memoContainer${i}`;
            memoContainer.className = "memo-container";
            document.getElementById("memo-group").appendChild(memoContainer);
            memoContainer = document.getElementById(`memoContainer${i}`);
            let memoList = document.createElement("li");
            memoList.id = String(i);
            memoList.className = "memo-list";
            memoList.setAttribute("onclick", `transitionDetailMemo(${i})`);
            memoContainer.appendChild(memoList);
            memoList = document.getElementById(String(i));
            let title = document.createElement("h2");
            title.textContent = titleArray[i];
            memoList.appendChild(title);
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "削除";
            deleteButton.className = "delete-button";
            deleteButton.setAttribute("onclick", "deleteMemo(" + i + ")");
            memoContainer.appendChild(deleteButton);
            cnt++;
        }
        if (cnt == 0) {
            document.getElementById("memo-group").style.display = "none";
            alert("登録された通過作品記録がありません");
        } else {
            alert("登録された通過作品の件数は" + cnt + "件です");
        }
    } else {
        document.getElementById("memo-group").style.display = "none";
        alert("登録された通過作品記録がありません");
    }
}

/*メモを作成（追加）する関数*/
function createMemo() {
    let titleArrayJson = localStorage.getItem("title");
    let detailArrayJson = localStorage.getItem("detail");
    titleArray = JSON.parse(titleArrayJson);
    detailArray = JSON.parse(detailArrayJson);
    let titleInput = document.getElementById("title").value;
    let detailInput = document.getElementById("detail").value;
    if (titleInput == "") {
        alert("通過作品のタイトルを記入してください");
    } else {
        if (titleArray != null && detailArray != null) {
            titleArray.push(titleInput);
            detailArray.push(detailInput);
        } else {
            titleArray = [titleInput];
            detailArray = [detailInput];
        }
        console.log(titleArray);
        console.log(detailArray);
        localStorage.setItem("title", JSON.stringify(titleArray));
        localStorage.setItem("detail", JSON.stringify(detailArray));
        alert("通過作品記録を追加しました");
        window.location.href = "../index.html";
    }
}

/*メモを追加するページにジャンプする関数*/
function plusMemo() {
    window.location.href = "html/plus.html";
}

/*メモの詳細を表示するページに遷移する関数*/
function transitionDetailMemo(displayItem) {
    localStorage.setItem("displayItem", displayItem);
    window.location.href = "html/displayDetail.html";
}

/*メモの詳細を表示する関数*/
function displayDetailMemo() {
    let displayItem = Number(localStorage.getItem("displayItem"));
    let titleArrayJson = localStorage.getItem("title");
    let detailArrayJson = localStorage.getItem("detail");
    titleArray = JSON.parse(titleArrayJson);
    detailArray = JSON.parse(detailArrayJson);
    let memo = document.getElementById("memo");
    let title = document.createElement("h2");
    title.textContent = titleArray[displayItem];
    memo.appendChild(title);
    let detail = document.createElement("p");
    detail.innerHTML = detailArray[displayItem].replace(/\n/g, '<br>');
    memo.appendChild(detail);
    let updateButton = document.createElement("button");
    updateButton.textContent = "編集";
    updateButton.className = "update-button";
    updateButton.setAttribute("onclick", `transitioUpdateMemo(${displayItem})`);
    memo.appendChild(updateButton);
}

/*メモを編集するページに遷移する関数*/
function transitioUpdateMemo(updateItem) {
    localStorage.setItem("updateItem", updateItem);
    window.location.href = "update.html";
}

/*メモを編集する関数*/
function editMemo() {
    let displayItem = Number(localStorage.getItem("displayItem"));
    let titleArrayJson = localStorage.getItem("title");
    let detailArrayJson = localStorage.getItem("detail");
    titleArray = JSON.parse(titleArrayJson);
    detailArray = JSON.parse(detailArrayJson);
    let titleForm = document.getElementById("title");
    let detailForm = document.getElementById("detail");
    titleForm.value = titleArray[displayItem];
    detailForm.value = detailArray[displayItem];
}

/*メモを更新する関数*/
function updateMemo() {
    let displayItem = Number(localStorage.getItem("displayItem"));
    let titleArrayJson = localStorage.getItem("title");
    let detailArrayJson = localStorage.getItem("detail");
    titleArray = JSON.parse(titleArrayJson);
    detailArray = JSON.parse(detailArrayJson);
    let titleInput = document.getElementById("title").value;
    let detailInput = document.getElementById("detail").value;
    if (titleInput == "") {
        alert("通過作品のタイトルを記入してください");
    } else {
        titleArray[displayItem] = titleInput;
        detailArray[displayItem] = detailInput;
        console.log(titleArray);
        console.log(detailArray);
        localStorage.setItem("title", JSON.stringify(titleArray));
        localStorage.setItem("detail", JSON.stringify(detailArray));
        alert("通過作品記録を更新しました");
        window.location.href = "../index.html";
    }
}

/*メモを削除する関数*/
function deleteMemo(deleteItem) {
    if (confirm("この通過作品記録を削除しますか？")) {
        let titleArrayJson = localStorage.getItem("title");
        let detailArrayJson = localStorage.getItem("detail");
        titleArray = JSON.parse(titleArrayJson);
        detailArray = JSON.parse(detailArrayJson);
        titleArray.splice(Number(deleteItem), 1);
        detailArray.splice(Number(deleteItem), 1);
        localStorage.setItem("title", JSON.stringify(titleArray));
        localStorage.setItem("detail", JSON.stringify(detailArray));
        window.location.reload();
    }
}

/*メモをすべて削除する関数*/
function deleteAllMemo() {
    if (confirm("全ての通過作品記録を削除しますか？")) {
        localStorage.clear();
        window.location.reload();
    }

}

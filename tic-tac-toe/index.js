// variabel boxes semuanya diberikan query
let boxes = document.querySelectorAll(".box");

// variabel turn = x digunakan untuk player X jalan duluan
let turn = "X";
// variabel isGameOver memiliki value boolean yaitu false
let isGameOver = false;

// tiap boxes akan melakukan perulangan
boxes.forEach(e =>{
    // didalam html masukkan atau pencet sesuatu
    e.innerHTML = ""
    // tambahkan event ketika di klik
    e.addEventListener("click", ()=>{
        // jika tidak game over dan e masih kosong
        if(!isGameOver && e.innerHTML === ""){
            // maka akan ke player selanjutnya
            e.innerHTML = turn;
            checkWin();
            checkDraw();
            changerTurn();
        }
    })
})

// memanggil function changerTurn
function changerTurn(){
    // Player X memulai lebih dahulu
    if(turn === "X"){
        // melanjutkan O
        turn =	"O"
        // memilih bagian background yang ingin diubah style dengan left 85px
        document.querySelector(".bg").style.left = "85px";
    }
    else {
        // lanjut kembali ke X
        turn =	"X"
        // memilih bagian background yang ingin diubah style dengan left 85px
        document.querySelector(".bg").style.left = "0";

    }
}

// memanggil function chechWin
function checkWin(){
    // membuat variabel winConditions, memiliki array box
    let winConditions = [
        [0,1,2], [3,4,5], [6,7,8], //horizontal
        [0,3,6],[1,4,7] ,[2,5,8] , //vertikal
        [0,4,8], [2,4,6] //diagonal
    ]
    // lakukan perulangan sampai membentuk garis
    for(let i = 0; i<winConditions.length; i++){
        // variabel v0 menngeck kondisi perulangan horizontal jika menang
        let v0 = boxes[winConditions[i][0]].innerHTML;
        // variabel v1 mengecek kondisi perulangan vertikal jika menang
        let v1 = boxes[winConditions[i][1]].innerHTML;
        // variabel v2 mengecek kondisi perulangan diagonal jika menang
        let v2 = boxes[winConditions[i][2]].innerHTML;

        // cek apakah ada salah satu dari kondisi terpenuhi
        if(v0 != "" && v0 === v1 && v0 === v2){
            // jika iya maka akan terjadi game over 
            isGameOver = true;
            // memanggil html element  dan memunculkan text Win dan memanggil player yang menang
            document.querySelector("#result").innerHTML = turn + " win ";
            // memanggil html element dan membuat display style button inline
            document.querySelector("#play-again").style.display = "inline";
            
            // melakukan perulangan dan terhenti jika salah satu menang
            for(j = 0; j<3; j++){
                // boxes akan berubah warna sesuai dengan code hexagon yang diberikan jika salah satu menang
                boxes[winConditions[i][j]].style.backgroundColor = "#08d9d6";
                boxes[winConditions[i][j]].style.backgroundColor = "#08d9d6";

            }
        }
    }
}

// memanggil functin chechDraw
function checkDraw(){
    // jika tidak game over
    if(!isGameOver){
        // maka terjadi true
        let isDraw = true;
        // boxes melakukan perulangan
        boxes.forEach(e=>{
            // jika masih ada box kosong maka terjadi false
            if(e.innerHTML === "") isDraw = false;
        })
        
        // jika draw 
        if(isDraw){
            // gameover akan menjadi true karena box sudah tidak bisa dipilih lagi
            isGameOver = true
            // memanggil html element  dan memunculkan text seri
            document.querySelector("#result").innerHTML = " draw ";
            // memanggil html element dan membuat display style button inline
            document.querySelector("#play-again").style.display = "inline";
        
        }
    }
}

// memanggil query element html playy-again, lakukan event ketika di klik
document.querySelector("#play-again").addEventListener("click", ()=>{
    // jika game over maka terjadi 
    isGameOver = false;
    // mengembalikan nilai x kembali ke awal permainan
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#result").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    // boxes melakukan perulangan 
    boxes.forEach (e => {
        // semua element html akan mengulang kembali
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "fff"
    })
})
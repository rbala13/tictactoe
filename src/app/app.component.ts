import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  createForm: FormGroup;
  vspcForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm = this.fb.group({
      firstplayer: '',
      secondplayer: '',
    });
    this.vspcForm = this.fb.group({
      player: '',
    });
  }

  playervspc = false;
  playervsplayer = false;
  buttonClicked = false;
  playerpsplayerlogs = false;
  playerVsPcText = 'Player vs PC';
  playerVsPlayerText = 'Player vs Player';
  firstPlayerName;
  secondPlayerName;
  currentPlayer;
  selectedText;
  arr = [];
  firstPlayerText = 'X';
  secondPlayerText = 'O';
  firstplayercondition = true;
  clickedArrs: any[] = [];
  values = [];
  playerSign = '';
  count = 0;
  WonOrDraw;
  playervsplayerTableAfterInput = false;
  testtest = '';
  gamelogs = [];
  vspcplayer = '';
  vcpcplayerturn = true;
  vspcarray: any[] = [];
  PlayervsPlayerAdded = true;
  playervspcadded = true;
  pcorpvpv = true;

  onplayervspcClick() {
    this.playervspc = true;
    this.selectedText = this.playerVsPcText;
    this.buttonClicked = true;
    this.playerpsplayerlogs = false;
    this.PlayervsPlayerAdded = false;
    this.pcorpvpv = false;
  }

  playervsplayerClick() {
    this.playervsplayer = true;
    this.selectedText = this.playerVsPlayerText;
    this.buttonClicked = true;
    this.playerpsplayerlogs = true;
    this.playervspcadded = false;
    this.pcorpvpv
  }
  ngOnInit() {
    this.populateArray();
    console.log(this.arr, 'array');
  }

  TabClicked(arrs) {
    if (this.pcorpvpv) {
      if (!this.checkWinner()) {
      if (this.clickedArrs[arrs] == undefined) {
        
          this.clickedArrs[arrs] = true;
          this.count++;
          this.changeTextBasedOnSelected(arrs);
          this.values[arrs] = this.playerSign;
          console.log(this.values, 'like');
          // document.getElementById('logs').innerHTML = `${this.currentPlayer} clicked ${arrs} and added ${this.playerSign}`;
          this.gamelogs.push(
            `${this.count}.${this.currentPlayer} clicked ${arrs} and added ${this.playerSign} `
          );
        }

        if (this.checkWinner()) {
          if (this.values[arrs] == this.firstPlayerText) {
            this.WonOrDraw = `${this.firstPlayerName} WON!`;
          } else {
            console.log('Second player won');
            this.WonOrDraw = `${this.secondPlayerName} WON!`;
          }
        } else {
          if (this.count == 9)
            this.WonOrDraw = `Neither ${this.firstPlayerName} OR ${this.secondPlayerName} WON.... It was a TIE!`;
        }
      }
    } else {
      if (this.clickedArrs[arrs] == undefined) {
        if (!this.checkWinner()) {
          this.clickedArrs[arrs] = true;
          this.values[arrs] = 'X';
          this.count++;
          this.displayWinner(this.vspcplayer, 'CPU', 'X');
          console.log(arrs, 'aaaaaaaaaaaaaa');
          document.getElementById(arrs).innerHTML = 'X';
          this.gamelogs.push(
            `${this.count}.${this.vspcplayer} clicked ${arrs} and added X `
          );

          if (!this.checkWinner() && this.count < 9) {
            let index = this.vspcarray.indexOf(arrs);
            this.vspcarray.splice(index, 1);
            let pcturn = this.random_item(this.vspcarray);
            let pcindex = this.vspcarray.indexOf(pcturn);
            document.getElementById(pcturn).innerHTML = 'O';
            this.vspcarray.splice(pcindex, 1);
            this.clickedArrs[pcturn] = true;
            this.values[pcturn] = 'O';
            this.count++;
            this.displayWinner(this.vspcplayer, 'CPU', 'O');
            this.gamelogs.push(
              `${this.count}.CPU ramdomized ${pcturn} and added O `
            );
          }
        }
      
    }
  }
}
  displayWinner(first, second, kind) {
    if (this.checkWinner()) {
      console.log('futet');
      console.log(kind);

      if (kind === 'X') {
        this.WonOrDraw = `${first} WON!`;
      } else {
        this.WonOrDraw = `CPU WON!`;
      }
    } else {
      if (this.count == 9)
        this.WonOrDraw = `Neither ${first} NOR CPU WON.... It was a TIE!`;
    }
  }
  random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  addPlayers(firstplayer, secondplayer) {
    console.log(firstplayer, secondplayer);
    this.firstPlayerName = firstplayer;
    this.secondPlayerName = secondplayer;
    this.playervsplayerTableAfterInput = true;
    this.playervsplayer = false;
  }

  addPlayerPc(player) {
    this.vspcplayer = player;
    this.playervsplayerTableAfterInput = true;
  }

  checkWinner() {
    //console.log(this.values[arrs], "vlera e njishit")
    if (
      this.values[1] == this.values[2] &&
      this.values[2] === this.values[3] &&
      this.values[2] != undefined
    ) {
      return true;
    }
    if (
      this.values[4] == this.values[5] &&
      this.values[5] === this.values[6] &&
      this.values[5] != undefined
    ) {
      return true;
    }
    if (
      this.values[7] == this.values[8] &&
      this.values[8] === this.values[9] &&
      this.values[8] != undefined
    ) {
      return true;
    }
    if (
      this.values[1] == this.values[4] &&
      this.values[4] === this.values[7] &&
      this.values[4] != undefined
    ) {
      return true;
    }
    if (
      this.values[2] == this.values[5] &&
      this.values[5] === this.values[8] &&
      this.values[5] != undefined
    ) {
      return true;
    }
    if (
      this.values[3] == this.values[6] &&
      this.values[6] === this.values[9] &&
      this.values[6] != undefined
    ) {
      return true;
    }
    if (
      this.values[1] == this.values[5] &&
      this.values[5] === this.values[9] &&
      this.values[5] != undefined
    ) {
      return true;
    }
    if (
      this.values[3] == this.values[5] &&
      this.values[5] === this.values[7] &&
      this.values[5] != undefined
    ) {
      return true;
    }
  }

  PlayerSignByPlayer() {
    if (this.firstplayercondition) {
      this.playerSign = 'X';
      this.currentPlayer = this.firstPlayerName;
      this.firstplayercondition = !this.firstplayercondition;
    } else {
      this.playerSign = 'O';
      this.firstplayercondition = !this.firstplayercondition;
      this.currentPlayer = this.secondPlayerName;
    }
  }

  changeTextBasedOnSelected(clickedIndex) {
    this.PlayerSignByPlayer();
    document.getElementById(clickedIndex).innerHTML = this.playerSign;
  }

  populateArray() {
    for (let x = 1; x <= 9; x++) {
      this.arr.push(x);
      this.vspcarray.push(x);
    }
  }

  title = 'TicTacToe';
}

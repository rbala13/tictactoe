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
    //constructor to call 2 forms (player vs cpu && player vs player)
    this.createForm = this.fb.group({
      firstplayer: '',
      secondplayer: '',
    });
    this.vspcForm = this.fb.group({
      player: '',
    });
  }

  playervspc = false; //check the button status mode
  playervsplayer = false; //check the button status mode
  buttonClicked = false; //if the button is pressed
  playerpsplayerlogs = false;
  playerVsPcText = 'Player vs PC'; //variable for the mode to the html display
  playerVsPlayerText = 'Player vs Player'; //variable for the mode to the html display
  firstPlayerName; //save the name of the first user
  secondPlayerName; //save the name of the second user
  currentPlayer; //check which player is inputing
  selectedText; //print which mode is choosen
  arr = []; //insert all the values to be then used as ids for game squares
  firstPlayerText = 'X'; // first player
  secondPlayerText = 'O'; //second player
  firstplayercondition = true; //check if its the first player turn
  clickedArrs: any[] = []; //the squares that are currently clicked
  values = []; //value of the squares
  playerSign = ''; //set the sign to empty for further use --- set the sign based on player
  count = 0; // check count
  WonOrDraw; //display the result of the game
  playervsplayerTableAfterInput = false; //flag to display tic tac table
  gamelogs = []; //logs of the game
  vspcplayer = ''; //set the player to empty on vs PC mode
  vcpcplayerturn = true; // flag to check the turn on vs PC mode
  vspcarray: any[] = []; // array to check the occupied squares on vs PC mode
  pcorpvpv = true; //check which mode is active

  onplayervspcClick() {
    // configure tic tac toe for Player vs Pc mode
    this.playervspc = true;
    this.selectedText = this.playerVsPcText;
    this.buttonClicked = true;
    this.playerpsplayerlogs = false;
    this.pcorpvpv = false;
  }

  playervsplayerClick() {
    // configure tic tac toe for Player vs Player mode
    this.playervsplayer = true;
    this.selectedText = this.playerVsPlayerText;
    this.buttonClicked = true;
    this.playerpsplayerlogs = true;
    this.pcorpvpv;
  }
  ngOnInit() {
    this.populateArray();
    console.log(this.arr, 'array');
  }

  TabClicked(arrs) {
    //if the table is pressed
    if (this.pcorpvpv) {
      //the mode choosen
      if (!this.checkWinner()) {
        //if the game isnt over
        if (this.clickedArrs[arrs] == undefined) {
          //if the box is not occupied

          this.clickedArrs[arrs] = true; //the box is occupied
          this.count++; //one move
          this.changeTextBasedOnSelected(arrs);
          this.values[arrs] = this.playerSign; //the sign value of the player clicking

          this.gamelogs.push(
            //the log of the move
            `${this.count}.${this.currentPlayer} clicked ${arrs} and added ${this.playerSign} `
          );
        }

        if (this.checkWinner()) {
          // check if we have a winner or if it's a tie
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
      //if the mode choosen is player vs pc
      if (this.clickedArrs[arrs] == undefined) {
        //user can not click on an occupied box
        if (!this.checkWinner()) {
          //input values until the game is over
          this.clickedArrs[arrs] = true; //user clicked on a box
          this.values[arrs] = 'X'; //the value of the box is X
          this.count++; //one move done
          this.displayWinner(this.vspcplayer, 'CPU', 'X'); //display winner if the game is over
          document.getElementById(arrs).innerHTML = 'X'; //display 'X' on html
          this.gamelogs.push(
            `${this.count}.${this.vspcplayer} clicked ${arrs} and added X ` //the log for the player move
          );

          if (!this.checkWinner() && this.count < 9) {
            //if we dont have a winner and all the boxes are not occupied
            let index = this.vspcarray.indexOf(arrs); //find the index of the box clicked by the user
            this.vspcarray.splice(index, 1); //remove the index of the box clicked by the user
            let pcturn = this.random_item(this.vspcarray); //get a random box cordinate for the pc
            let pcindex = this.vspcarray.indexOf(pcturn); //check the index of the box
            document.getElementById(pcturn).innerHTML = 'O'; //display 'O' on the html
            this.vspcarray.splice(pcindex, 1); //remove also the box choosen by the pc
            this.clickedArrs[pcturn] = true; //make the box choosen by the pc true
            this.values[pcturn] = 'O'; //also get the value of the pc
            this.count++; //one move done
            this.displayWinner(this.vspcplayer, 'CPU', 'O'); //display a winner if we have
            this.gamelogs.push(
              `${this.count}.CPU ramdomized ${pcturn} and added O ` //the log of the pc
            );
          }
        }
      }
    }
  }
  displayWinner(first, second, kind) {
    //function to check the winner on the person vs pc mode
    if (this.checkWinner()) {
      //console.log('in?');
      //console.log(kind);

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
    //get a random value from an array
    return items[Math.floor(Math.random() * items.length)];
  }

  addPlayers(firstplayer, secondplayer) {
    //get the players names on the pvp mode
    console.log(firstplayer, secondplayer);
    this.firstPlayerName = firstplayer;
    this.secondPlayerName = secondplayer;
    this.playervsplayerTableAfterInput = true;
    this.playervsplayer = false;
  }

  addPlayerPc(player) {
    //get the player name on the player vs pc mode
    this.vspcplayer = player;
    this.playervsplayerTableAfterInput = true;
  }

  checkWinner() {
    //function to check all the winning conditions

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
    //function to change players turns
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
    //function to fill the squares by 'X' || 'O' values
    this.PlayerSignByPlayer();
    document.getElementById(clickedIndex).innerHTML = this.playerSign;
  }

  populateArray() {
    //function to populate the arrays with all the box indexes
    for (let x = 1; x <= 9; x++) {
      this.arr.push(x);
      this.vspcarray.push(x);
    }
  }

  title = 'TicTacToe';
}

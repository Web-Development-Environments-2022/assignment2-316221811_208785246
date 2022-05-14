var context;
var shape = new Object();
var icecream = new Object();
var board;
var historyboard;
var score = 0;
var lives;
var start_time;
var time_elapsed;
var maxtime=60;
var interval;
var background;
var clock_time = 0;
var clockactive =false;
var dots;
var resumeIceCream =true;
var ghost1 = new Object();
var ghost2 = new Object();
var ghost3 = new Object();
var ghost4 = new Object();
var color1 =  "#873a8d";
var color2 =  "#873a8d";
var color3 =  "#873a8d";
var num_balls;
var num_dots = 0; // in order to calculate the end of the game
var pacmanPhoto = 'resources/pacman/right.png';
clock_is_activated = false;
medicine_is_activated = false;
var ghostsNum = 4;
var rowsNum = 10;
var colsNum = 20;
var dead = false;
var game_started = false;
//---default keys---
var upKey = 38;
var downKey = 40;
var leftKey = 37;
var rightKey = 39;
//---users data---
users = window.localStorage;
var user;
users.setItem("k","k");


function login(){
	user = document.getElementById("userNameText").value;
	var password =  document.getElementById("psw").value;
	if (user in users){
		if (password == users.getItem(user)){
			window.alert("hi " + user + ", nice to see you!");
			showSettingScreen();
		} 
		else{
			window.alert("wrong password");
		}
	}
	else{
		window.alert("not registered yet");
	}
}

function IsEmail(email) {
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!regex.test(email)) {
		return false;
	}
	return true;
}


$(document).ready(function () {
	$('.error').hide();
	$('#regButton').click(function () 
	{
		if(!$('#registerUserName').val() || !$('#registerPsw').val() || !$('#registerName').val() || !$('#registerEmail').val()){
			window.alert("please fill all the details");
		} 
		else{
			if (($('#registerPsw').val()).length < 6 || !/([0-9]+[a-zA-Z]+)|([a-zA-Z]+[0-9]+)$/.test($('#registerPsw').val())){
				window.alert("password should contain at least 6 characters (letters and numbers)");
			} 
			else{
				if (!/^[A-Za-z\s]*$/.test($('#registerName').val())){
					window.alert("invalid full name");
				} 
				else{
					if (IsEmail($('#registerEmail').val()) == false) {
						$('#invalid_email').show();
					} 
					else{
						$('#invalid_email').hide();
						// all details are correct, register the user
						var regUser = document.getElementById("registerUserName").value;
						var regPassword =  document.getElementById("registerPsw").value;
						if (regUser in users){
							window.alert("this user name is already taken");
						}
						else{
							users.setItem(regUser, regPassword);
							showLoginScreen();
							}
					}
				}
			}
		}
	});
	});


function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
  }

  function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function upButton(){
	addEventListener(
		"keydown",
		function(e) {
			upKey = e.keyCode;
			document.getElementById("up").value = String.fromCharCode(upKey);
		}, {once : true});
		
	}

function downButton(){
	addEventListener(
		"keydown",
		function(e) {
			downKey = e.keyCode;
			document.getElementById("down").value = String.fromCharCode(downKey);
		}, {once : true});
	}

function leftButton(){
	addEventListener(
		"keydown",
		function(e) {
			leftKey = e.keyCode;
			document.getElementById("left").value = String.fromCharCode(leftKey);
		}, {once : true});
	}	

function rightButton(){
	addEventListener(
		"keydown",
		function(e) {
			rightKey = e.keyCode;
			document.getElementById("right").value = String.fromCharCode(rightKey);
		}, {once : true});
	}

function randomChoose(){
	color1 = getRandomColor();
	color2 = getRandomColor();
	color3 = getRandomColor();
	ghostsNum = randomIntFromInterval(1, 4);
	num_balls = randomIntFromInterval(50, 90);
	maxTime = randomIntFromInterval(60, 120);
	//write chosen settings next to the game
	document.getElementById("ballsnumber").innerHTML=String(num_balls);
	document.getElementById("dot1").style.backgroundColor = color1;
	document.getElementById("dot2").style.backgroundColor = color2;
	document.getElementById("dot3").style.backgroundColor = color3;
	document.getElementById("up1").textContent = "^";
	document.getElementById("right1").textContent = ">";
	document.getElementById("left1").textContent = "<";
	document.getElementById("down1").textContent = "V";
	document.getElementById("ghostsnumber").innerHTML=String(ghostsNum);
	document.getElementById("gameseconds").innerHTML=String(maxTime); //TDOD GAME TIME
	showGameScreen()
	$(document).ready(function() {
		context = canvas.getContext("2d");
		Start();
	});	
}

function readyButton(){
	color1 = document.getElementById("firstColorPicker").value;
	color2 = document.getElementById("secondColorPicker").value;
	color3 = document.getElementById("thirdColorPicker").value;
	num_balls = document.getElementById("balls").value;
	ghostsNum = document.getElementById("numGhost").value;
	maxTime = document.getElementById("gameTime").value;
	//write chosen settings next to the game
	document.getElementById("ballsnumber").innerHTML=String(num_balls);
	document.getElementById("dot1").style.backgroundColor = color1;
	document.getElementById("dot2").style.backgroundColor = color2;
	document.getElementById("dot3").style.backgroundColor = color3;
	document.getElementById("up1").textContent = String.fromCharCode(upKey);
	document.getElementById("right1").textContent = String.fromCharCode(rightKey)
	document.getElementById("left1").textContent = String.fromCharCode(leftKey)
	document.getElementById("down1").textContent = String.fromCharCode(downKey)
	document.getElementById("ghostsnumber").innerHTML=String(ghostsNum);
	document.getElementById("gameseconds").innerHTML=String(maxTime); 
	showGameScreen()
	$(document).ready(function() {
		context = canvas.getContext("2d");
		Start();
	});
}

function againButton(){
	start_time=new Date();
	dots = num_dots;
	lives=5;
	score=0;
	dead=false;
	var modal = document.getElementById("gameover");
	modal.style.display = "none";
	var modal = document.getElementById("Winner");
	modal.style.display = "none";
	var modal = document.getElementById("Loser");
	modal.style.display = "none";
	showGameScreen();
	$(document).ready(function() {
		context = canvas.getContext("2d");
		Start();
	});
}

function startNewGame(){
	var modal = document.getElementById("gameover");
	modal.style.display = "none";
	var modal = document.getElementById("Winner");
	modal.style.display = "none";
	var modal = document.getElementById("Loser");
	modal.style.display = "none";
	stopGame();
	$(document).ready(function() {
		context = canvas.getContext("2d");
		Start();
	});
}

function Start() {
	start_time = new Date();
	num_dots = 0;
	clockactive = false;
	dead = false;
	play();
	game_started = true;
	pacmanPhoto = 'resources/pacman/right.png';
	ghost1.i = 0;
	ghost1.j = 0;
	ghost2.i = 0;
	ghost2.j = 9;
	ghost3.i = 19;
	ghost3.j = 0;
	ghost4.i = 19;
	ghost4.j = 9;
	ghost1.num = 7;
	ghost2.num = 8;
	ghost3.num = 9;
	ghost4.num = 10;
	icecream.i = 10;
	icecream.j = 5;
	board = new Array();
	historyboard = new Array();
	score = 0;
	lives = 5;
	var cnt = 200;
	var food_remain = 0.6*num_balls;
	var food_remain_color2 = 0.3*num_balls;
	var food_remain_color3 = 0.1*num_balls;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 20; i++) {
		board[i] = new Array();
		historyboard[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		// 4 is wall, 1 is dot, 2 is pacman, 0 is empty, 5 for ice cream, 6 for clock, 6.5 for medicine
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) || 
				(i == 15 && j == 9) ||
				(i == 13 && j == 8) ||
				(i == 12 && j == 4) ||
				(i == 10 && j == 2) ||
				(i == 8 && j == 3) ||
				(i == 6 && j == 6) ||
				(i == 6 && j == 2)
			)
			{
				board[i][j] = 4;
			}
			else if ( i == 10 && j == 5){ // create ice cream here
				board[i][j] = 5
			}
			else if ( i == 0 && j == 0) { // create ghost here
				board[i][j] = 7;}
			else if ( i == 0 && j == 9 && ghostsNum>1) { // create ghost here
				board[i][j] = 	8;}
			else if ( i == 19 && j == 0 && ghostsNum>2) { // create ghost here
				board[i][j] = 9;}
			else if ( i == 19 && j == 9 && ghostsNum>3) { // create ghost here
					board[i][j] = 10;} 
			else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					num_dots++;
					board[i][j] = 1;
				} 
				else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	//find future position for medicine and clock
	var clock_position = findRandomEmptyCell(board);
	board[clock_position[0]][clock_position[1]] = 6;
	var medicine_position = findRandomEmptyCell(board);
	board[medicine_position[0]][medicine_position[1]] = 6.5;

	//add points randomly
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
		num_dots++;
	}
	while (food_remain_color2 > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1.2;
		food_remain_color2--;
		num_dots++;
	}
	while (food_remain_color3 > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1.3;
		food_remain_color3--;
		num_dots++;
	}
	dots = num_dots;
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 100);
	interval1 = setInterval(UpdatePositionIceCream, 150);
	intervalghost1 = setInterval(UpdatePositionGhost1, 500);
	if (ghostsNum>1){
	intervalghost2 = setInterval(UpdatePositionGhost2, 500);}
	if (ghostsNum>2){
	intervalghost3 = setInterval(UpdatePositionGhost3, 500);}
	if (ghostsNum>3){
	intervalghost4 = setInterval(UpdatePositionGhost4, 500);}
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 19 + 1);
	var j = Math.floor(Math.random() * 19 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 19 + 1);
		j = Math.floor(Math.random() * 19 + 1);
	}
	return [i, j];
}




function GetKeyPressed() {
	if (keysDown[upKey]) {
		return 1;
	}
	if (keysDown[downKey]) {
		return 2;
	}
	if (keysDown[leftKey]) {
		return 3;
	}
	if (keysDown[rightKey]) {
		return 4;
	}
}

function play(){
	background = document.getElementById("audio");
	background.volume = 0.05;
    background.play();
}

function Draw() {
	canvas.width = canvas.width; //clean board
	context.fillStyle = "white"
	context.fillText("PLAYER: " + user,10,10,500)
	lblScore.value = score;
	lblLives.value = lives;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				//create pacman
				context.beginPath();
				var pacmanRight = new Image();
				pacmanRight.src = pacmanPhoto;
				context.drawImage(pacmanRight, center.x-30, center.y-30,40,40);
				context.fill();
			} else if (board[i][j] == 1) {
				// create dots
				context.beginPath();
				context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
				context.fillStyle = color1; //color
				context.fill();
				context.fillStyle = "white"
            	context.fillText('5', center.x-3, center.y+4);
			} else if (board[i][j] == 1.2) {
				// create dots
				context.beginPath();
				context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
				context.fillStyle = color2; //color
				context.fill();
				context.fillStyle = "white"
            	context.fillText('15', center.x-6, center.y+4);
			} else if (board[i][j] == 1.3) {
				// create dots
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = color3; //color
				context.fill();
				context.fillStyle = "white"
            	context.fillText('25', center.x-6, center.y+4);
			} else if (board[i][j] == 4) { 
				// create wall
				context.beginPath();
				var wall = new Image();
				wall.src = 'resources/wall/wall2.jpg';
				context.drawImage(wall, center.x-30, center.y-30,60,60);
				context.fill();
			} else if (board[i][j] == 5) {
				//create ice cream
				context.beginPath();
				var img = new Image();
				img.src = 'resources/prizes/ice_cream2.jpg';
				context.drawImage(img, center.x-30, center.y-30,70,60);
				context.fill();
			} else if (board[i][j] == 6 && clock_is_activated){
				//create clock
				context.beginPath();
				var img = new Image();
				img.src = 'resources/prizes/clock_gif.gif';
				context.drawImage(img, center.x-30, center.y-30,70,60);
				context.fill();
			} else if (board[i][j] == 6.5 && medicine_is_activated){
				//create clock
				context.beginPath();
				var img = new Image();
				img.src = 'resources/prizes/med2.png';
				context.drawImage(img, center.x-30, center.y-30,70,60);
				context.fill();
			}
			else if (board[i][j] == 7) {
				//create ghost1
				context.beginPath();
				var img = new Image();
				img.src = 'resources/ghosts/c.jpeg';
				context.drawImage(img, center.x-30, center.y-30,50,50);
				context.fill();
			}
			else if (board[i][j] == 8) {
				//create ghost2
				context.beginPath();
				var img = new Image();
				img.src = 'resources/ghosts/bl.png';
				context.drawImage(img, center.x-30, center.y-30,50,50);
				context.fill();
			}
			else if (board[i][j] == 9) {
				//create ghost3
				context.beginPath();
				var img = new Image();
				img.src = 'resources/ghosts/or.png';
				context.drawImage(img, center.x-30, center.y-30,50,50);
				context.fill();
			}
			else if (board[i][j] == 10) {
				//create ghost4
				context.beginPath();
				var img = new Image();
				img.src = 'resources/ghosts/pu.png';
				context.drawImage(img, center.x-30, center.y-30,50,50);
				context.fill();
			}
		}
	}
}

function drawPacman(direction){

	if (direction == 1){
		pacmanPhoto = 'resources/pacman/right.png';
	}
	else if (direction == 2){
		pacmanPhoto = 'resources/pacman/left.png';
	}
	else if (direction == 3){
		pacmanPhoto = 'resources/pacman/up.png';
	}
	else{
		pacmanPhoto = 'resources/pacman/down.png';
	}
}

function findEmptyNeighbor(i,j){
	var options = [];
	if(j>0 && availableCell(i,j-1)){
		options.push(1);
	}
	if(j<9 && availableCell(i,j+1)){
		options.push(2);
	}
	if(i>0 && availableCell(i-1,j)){
		options.push(3);
	}
	if(i<19 && availableCell(i+1,j)){
		options.push(4);
	}
	var rand = randomIntFromInterval(0,options.length);
	return(options[rand]);

	
}
function availableCell(i,j){
	if(board[i,j]!=4 && board[i,j]!=2){
		return true;
	}
	return false;
}


function UpdatePositionIceCream() {			
	//var x=1;
	if (!dead){

		var x = findEmptyNeighbor(icecream.i,icecream.j);
		if (x == 1) {		
			if (icecream.j > 0 && board[icecream.i][icecream.j - 1] != 4 && board[icecream.i][icecream.j - 1] != 7 && board[icecream.i][icecream.j - 1] != 8 && board[icecream.i][icecream.j - 1] != 9 && board[icecream.i][icecream.j - 1] != 10) {
				board[icecream.i][icecream.j] = historyboard[icecream.i][icecream.j];
				icecream.j--;			
			}
		}
		else if (x == 2) {
			if (icecream.j < 9 && board[icecream.i][icecream.j + 1] != 4  && board[icecream.i][icecream.j + 1] != 7 && board[icecream.i][icecream.j + 1] != 8  && board[icecream.i][icecream.j + 1] != 9 && board[icecream.i][icecream.j + 1] != 10) {
				board[icecream.i][icecream.j] = historyboard[icecream.i][icecream.j];
				icecream.j++;			
			}
		}
		else if (x == 3) {
			if (icecream.i > 0 && board[icecream.i - 1][icecream.j] != 4  && board[icecream.i-1][icecream.j] != 7 && board[icecream.i-1][icecream.j ] != 8  && board[icecream.i-1][icecream.j] != 9 && board[icecream.i-1][icecream.j] != 10) {
				board[icecream.i][icecream.j] = historyboard[icecream.i][icecream.j];
				icecream.i--;
			}
		}
		else if(x==4){
			if (icecream.i < 19 && board[icecream.i + 1][icecream.j] != 4  && board[icecream.i+1][icecream.j] != 7 && board[icecream.i+1][icecream.j] != 8 && board[icecream.i+1][icecream.j] != 9 && board[icecream.i+1][icecream.j] != 10) {		
				board[icecream.i][icecream.j] = historyboard[icecream.i][icecream.j];
				icecream.i++;
			}
		}
		if (board[icecream.i][icecream.j]==2){
			window.clearInterval(interval1);
			score+=50;
			var cherry = new Audio('resources/sounds/Fruit.mp3');
			cherry.volume=0.3;
			cherry.play();
			board[icecream.i][icecream.j]=2
			canvas.style.backgroundColor = 'pink';
			Draw();
			setTimeout(function(){canvas.style.backgroundColor = 'black';}, 2000);
			
			

		}
		else{
			if(board[icecream.i][icecream.j]==1){
				historyboard[icecream.i][icecream.j]=1;}
			else if(board[icecream.i][icecream.j]==0){
				historyboard[icecream.i][icecream.j]=0;
			}
			else if(board[icecream.i][icecream.j]==1.2){
				historyboard[icecream.i][icecream.j]=1.2;
			}
			else if(board[icecream.i][icecream.j]==1.3){
				historyboard[icecream.i][icecream.j]=1.3;
			}
			else if(board[icecream.i][icecream.j]==6){
				historyboard[icecream.i][icecream.j]=6;
			}
			else if(board[icecream.i][icecream.j]==6.5){
				historyboard[icecream.i][icecream.j]=6.5;
			}
			board[icecream.i][icecream.j] = 5;
		}
	}
	Draw();
	}
	

	function clearCell(i,j){
		if(board[i][j]!=4 && board[i][j]!=5 && board[i][j]!=7 && board[i][j]!=8 && board[i][j]!=9 && board[i][j]!=10 && historyboard[i][j]!=7 && historyboard[i][j]!=8 && historyboard[i][j]!=9 && historyboard[i][j]!=10){
			return(true)
		}
		return (false)

	}


	function UpdatePositionGhost1() {
		UpdatePositionGhost(ghost1)		
	}
	function UpdatePositionGhost2() {
		UpdatePositionGhost(ghost2)		
	}
	function UpdatePositionGhost3() {
		UpdatePositionGhost(ghost3)		
	}
	function UpdatePositionGhost4() {
		UpdatePositionGhost(ghost4)		
	}
	
	
		

function UpdatePositionGhost(ghost){
	if (!dead){
			if (ghost.i >0 && ghost.i> shape.i && clearCell(ghost.i-1,ghost.j)){
				board[ghost.i][ghost.j] = historyboard[ghost.i][ghost.j];
				ghost.i--;
			}
			else if (ghost.i <19 && ghost.i< shape.i && clearCell(ghost.i+1,ghost.j)){
				board[ghost.i][ghost.j] = historyboard[ghost.i][ghost.j];
				ghost.i++;
			}
			else if (ghost.j <9 && ghost.j< shape.j && clearCell(ghost.i,ghost.j+1)){
				board[ghost.i][ghost.j] = historyboard[ghost.i][ghost.j];
				ghost.j++;
			}
			else if (ghost.j >0 && ghost.j> shape.j && clearCell(ghost.i,ghost.j-1)){
				board[ghost.i][ghost.j] = historyboard[ghost.i][ghost.j];
				ghost.j--;
			}
			else if (ghost.j >0 && clearCell(ghost.i,ghost.j-1)){
				board[ghost.i][ghost.j] = historyboard[ghost.i][ghost.j];
				ghost.j--;
			}
			
			else if (ghost.i <19 && clearCell(ghost.i+1,ghost.j)){
				board[ghost.i][ghost.j] = historyboard[ghost.i][ghost.j];
				ghost.i++;
			}
			else if ( ghost.j <9 && clearCell(ghost.i,ghost.j+1)){
				board[ghost.i][ghost.j] = historyboard[ghost.i][ghost.j];
				ghost.j++;
			}
			else if ( ghost.i >0 && clearCell(ghost.i-1,ghost.j)){
				board[ghost.i][ghost.j] = historyboard[ghost.i][ghost.j];
				ghost.i--;
			}
	
	
	
		
		if (board[ghost.i][ghost.j]==2){
			pacmanPhoto = 'resources/pacman/deadPacman.png';
			var Death = new Audio('resources/sounds/Death.mp3');
			Death.volume=0.3;
			Death.play();
			lives=lives-1;
			score=score -10;
			dead = true;
			Draw();
			if (lives<=0){
				stopGame();
				showLoser();
			}			
			else{
				setTimeout(function(){startover();}, 2500);
			}
		}

		else if(time_elapsed>=maxTime){
				stopGame();
				showGameOver();
			}
		else if(maxTime-time_elapsed<=11 && clockactive==false){
			clockactive = true;
			clock = document.getElementById("clock");
			clock.volume = 1;
    		clock.play();
			}
		
		else{
			if(board[ghost.i][ghost.j]==1){
				historyboard[ghost.i][ghost.j]=1;}
			
			else if(board[ghost.i][ghost.j]==6){
				historyboard[ghost.i][ghost.j]=6;
			}
			else if(board[ghost.i][ghost.j]==6.5){
				historyboard[ghost.i][ghost.j]=6.5;
			}
			else if(board[ghost.i][ghost.j]==5){
				historyboard[ghost.i][ghost.j]=5;
			}
			else if(board[ghost.i][ghost.j]==1.2){
				historyboard[ghost.i][ghost.j]=1.2;
			}
			else if(board[ghost.i][ghost.j]==1.3){
				historyboard[ghost.i][ghost.j]=1.3;
			}
			else{
				historyboard[ghost.i][ghost.j]=0;
			}
			board[ghost.i][ghost.j] = ghost.num;
		}}
		Draw();
	
		}
		
function startover(){
	dead= false;
	board[ghost1.i][ghost1.j]= historyboard[ghost1.i][ghost1.j];
	board[ghost2.i][ghost2.j]= historyboard[ghost2.i][ghost2.j];
	board[ghost3.i][ghost3.j]= historyboard[ghost3.i][ghost3.j];
	board[ghost4.i][ghost4.j]= historyboard[ghost4.i][ghost4.j];
	ghost1.i = 0;
	ghost1.j = 0;
	ghost2.i = 0;
	ghost2.j = 9;
	ghost3.i = 19;
	ghost3.j = 0;
	ghost4.i = 19;
	ghost4.j = 9;
	ghost1.num = 7;
	ghost2.num = 8;
	ghost3.num = 9;
	ghost4.num = 10;
	var pacman_position = findRandomEmptyCell(board);
	board[shape.i][shape.j] = 0;
	shape.i = pacman_position[0];
	shape.j = pacman_position[1];
	board[shape.i][shape.j] = 2;
	pacmanPhoto = 'resources/pacman/right.png';
	Draw();
	}

function stopGame(){
	window.clearInterval(interval);
	window.clearInterval(interval1);
	window.clearInterval(intervalghost1);
	if(ghostsNum>1){
		window.clearInterval(intervalghost2);
		if(ghostsNum>2){	
			window.clearInterval(intervalghost3);
			if(ghostsNum>3){
				window.clearInterval(intervalghost4);}}}
	background.pause();
	background.currentTime = 0;
}

function UpdatePosition() {
	if (!dead){
		board[shape.i][shape.j] = 0;
		var x = GetKeyPressed();
		if (x == 1) {
			if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
				shape.j--;
				drawPacman(3)
			}
		}
		if (x == 2) {
			if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
				shape.j++;
				drawPacman(4)
			}
		}
		if (x == 3) {
			if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
				shape.i--;
				drawPacman(2)
			}
		}
		if (x == 4) {
			if (shape.i < 19 && board[shape.i + 1][shape.j] != 4) {
				shape.i++;
				drawPacman(1)
			}
		}
		if (board[shape.i][shape.j] == 7 || board[shape.i][shape.j] == 8 || board[shape.i][shape.j] == 9 || board[shape.i][shape.j] == 10) { 
			pacmanPhoto = 'resources/pacman/deadPacman.png';
			var Death = new Audio('resources/sounds/Death.mp3');
			Death.volume=0.3;
			Death.play();
			lives=lives-1;
			score=score -10;
			dead = true;
			if (historyboard[shape.i][shape.j]==1||historyboard[shape.i][shape.j]==1.2||historyboard[shape.i][shape.j]==1.3){
				dots--;
			}
			Draw();
			if (lives<=0){
				stopGame();
				showLoser();
			}
			else{
				setTimeout(function(){startover();}, 2500);
			}
		}
		if (board[shape.i][shape.j] == 1) { // recieved regular point
			var chomp = new Audio('resources/sounds/Chomp.mp3');
			chomp.volume=0.3;
			dots--;
			historyboard[shape.i][shape.j] = 0;
			chomp.play();
			score+=5;
		}
		if (board[shape.i][shape.j] == 1.2) { // recieved medium point
			var chomp = new Audio('resources/sounds/Chomp.mp3');
			chomp.volume=0.3;
			dots--;
			historyboard[shape.i][shape.j] = 0;
			chomp.play();
			score+=15;
		}
		if (board[shape.i][shape.j] == 1.3) { // recieved the big point
			var chomp = new Audio('resources/sounds/Chomp.mp3');
			chomp.volume=0.3;
			dots--;
			historyboard[shape.i][shape.j] = 0;
			chomp.play();
			score+=25;
		}
		if(dots<=0){
			stopGame();
			showWinner();
		}
		if (board[shape.i][shape.j] == 5) { // recieved ice cream
			var cherry = new Audio('resources/sounds/Fruit.mp3');
			cherry.volume=0.3;
			cherry.play();
			board[shape.i][shape.j]=2
			canvas.style.backgroundColor = 'pink';
			Draw();
			setTimeout(function(){canvas.style.backgroundColor = 'black';}, 2000);
			if (historyboard[shape.i][shape.j] == 1 || historyboard[shape.i][shape.j] == 1.2 || historyboard[shape.i][shape.j] == 1.3){
				dots--;
			}
			window.clearInterval(interval1);
			score += 50;
			

		}
		var currentTime = new Date();
		time_elapsed = (currentTime - start_time + 1000*clock_time) / 1000;


		if (board[shape.i][shape.j] == 6 && clock_is_activated){
			clock_time = -10
			clock_is_activated = false;	
			var cherry = new Audio('resources/sounds/button-3.mp3');
			cherry.volume=0.3;
			cherry.play();
			clock = document.getElementById("clock");
			clockactive=false;
    		clock.pause();
			canvas.style.backgroundColor = 'lightblue';
			Draw();
			setTimeout(function(){canvas.style.backgroundColor = 'black';}, 2000);



				
		}
		if (board[shape.i][shape.j] == 6.5 && medicine_is_activated){
			lives++;
			medicine_is_activated = false;
			var cherry = new Audio('resources/sounds/button-3.mp3');
			cherry.volume=0.3;
			cherry.play();	
		}

		board[shape.i][shape.j] = 2;

		if (time_elapsed > 15){
			clock_is_activated = true;
		}
		if (time_elapsed > 5){
			medicine_is_activated = true;
		}



		Draw();
		
	}
	Draw();
}


// functions that hide all screens & then show a specific screen
// these functions also update navigation menu to highlight active screen
function showSettingScreen() {
	var modal = document.getElementById("gameover");
	modal.style.display = "none";
	var modal = document.getElementById("Winner");
	modal.style.display = "none";
	var modal = document.getElementById("Loser");
	modal.style.display = "none";
	if (user!=null){
		(document.getElementById("settings")).style.display = "block";
	}
	var cherry = new Audio('resources/sounds/Fruit.mp3');
	cherry.volume=0.3;
	cherry.play();
	$(".screen").hide();
	$("#settingsScreen").show();
	$(".menu").removeClass("active");
	$(".menu").eq(4).addClass("active");
	if (game_started){
		stopGame();
	} 
  }
  function showWelcomeScreen() {
	var modal = document.getElementById("gameover");
	modal.style.display = "none";
	var modal = document.getElementById("Winner");
	modal.style.display = "none";
	var modal = document.getElementById("Loser");
	modal.style.display = "none";
	var cherry = new Audio('resources/sounds/Fruit.mp3');
	cherry.volume=0.3;
	cherry.play();
	$(".screen").hide();
	$("#welcomeScreen").show();
	$(".menu").removeClass("active");
	$(".menu").eq(1).addClass("active");
	if (game_started){
		stopGame();
	} 
  }
  function showRegisterScreen() {
	var modal = document.getElementById("gameover");
	modal.style.display = "none";
	var modal = document.getElementById("Winner");
	modal.style.display = "none";
	var modal = document.getElementById("Loser");
	modal.style.display = "none";
	var cherry = new Audio('resources/sounds/Fruit.mp3');
	cherry.volume=0.3;
	cherry.play();
	$(".screen").hide();
	$("#registerScreen").show();
	$(".menu").removeClass("active");
	$(".menu").eq(2).addClass("active");
	if (game_started){
		stopGame();
	} 
  }


  function showGameScreen() {
	var modal = document.getElementById("gameover");
	modal.style.display = "none";
	var modal = document.getElementById("Winner");
	modal.style.display = "none";
	var modal = document.getElementById("Loser");
	modal.style.display = "none";
	var cherry = new Audio('resources/sounds/Fruit.mp3');
	cherry.volume=0.3;
	cherry.play();
	$(".screen").hide();
	$("#game").show();
	$(".menu").removeClass("active");
  }

  function showLoginScreen() { 
	var modal = document.getElementById("gameover");
	modal.style.display = "none";
	var modal = document.getElementById("Winner");
	modal.style.display = "none";
	var modal = document.getElementById("Loser");
	modal.style.display = "none";
	var cherry = new Audio('resources/sounds/Fruit.mp3');
	cherry.volume=0.3;
	cherry.play();
	$(".screen").hide();
	$("#loginScreen").show();
	$(".menu").removeClass("active");
	$(".menu").eq(3).addClass("active");
	if (game_started){
		stopGame();
	} 
  }

  function showAbout(){
	var modal = document.getElementById("gameover");
	modal.style.display = "none";
	var modal = document.getElementById("Winner");
	modal.style.display = "none";
	var modal = document.getElementById("Loser");
	modal.style.display = "none";
	// Get the modal
	var modal = document.getElementById("myModal");

	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal
	btn.onclick = function() {
	modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	modal.style.display = "none";
	}
	
	document.addEventListener('keydown', function(event){
		if(event.key === "Escape"){
			modal.style.display = "none"
		}
	});

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
	}		
}
function showGameOver(){
	// Get the modal
	clock = document.getElementById("clock");
    		clock.pause();
	background = document.getElementById("timeEnded");
	background.volume = 0.5;
    background.play();
	document.getElementById("scoreStr").innerHTML=String(score);
	var modal1 = document.getElementById("gameover");

	//Get the <span> element that closes the modal
	var span1 = document.getElementsByClassName("close1")[1];

	// When the user clicks on the button, open the modal

	modal1.style.display = "block";

	// When the user clicks on <span> (x), close the modal
	span1.onclick = function() {
	modal1.style.display = "none";
	}
	
	document.addEventListener('keydown', function(event){
		if(event.key === "Escape"){
			modal1.style.display = "none"
		}
	});


	
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		modal1.style.display = "none";
	}
			
}


	
function showLoser(){
	// Get the modal
	clock = document.getElementById("clock");
    clock.pause();
	document.getElementById("scoreStr1").innerHTML=String(score);
	var modal1 = document.getElementById("Loser");

	//Get the <span> element that closes the modal
	var span2 = document.getElementsByClassName("close1")[0];
	background = document.getElementById("loose");
	background.volume = 0.5;
    background.play();
	// When the user clicks on the button, open the modal

	modal1.style.display = "block";
	

	// When the user clicks on <span> (x), close the modal
	span2.onclick = function() {
	modal1.style.display = "none";
	}
	
	document.addEventListener('keydown', function(event){
		if(event.key === "Escape"){
			modal1.style.display = "none"
		}
	});
	
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		modal1.style.display = "none";
	}
			
}

function showWinner(){
	// Get the modal
	clock = document.getElementById("clock");
			clock.volume = 0.05;
    		clock.pause();
	
	document.getElementById("scoreStr2").innerHTML=String(score);
	var modal1 = document.getElementById("Winner");

	//Get the <span> element that closes the modal
	var span1 = document.getElementsByClassName("close1")[2];

	// open the modal

	modal1.style.display = "block";
	background = document.getElementById("win");
	background.volume = 0.5;
    background.play();

	// When the user clicks on <span> (x), close the modal
	span1.onclick = function() {
	modal1.style.display = "none";
	}
	
	document.addEventListener('keydown', function(event){
		if(event.key === "Escape"){
			modal1.style.display = "none"
		}
	});
	
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		modal1.style.display = "none";
	}
	}		

var context;
var shape = new Object();
var icecream = new Object();
var board;
var historyboard;
var score;
var lives;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var clock_time = 0;
var resumeIceCream =true;
clock_is_activated = false;


$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

function Start() {
	icecream.i = 5;
	icecream.j = 5;
	board = new Array();
	historyboard = new Array();
	score = 0;
	lives = 5;
	pac_color = "purple";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		historyboard[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		// 4 is wall, 1 is dot, 2 is pacman, 0 is empty, 5 for ice cream, 6 for bad clock
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			)
			{
				board[i][j] = 4;
			}
			else if ( i == 5 && j == 5){ // create ice cream here
				board[i][j] = 5
			} 
			else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1; 
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
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
	var clock_position = findRandomEmptyCell(board);
	board[clock_position[0]][clock_position[1]] = 6;
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
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
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}




function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function play(){
	var audio = document.getElementById("audio");
    audio.play();
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblLives.value = lives;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				//create pacman
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				//create pacman eye
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle 
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				// create dots
				context.beginPath();
				context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
				context.fillStyle = "white"; //color
				context.fill();
			} else if (board[i][j] == 4) { 
				// create wall
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			} else if (board[i][j] == 5) {
				//create ice cream
				context.beginPath();
				var img = new Image();
				img.src = 'ice_cream2.jpg';
				context.drawImage(img, center.x-30, center.y-30,70,60);
				//var video = document.createElement("video");
				//video.src = 'clock.mp4';
				//video.autoplay = true;
				//context.drawImage(video, center.x-30, center.y-30);
				context.fill();

			} else if (board[i][j] == 6 && clock_is_activated){
				//create clock
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "yellow"; //color
				context.fill();
			}
		}
	}
}


function findEmptyNeighbor(i,j){
	var options = [];
	if(j>0 && availableCell(i,j-1)){
		options.push(1);
	}
	if(j+1<9 && availableCell(i,j+1)){
		options.push(2);
	}
	if(i>0 && availableCell(i-1,j)){
		options.push(3);
	}
	if(i+1<9 && availableCell(i+1,j)){
		options.push(4);
	}
	var rand = Math.floor(Math.random()*options.length);
	//return(1)
	return(options[rand]);

	
}
function availableCell(i,j){
	if(board[i,j]!=4){
		return true;
	}
	return false;
}



function UpdatePositionIceCream() {

	
		
	//var x=1;
	var x = findEmptyNeighbor(icecream.i,icecream.j);
	if (x == 1) {
		
		if (icecream.j > 0 && board[icecream.i][icecream.j - 1] != 4) {
			board[icecream.i][icecream.j] = historyboard[icecream.i][icecream.j];
			icecream.j--;


			
		}
	}
	else if (x == 2) {
		if (icecream.j < 9 && board[icecream.i][icecream.j + 1] != 4) {
			board[icecream.i][icecream.j] = historyboard[icecream.i][icecream.j];
			icecream.j++;
			
			

		}
	}
	else if (x == 3) {
		if (icecream.i > 0 && board[icecream.i - 1][icecream.j] != 4) {
			board[icecream.i][icecream.j] = historyboard[icecream.i][icecream.j];
			icecream.i--;
			
			
			
			
		}
	}
	else if (icecream.i < 9 && board[icecream.i + 1][icecream.j] != 4) {
			
			board[icecream.i][icecream.j] = historyboard[icecream.i][icecream.j];
			icecream.i++;
			
			
				
		
		}
	if (board[icecream.i][icecream.j]==2){
		window.clearInterval(interval1);
		board[icecream.i][icecream.j]=2

	
	}
	else{
		if(board[icecream.i][icecream.j]==1){
			historyboard[icecream.i][icecream.j]=1;}
		else if(board[icecream.i][icecream.j]==0){
			historyboard[icecream.i][icecream.j]=0;
		}
		board[icecream.i][icecream.j] = 5;
	}
	draw();

	}
	




function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) { // recieved regular point
		score++;
	}
	if (board[shape.i][shape.j] == 5) { // recieved ice cream
		board[shape.i][shape.j]=2
		
		window.clearInterval(interval1);
		score += 50;
	}
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time + 1000*clock_time) / 1000;

	if (board[shape.i][shape.j] == 6 && clock_is_activated){
		clock_time = -10
		clock_is_activated = false;		
	}
	board[shape.i][shape.j] = 2;

	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (time_elapsed > 15){
		clock_is_activated = true;
	}
	if (score == 500) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}

	function showWelcomeScreen(){
		
	}
	// about modal
	let modalBtn = document.getElementById("aboutModal")
	let modal = document.querySelector(".modal")
	let closeBtn = document.querySelector(".close-btn")
	modalBtn.onclick = function(){
  	modal.style.display = "block"
	}
	// exit options
	closeBtn.onclick = function(){
  	modal.style.display = "none"
	}
	document.addEventListener('keydown', function(event){
		if(event.key === "Escape"){
			modal.style.display = "none"
		}
	});
	window.onclick = function(e){
  	if(e.target == modal){
    modal.style.display = "none"
  	}
	}
}



$(document).ready(function(){
	initLetItSnow();
});


// ---------------------------------------------------------------------------------------------

/* Change Accoridngly... */
// total_surprise_gifts must be less than length of names_list
// < ---------------------------- > 
var names_list = ['Karan', 'Chanveer', 'Fabin', 'Saurabh', 'Indu', 'Anju', 'Khaja', 'Amruth', 'Tejas',
					'Ambedkar', 'Safwan', 'Rakesh', 'Anandamay', 'Hilam', 'Akhila', 'Anubha', 'Parul', 'Ashish', 'Nagaraj',
					'Manasvini', 'Sanjith', 'Siva', 'Ashutosh', 'Shilpa', 'Piyush']
var total_surprise_gifts = 4
// < ---------------------------- > 

var surprise_list = []
for(var i=1; i <= total_surprise_gifts; i++){
	surprise_list[i-1] = "S"+i.toString();
}
console.log(surprise_list);

var started = false;
var stopped_properly = false;
var ms;
var names_dict = {}
var numbers_dict = {}
var bumper_prize_executing = false;
var bumper_dict = {}
var bumper_numbers_dict = {}
var audio_started = false;

$('#result_modal').modal({ show: false})

// Utility Functions
function play_audio_1(){
	document.getElementById("my_audio").play();
	console.log("Audio 1 Played...!!!");
}
function stop_audio_1(){
	document.getElementById("my_audio").pause();
	document.getElementById("my_audio").src = "";
	console.log("Audio 1 Stopped...!!!");
}

function play_audio_2(){
	document.getElementById("my_audio_2").play();
	console.log("Audio 2 Played...!!!");
}
function stop_audio_2(){
	document.getElementById("my_audio_2").pause();
	document.getElementById("my_audio_2").src = "";
	console.log("Audio 2 Stopped...!!!");
}

function start_bumper_draw(){
	stop_audio_1();
	play_audio_2();
	bumper_prize_executing = true;
	document.getElementById('start_btn').innerHTML = 'Surprise Gift'
	names_dict = {}
	numbers_dict = {}
	document.getElementById("i_txt").innerHTML = '<span class="glyphicon glyphicon-user"></span>'
	document.getElementById("i_val").innerHTML = '<span class="glyphicon glyphicon-gift"></span>'
}
function draw_bumper_prize(){
	if (Object.keys(bumper_dict).length == total_surprise_gifts){
		var final_result_to_display = ''
		for (var name in bumper_dict){
 			 final_result_to_display += bumper_dict[name] + " -- " + name + "<br>"
		}
		document.getElementById('my_modal_result').innerHTML = final_result_to_display;
		console.log(bumper_dict)
		console.log(bumper_numbers_dict)
		$('#result_modal').modal('show');
		return
	}
	var len_name_dict = Object.keys(names_dict).length
	var len_name_list = names_list.length
	ms = 1;
	document.getElementById("start_btn").innerHTML = 'Assigning';
	started = true;
	console.log('Starting Displaying...')
	start_displaying();
	console.log('Started Displaying...')
	console.log('Calling Stop() after 15 Seconds...')
	setTimeout(stop_btn_click, 15000);
	document.getElementById("start_btn").disabled = true;
}

function fetch_random_name() {
	var random_index = ''
	var random_name = ''
	var random_bumper_list = surprise_list
	random_name = names_list[Math.floor(Math.random() *names_list.length)];
	if(bumper_prize_executing){
		random_bumper = random_bumper_list[Math.floor(Math.random() *random_bumper_list.length)]
		return [random_name, random_bumper];
	}
	else{
		random_index = Math.floor(Math.random() *names_list.length)
		return [random_name, (random_index+1).toString()];
	}
}

// My Functions
function fetch_final_bumper_name(){
	var bumper_dict_keys = Object.keys(bumper_dict)
	var bumper_number_dict_keys = Object.keys(bumper_numbers_dict)
	var number_list = surprise_list;

	var bumper_name_difference = names_list.filter(x => !bumper_dict_keys.includes(x));
	var bumper_number_difference = number_list.filter(x => !bumper_number_dict_keys.includes(x));

	var bumper_name_assigned = bumper_name_difference[Math.floor(Math.random() *bumper_name_difference.length)];
	var bumper_number_assigned = bumper_number_difference[Math.floor(Math.random() *bumper_number_difference.length)];

	bumper_dict[bumper_name_assigned] = bumper_number_assigned
	bumper_numbers_dict[bumper_number_assigned] = bumper_name_assigned
	console.log(bumper_dict)
	console.log(bumper_numbers_dict)
	return [bumper_name_assigned, bumper_number_assigned]
}

function fetch_final_name(){
	var name_dict_keys = Object.keys(names_dict)
	var number_dict_keys = Object.keys(numbers_dict)
	var number_list = [];
	for (var i = 1; i <= names_list.length; i++) {
		number_list.push(i.toString());
	}

	var name_difference = names_list.filter(x => !name_dict_keys.includes(x));
	var number_difference = number_list.filter(x => !number_dict_keys.includes(x));

	var name_assigned = name_difference[Math.floor(Math.random() *name_difference.length)];
	var number_assigned = number_difference[Math.floor(Math.random() *number_difference.length)];

	names_dict[name_assigned] = number_assigned
	numbers_dict[number_assigned] = name_assigned
	console.log(names_dict)
	console.log(numbers_dict)
	return [name_assigned, number_assigned]
}

function reveal(){
	if(!audio_started){
		play_audio_1();
		audio_started = true;
	}
	console.log("Inside Reveal...");
	var name_on_display = document.getElementById("i_txt").innerHTML;
	var tmp_dict;
	if(bumper_prize_executing){
		tmp_dict = bumper_dict
	}
	else{
		tmp_dict = names_dict
	}
	console.log("---->")
	console.log(tmp_dict)
	if(name_on_display in tmp_dict){
		console.log("Name on Display : %s", name_on_display)
		document.getElementById("i_val").innerHTML = tmp_dict[name_on_display]
		console.log("Number on Display : %s", tmp_dict[name_on_display])
		if(bumper_prize_executing){
			document.getElementById("start_btn").innerHTML = "Surprise Gift"
		}
		else{
			document.getElementById("start_btn").innerHTML = "Pick a Santee"	
		}
		document.getElementById("start_btn").disabled = false
	}
}

function start_btn_click(){
	if(!audio_started){
		play_audio_1();
		audio_started = true;
	}
	if(bumper_prize_executing){
		draw_bumper_prize();
		return
	}
	var len_name_dict = Object.keys(names_dict).length
	var len_name_list = names_list.length
	if (len_name_dict == len_name_list){
		var final_result_to_display = ''
		for (var number in numbers_dict){
 			 final_result_to_display += numbers_dict[number] + " -- " + number + "<br>"
		}
		document.getElementById('my_modal_result').innerHTML = final_result_to_display;
		console.log(names_dict)
		console.log(numbers_dict)
		$('#result_modal').modal('show');
		return
	}
	ms = 1;
	document.getElementById("start_btn").innerHTML = 'Assigning';
	started = true;
	console.log('Starting Displaying...')
	start_displaying();
	console.log('Started Displaying...')
	console.log('Calling Stop() after 7 Seconds...')
	setTimeout(stop_btn_click, 7000);
	document.getElementById("start_btn").disabled = true;
}
function start_displaying(){
	if (started){
		var values = ''
		var random_name = ''
		var random_number = ''
		values = fetch_random_name()
		random_name = values[0]
		random_number = values[1];
		document.getElementById("i_txt").innerHTML = random_name;
		document.getElementById("i_val").innerHTML = random_number;
		ms = ms * 1.1;
		// console.log('Calling after %s secondsss', ms)
		setTimeout(start_displaying, ms);
	}
	else{
		stopped_properly = true;
	}
}
function check_for_proper_termination(){
	if(stopped_properly){
		return
	}
	else{
		setTimeout(check_for_proper_termination, 100)
	}
}
function stop_btn_click(){
	console.log('Called Stop()')
	console.log('Waiting For Proper Termination...')
	var values = ''
	var final_name = ''
	var final_number = ''
	if (bumper_prize_executing){
		values = fetch_final_bumper_name();
	}
	else{
		values = fetch_final_name();
	}
	final_name = values[0]
	final_number = values[1]
	started = false;
	check_for_proper_termination()
	console.log('Program Stopped Properly...')
	console.log('Stopped');
	document.getElementById("i_txt").innerHTML = final_name;
	document.getElementById("i_val").innerHTML = '<img src="santa.png" class="santa_img">';
	console.log('Done...');
	if (bumper_prize_executing){
		document.getElementById("start_btn").innerHTML = 'Surprise Gift';
	}
	else{
		document.getElementById("start_btn").innerHTML = 'Pick a Santee';	
	}
}
// ---------------------------------------------------------------------------------------------




// Init Christmas! \o/
var initLetItSnow = function(){

	(function() {
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
		window.requestAnimationFrame = requestAnimationFrame;
	})();

	var flakes = [],
	canvas = document.getElementById("xmas"),
	ctx = canvas.getContext("2d"),
	mX = -100,
	mY = -100;

	if( $(window).width() < 999 ){
		var flakeCount = 125;
	} else {
		var flakeCount = 450;
	}

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	function snow() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (var i = 0; i < flakeCount; i++) {
			var flake = flakes[i],
			x = mX,
			y = mY,
			minDist = 250,
			x2 = flake.x,
			y2 = flake.y;

			var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
			dx = x2 - x,
			dy = y2 - y;

			if (dist < minDist) {
				var force = minDist / (dist * dist),
				xcomp = (x - x2) / dist,
				ycomp = (y - y2) / dist,
	                // deltaV = force / 2;
	                deltaV = force;

	                flake.velX -= deltaV * xcomp;
	                flake.velY -= deltaV * ycomp;

	            } else {
	            	flake.velX *= .98;
	            	if (flake.velY <= flake.speed) {
	            		flake.velY = flake.speed
	            	}
	            	flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
	            }

	            ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
	            flake.y += flake.velY;
	            flake.x += flake.velX;
	            
	            if (flake.y >= canvas.height || flake.y <= 0) {
	            	reset(flake);
	            }

	            if (flake.x >= canvas.width || flake.x <= 0) {
	            	reset(flake);
	            }

	            ctx.beginPath();
	            ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
	            ctx.fill();
	        }
	        requestAnimationFrame(snow);
	    };

	    function reset(flake) {
	    	flake.x = Math.floor(Math.random() * canvas.width);
	    	flake.y = 0;
	    	flake.size = (Math.random() * 3) + 2;
	    	flake.speed = (Math.random() * 1) + 0.5;
	    	flake.velY = flake.speed;
	    	flake.velX = 0;
	    	flake.opacity = (Math.random() * 0.5) + 0.3;
	    }

	    function init() {
	    	for (var i = 0; i < flakeCount; i++) {
	    		var x = Math.floor(Math.random() * canvas.width),
	    		y = Math.floor(Math.random() * canvas.height),
	    		size = (Math.random() * 3) + 4,
	    		speed = (Math.random() * 1) + 0.5,
	    		opacity = (Math.random() * 0.5) + 0.3;

	    		flakes.push({
	    			speed: speed,
	    			velY: speed,
	    			velX: 0,
	    			x: x,
	    			y: y,
	    			size: size,
	    			stepSize: (Math.random()) / 160,
	    			step: 0,
	    			opacity: opacity
	    		});
	    	}

	    	snow();
	    };

	    canvas.addEventListener("mousemove", function(e) {
	    	mX = e.clientX,
	    	mY = e.clientY
	    });

	    window.addEventListener("resize",function(){
	    	canvas.width = window.innerWidth;
	    	canvas.height = window.innerHeight;
	    })

	    init();
	};

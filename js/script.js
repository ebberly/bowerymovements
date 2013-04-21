//dimensions of currently loaded image
var imgHt;
var imgWd;

//log current image position
var zoomIndex;
var angleIndex;

//establish limits to image range
var maxZoom = 3;
var maxAngle = 4;

//boolean toggles for functions
var spinToggle = false;
var zoomToggle = false;

var refresh = false;

//spin speed for tweening frames
var spinSpeed = 150;

//limits for image heights by zoom level
var lev1ht = '1500px';
var lev2ht = '1500px';
var lev3ht = '2000px';

/////////INITIAL_LOAD/////////
$(document).ready(function(){
	console.log('document loaded');

	$('#marker').hide();

	imgHt = lev1ht;
	imgWd = $('#image img').width();

	//pull source file location from current image
	var src = $('#image img').attr('src');

	//index filename variables
	var index1 = src.indexOf('--')+2;
	var index2 = src.indexOf('__')+2;

	//parse filename variables
	var zoomIndex = parseInt(src.substr(index1,1));
	var angleIndex = parseInt(src.substr(index2,1));
	
	console.log ("zoom level: "+zoomIndex+" / angle: "+angleIndex);

	$('#overlay').load('svg/bm--'+zoomIndex+'__'+angleIndex+'.' + 'svg', function() {  
		//do something
	});
	console.log("svg loaded.");

	/////////SPIN_LEFT/////////
	$('#spin-left').on('click', function(){
		//alert('spinLeft called');
		console.log('spinLeft called');

		//stop Zooming while spin is in effect
		zoomToggle = false;

		//clear SVG to prevent selection while turning
		$('#overlay').empty();
		
		//pull source file location from current image
		var src = $('#image img').attr('src');

		//index filename variables
		var index1 = src.indexOf('--')+2;
		var index2 = src.indexOf('__')+2;

		//parse filename variables
		var zoomIndex = parseInt(src.substr(index1,1));
		var angleIndex = parseInt(src.substr(index2,1));
		
		console.log ("zoom level: "+zoomIndex+" / angle: "+angleIndex);

		//for values at the min
		if (angleIndex >= maxAngle) angleIndex = 1;

		//for all numbers above the min
		else if (angleIndex < maxAngle)angleIndex++;

		console.log ("zoom level: "+zoomIndex+" / angle: "+angleIndex);

		//set new source for next frame
		var srcNew = "img/bm--"+zoomIndex+"__"+angleIndex+".png";

		//load new image
		$('#image img').replaceWith('<img src='+srcNew+'>');
		
		//load new svg
		$('#overlay').load('svg/bm--'+zoomIndex+'__'+angleIndex+'.svg', function() {
			//run additional functions here
			refreshSVG();
		});

		console.log('svg '+zoomIndex+'/'+angleIndex+' loaded.');

		//re-enable zooming
		ZoomToggle = true;

		refresh = true;

	}); //end Spin Left

	/////////SPIN_RIGHT/////////
	$('#spin-right').on('click', function(){
		//alert('spinRight called');
		console.log('spinRight called');

		//stop Zooming while spin is in effect
		zoomToggle = false;

		//clear SVG to prevent selection while turning
		$('#overlay').empty();

		//pull source file location from current image
		var src = $('#image img').attr('src');

		//index filename variables
		var index1 = src.indexOf('--')+2;
		var index2 = src.indexOf('__')+2;

		//parse filename variables
		var zoomIndex = parseInt(src.substr(index1,1));
		var angleIndex = parseInt(src.substr(index2,1));
		
		console.log ("zoom level: "+zoomIndex+" / angle: "+angleIndex);
		
		//for values at the min
		if (angleIndex <= 1) angleIndex = maxAngle;

		//for all numbers above the min
		else if (angleIndex > 1)angleIndex--;

		console.log ("zoom level: "+zoomIndex+" / angle: "+angleIndex);

		//set new source for next frame
		var srcNew = "img/bm--"+zoomIndex+"__"+angleIndex+".png";

		//load new image
		$('#image img').replaceWith('<img src='+srcNew+'>');
		
		//load new svg
		$('#overlay').load('svg/bm--'+zoomIndex+'__'+angleIndex+'.svg', function() {
			//run additional functions here
			refreshSVG();
		});

		console.log('svg '+zoomIndex+'/'+angleIndex+' loaded.');

		//re-enable zooming
		ZoomToggle = true;

		refresh = true;

	}); //end Spin Right

	/////////ZOOM_IN/////////
	$('#zoom-in').on('click',function(){
		//alert('zoom-in called');
		spinToggle = false;

		//clear SVG to prevent selection while turning
		$('#overlay').empty();

		//pull source file location from current image
		var src = $('#image img').attr('src');

		//index filename variables
		var index1 = src.indexOf('--')+2;
		var index2 = src.indexOf('__')+2;

		//parse filename variables
		var zoomIndex = parseInt(src.substr(index1,1));
		var angleIndex = parseInt(src.substr(index2,1));
		
		console.log ("current zoom level: "+zoomIndex+" / angle: "+angleIndex);

		if (zoomIndex < maxZoom) zoomIndex++;
		else zoomIndex = maxZoom;

		var srcNew = "img/bm--"+zoomIndex+"__"+angleIndex+".png";

		//set image tag to new image
		$('#image img').replaceWith('<img src='+srcNew+'>');
		console.log('new img '+zoomIndex+'/'+angleIndex+' loaded.');

		//load new svg
		$('#overlay').load('svg/bm--'+zoomIndex+'__'+angleIndex+'.svg', function() {  
			console.log('svg '+zoomIndex+'/'+angleIndex+' loaded.');
		});

		//re-enable turning
		SpinToggle = true;

		refresh = true;
	});

	/////////ZOOM_OUT/////////
	$('#zoom-out').on('click',function(){
		//alert('zoom-out called');
		spinToggle = false;

		//clear SVG to prevent selection while turning
		$('#overlay').empty();

		//pull source file location from current image
		var src = $('#image img').attr('src');

		//index filename variables
		var index1 = src.indexOf('--')+2;
		var index2 = src.indexOf('__')+2;

		//parse filename variables
		var zoomIndex = parseInt(src.substr(index1,1));
		var angleIndex = parseInt(src.substr(index2,1));
		
		console.log ("zoom level: "+zoomIndex+" / angle: "+angleIndex);

		if (zoomIndex > 1) zoomIndex--;
		else zoomIndex = 1;

		var srcNew = "img/bm--"+zoomIndex+"__"+angleIndex+".png";

		//set image tag to new image
		$('#image img').replaceWith('<img src='+srcNew+'>');

		//load new svg
		$('#overlay').load('svg/bm--'+zoomIndex+'__'+angleIndex+'.svg', function() {  
			$('#overlay').attr('width',$('#image img').attr('width'));
			$('#overlay').attr('height',$('#image img').attr('height'));
		});

		console.log('svg '+zoomIndex+'/'+angleIndex+' loaded.');

		//re-enable turning
		SpinToggle = true;

		refresh = true;

		
	});

	$('#image').draggable();
});//end ready function

function refreshSVG(){
	console.log('refreshSVG()');
	/////////IMAGE_RELOAD/////////
	$('#image').on('load',function(){
		alert('image reload called');
		imgHt = $('#image img').height();
		imgWd = $('#image img').width();
		$('#image').css({
			width: imgWd,
			height: imgHt
		});
	});

	$('polygon').hover(function(){
		console.log('mouse enter');
		var $elem = $(this);
		var elemID = $elem.parents().attr('id');

		$('#marker').empty();
		$('#marker').append(elemID);
		console.log('hovering over: ' +elemID);
	}, function(){
		console.log('mouse leave from svg polygon');

		$('#marker').empty();
		$('#marker').append("nada");
	});
}

//--LOAD NEW ELEMENTS--//
$(window).on('load', refreshSVG);
	




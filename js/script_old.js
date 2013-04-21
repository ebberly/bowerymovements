$.fn.center = function (src) {
    this.css('position','fixed');
    this.css('top',50+'%');
    this.css('margin-top',$(src).height()/2 * -1 + 'px');
    this.css('left',50+'%');
	this.css('margin-left',$(src).width()/2 * -1 + 'px');

    return this;
}

$(document).ready(function(){
	console.log("document loaded.");

	//establish limits
	var MaxViews = 4;
	var MaxTween = 2;
	var MaxZoom = 3;

	//toggle behaviors
	var SpinToggle = true;
	var ZoomToggle = true;

	//current position logger
	var CurrentLoc = 1;
	var CurrentZoom = 1;

	//transition speed
	var SpinSpeed = 100;

	//variables for operating elements
	var $img = $('#image img');
	var $svg = $('#overlay');

	//variables for zoom image heights
	var lev1ht = "1500px";
	var lev2ht = "1500px";
	var lev3ht = "2000px";

	//center image
	//$('#image').attr('top','50%');
	//$('#image').attr('left','50%');
	//$('#image').attr('margin-top',toString(-1 * lev1ht/2)+'px');
	//$('#image').attr('margin-left',toString(-1 * $img.width()/2)+'px');
	//$('#image').css('width',$img.width()+'px');
	//$('#image').css('height',$img.height()+'px');
	//$('#image').center();

	$svg.load('svg/bm--1__1.' + 'svg', function() {  
		//do something
	});
	console.log("svg loaded.");

	//REFERENCE
	//image format - "bm--[zoom]__[angle]_-[tween].png"

	function spinLeft(){
		console.log ('spinLeft() called');

		//turn of tweening frames at max zoom level
		if (CurrentZoom > 1){
			SpinToggle = false;
		}else{
			SpinToggle = true;
		}

		//stop Zooming while spin is in effect
		ZoomToggle = false;

		//clear SVG to prevent selection while turning
		$svg.empty();

		//pull source file location from current image
		var src = $('#image img').attr('src');

		//index filename variables
		var index1 = src.indexOf('--')+2;
		var index2 = src.indexOf('__')+2;
		var index3 = src.indexOf('_-')+2;

		//parse filename variables
		var zoomIndex = parseInt(src.substr(index1,1));
		var angleIndex = parseInt(src.substr(index2,1));
		var tweenIndex = parseInt(src.substr(index3,1));

		console.log ("zoom level: "+zoomIndex+" / angle: "+angleIndex+" / tween frame: "+tweenIndex);

		//for values at the min
		if (angleIndex >= MaxViews){
			if (SpinToggle){
				angleIndex = 1;
				tweenIndex = 1;
			}
			else {
				angleIndex = 1;
				tweenIndex = 0;
			}
		}

		//for all numbers above the min
		else if (angleIndex < MaxViews){
			if (SpinToggle){
				angleIndex++;
				tweenIndex = 1;
			}
			else{
				angleIndex++;
				tweenIndex = 0;
			}
		}

		while(tweenIndex>0){
			setTimeout(function(){
				var src = $img.attr('src');
				//set new source for next frame
				var srcNew = "img/bm--"+zoomIndex+"__"+angleIndex+"_-"+tweenIndex+".png";
				//set image tag to new image
				$img.attr('src',srcNew);
			}, SpinSpeed);

			console.log ("zoom level: "+zoomIndex+" / angle: "+angleIndex+" / tween frame: "+tweenIndex);
			tweenIndex++;
			if (tweenIndex > MaxTween) tweenIndex = 0;

		}

		console.log ("zoom level: "+zoomIndex+" / angle: "+angleIndex+" / tween frame: "+tweenIndex);

		//set new source for next frame
		var srcNew = "img/bm--"+zoomIndex+"__"+angleIndex+"_-"+tweenIndex+".png";

		//log current frame to global variable
		CurrentLoc = angleIndex;

		//set image tag to new image
		$img.attr('src',srcNew);
		$('#image').center(srcNew);


		//load new svg
		$svg.load('svg/bm--'+zoomIndex+'__'+angleIndex+'.svg', function() {  
			$svg.attr('width',$img.attr('width'));
			$svg.attr('height',$img.attr('height'));
		});

		console.log('svg '+zoomIndex+'/'+angleIndex+' loaded.');

		//re-enable zooming
		ZoomToggle = true;

	}//end SpinLeft

	function spinRight(){
		console.log ('spinRight() called');

		//turn of tweening frames at max zoom level
		if (CurrentZoom > 1){
			SpinToggle = false;
		}
		else{
			SpinToggle = true;
		}

		//stop Zooming while spin is in effect
		ZoomToggle = false;

		//clear SVG to prevent selection while turning
		$svg.empty();

		//pull source file location from current image
		var src = $('#image img').attr('src');

		//index filename variables
		var index1 = src.indexOf('--')+2;
		var index2 = src.indexOf('__')+2;
		var index3 = src.indexOf('_-')+2;

		//parse filename variables
		var zoomIndex = parseInt(src.substr(index1,1));
		var angleIndex = parseInt(src.substr(index2,1));
		var tweenIndex = parseInt(src.substr(index3,1));

		console.log ("zoom level: "+zoomIndex+" / angle: "+angleIndex+" / tween frame: "+tweenIndex);

		if (angleIndex <= 1){
			if (SpinToggle){
				angleIndex = MaxViews;
				tweenIndex = MaxTween;
			}
			else {
				angleIndex = MaxViews;
				tweenIndex = 0;
			}
		}

		else if (angleIndex > 1){
			if (SpinToggle){
				angleIndex--;
				tweenIndex = MaxTween;
			}
			else {
				angleIndex--;
				tweenIndex=0;
			}
		}

		while(tweenIndex>0){
			setTimeout(function(){
				var src = $img.attr('src');
				//set new source for next frame
				var srcNew = "img/bm--"+zoomIndex+"__"+angleIndex+"_-"+tweenIndex+".png";
				//set image tag to new image
				$img.attr('src',srcNew);
			}, SpinSpeed);

			console.log ("zoom level: "+zoomIndex+" / angle: "+angleIndex+" / tween frame: "+tweenIndex);
			tweenIndex--;
		}

		console.log ("zoom level: "+zoomIndex+" / angle: "+angleIndex+" / tween frame: "+tweenIndex);

		//set new source for next frame
		var srcNew = "img/bm--"+zoomIndex+"__"+angleIndex+"_-"+tweenIndex+".png";

		//log current frame to global variable
		CurrentLoc = angleIndex;

		//set image tag to new image
		$img.attr('src',srcNew);

		//load new svg
		$svg.load('svg/bm--'+zoomIndex+'__'+angleIndex+'.svg', function() {  
			$svg.attr('width',$img.attr('width'));
			$svg.attr('height',$img.attr('height'));
		});
		console.log('svg '+zoomIndex+'/'+angleIndex+' loaded.');

		//re-enable zooming
		ZoomToggle = true;

	} //end SpinRight

	//- - - ZOOM IN (Click)
	function zoomIn(){
		console.log('zoomIn() called');

		if (ZoomToggle){

			SpinToggle = false;

			var src = $('#image img').attr('src');

			//clear SVG to prevent selection while turning
			$svg.empty();

			//index filename variables
			var index1 = src.indexOf('--')+2;
			var index2 = src.indexOf('__')+2;
			var index3 = src.indexOf('_-')+2;

			//parse filename variables
			var zoomIndex = parseInt(src.substr(index1,1));
			var angleIndex = parseInt(src.substr(index2,1));
			var tweenIndex = parseInt(src.substr(index3,1));

			console.log ("zoom level: "+zoomIndex+" / angle: "+angleIndex+" / tween frame: "+tweenIndex);

			if (zoomIndex < MaxZoom){
				zoomIndex++;
			}
			else {
				zoomIndex = MaxZoom;
			}

			var srcNew = "img/bm--"+zoomIndex+"__"+angleIndex+"_-"+tweenIndex+".png";

			//log current frame to global variable
			CurrentLoc = angleIndex;

			//set image tag to new image
			$img.attr('src',srcNew);

			//set zoom image sizes
			switch (zoomIndex){
				case 1:
					$img.attr('height',lev1ht);
					$img.attr('width','auto');
					break;
				case 2:
					$img.attr('height',lev2ht);
					$img.attr('width','auto');
					break;
				case 3:
					$img.attr('height',lev3ht);
					$img.attr('width','auto');
					$('#image').attr('top','100%');
					break;
			}

			//load new svg
			$svg.load('svg/bm--'+zoomIndex+'__'+angleIndex+'.svg', function() {  
				$svg.attr('width',$img.attr('width'));
				$svg.attr('height',$img.attr('height'));
			});

			console.log('svg '+zoomIndex+'/'+angleIndex+' loaded.');

			//re-enable turning
			SpinToggle = true;

		}//end toggle check
	}//end zoomIn function

	//- - - ZOOM OUT (Click)
	function zoomOut(){
		console.log('zoomOut() called.');

		if (ZoomToggle){
			SpinToggle = false;

			var src = $('#image img').attr('src');

			//clear SVG to prevent selection while turning
			$svg.empty();

			//index filename variables
			var index1 = src.indexOf('--')+2;
			var index2 = src.indexOf('__')+2;
			var index3 = src.indexOf('_-')+2;

			//parse filename variables
			var zoomIndex = parseInt(src.substr(index1,1));
			var angleIndex = parseInt(src.substr(index2,1));
			var tweenIndex = parseInt(src.substr(index3,1));

			console.log ("zoom level: "+zoomIndex+" / angle: "+angleIndex+" / tween frame: "+tweenIndex);

			if (zoomIndex > 1){
				zoomIndex--;
			}
			else {
				zoomIndex = 1;
			}

			var srcNew = "img/bm--"+zoomIndex+"__"+angleIndex+"_-"+tweenIndex+".png";

			//log current frame to global variable
			CurrentLoc = angleIndex;

			//set image tag to new image
			$img.attr('src',srcNew);

			//set zoom image sizes
			switch (zoomIndex){
				case 1:
					$img.attr('height',lev1ht);
					$img.attr('width','auto');
					$('#image').attr('top','50%');
					$('#image').attr('left','50%');
					$('#image').attr('margin-top',toString(-1 * lev1ht/2)+'px');
					$('#image').attr('margin-left',toString(-1 * $img.width()/2)+'px');
					break;
				case 2:
					$img.attr('height',lev2ht);
					$img.attr('width','auto');
					$('#image').attr('top','50%');
					$('#image').attr('left','50%');
					$('#image').attr('margin-top',toString(-1 * lev1ht/2)+'px');
					$('#image').attr('margin-left',toString(-1 * $img.width()/2)+'px');
					break;
				case 3:
					$img.attr('height',lev3ht);
					$img.attr('width','auto');
					$('#image').attr('top','100%');
					$('#image').attr('left','50%');
					$('#image').attr('margin-bottom','0px');
					$('#image').attr('margin-left',toString(-1 * $img.width()/2)+'px');
					break;
			}

			//load new svg
			$svg.load('svg/bm--'+zoomIndex+'__'+angleIndex+'.svg', function() {  
				$svg.attr('width',$img.attr('width'));
				$svg.attr('height',$img.attr('height'));
			});
			console.log('svg '+zoomIndex+'/'+angleIndex+' loaded.');

		//re-enable turning
		SpinToggle = true;

		} //end toggle check
	}//end zoomOut function



//bind functions to action events
$('#spin-left').bind('click',spinLeft);
$('#spin-right').bind('click',spinRight);
$('#zoom-in').bind('click',zoomIn);
$('#zoom-out').bind('click',zoomOut);

$('#image').draggable();

}); //end ready code

$(window).load(function(){
	console.log('content loaded');

	$('polygon').click(function(){
		$('#marker').empty();
	    $('#marker').append($(this).parents().attr('id'));
	    console.log($(this).parents().attr('id'));
	});
});
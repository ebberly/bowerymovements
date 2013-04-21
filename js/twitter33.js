// GLOBAL VARS

var timeActivity = 864000;
var getInterval = 60;   

var verticalBubbleShift = 205;
var maxTweetLevel3 = 6;
var svgId = "overlay";

var runUpdates = false;
var globalFace = 3;


var tweetObj = {};
tweetObj.test = "ReturnTestProperty";

var tweetIdObj = {};


var bldgList = new Array(

  west = new Array(  '273bowery', '269bowery', '267bowery', '265bowery', '263bowery', '261bowery', '259bowery', '257bowery', '255bowery', '2stanton', '245bowery', '243bowery', '241bowery', '239bowery', '235bowery', '231bowery', '229bowery', '227bowery', '225bowery', '223bowery', '221bowery', '219bowery', '217bowery', '215bowery', '213bowery', '209bowery', '207bowery', '199bowery', '197bowery', '195bowery', '193bowery', '191bowery', '189bowery', '187bowery', '185bowery', '183bowery'),

  north = new Array('273bowery'),

  east = new Array( '18delancey', '155chrystie','157chrystie', '159chrystie', '163chrystie','165chrystie','167chrystie','169chrystie', '173chrystie', '17rivington', '16rivington', '181chrystie',
    '183chrystie', '187chrystie', '189chrystie', '191chrystie', '195chrystie', '199chrystie',
    '201chrystie', '203chrystie', '205chrystie','273bowery'),

  south = new Array(  '183bowery','6delancey','10delancey', '12delancey','14delancey','16delancey','18delancey')

  );





var activityArray = new Array();
//activityArray[0] = 1;

var testArray = new Array ("This is test tweet number 1", "This is the second test tweet....", "Here we have the third test tweet");





//$(document).ready(function()
  $(window).load(function(){ 
    console.log('twitter.js is Loaded!');


  
  //getTweetsAll(2);
  //getTweetsAll(3);
  
  //getTweetActivity();
  //getBubblePoints();
  //drawTweetsFace(0);

  //$('#mySvg').hide();
  


});

  $(window).load(function(){


  getTweetsAll(globalFace-1);
  
  
  var count=0

  if (runUpdates == true){
    var pinginterval = setInterval(

      function(){ 
        console.log("10seconds "+count);
        getNewTweets(3,globalFace);
        count=count+1;
        if (count >=50){
          window.clearInterval(pinginterval);
        }

      }, 5000);

  };

})


 /* function bubbles() {
    console.log("bubbles() Called.");

    for (var i=0; i <15 ; i++) {
      $('body').prepend( '<img src="bubble.png"      style="width:auto; height:auto; position:absolute; z-index:100;left:' + 300+i*5 + 'px;top:'+ 300 +'px" />');

        //$('body').append( '<p style="width:250px; height:auto; position:absolute; z-index:101;left:' + bubbleArray[i][0] + 'px;top:'+ bubbleArray[i][1] + 'px" >#123Bowery THIS IS A TEST TO SEE ONE HUNDRED AND FORTY CHARACTERS MAXED OUT IN THE SPEECH BUBBLE TO SEE IF WE NEED MORE ROOM IN THE BUBBLESS</p>');

        var nameTemp = "10" + String(i) + "bowery";
        //getTweet(nameTemp);
        
      }
    };



   /* function getBubblePoints () {
      console.log("getBubblePoints called");
      
      for (var i = 0; i < 8; i++) {



        var mySvg = document.getElementById("mySvg");
        console.log(mySvg);
          //mySvg.addEventListener("load", function() {
            console.log("SVGLoaded ");
            var svg = mySvg.getSVGDocument();
            console.log("SVGLoaded 2");
            var ptx = svg.getElementById("183bowery").childNodes[3].getAttribute('x2');
            var pty = svg.getElementById("183bowery").childNodes[3].getAttribute('y2');
            $('body').append( '<p style="width:100px; height:auto; color:blue; position:absolute; z-index:101;left:' + ptx + 'px;top:'+ pty + 'px" >'+'asdfasdf'+'</p>');

            console.log("Line Pts: X:"+ptx+" Y:"+pty);
     // }
      //);       

};*/


function getTweetsAll(face) {
  console.log("getTweetsAll() Called.");

  var FACE_COUNT = bldgList.length;
  var CALLBACK_COUNTER = 0;

  $.each(bldgList[face], function(i,name) { 
    var target_url =  'http://webassite.com/util/twitter-api/REST/tweets/movements/hashtag/'+name+'/limit/10';

    $.ajax({
      type : "GET",
      dataType : "jsonp",
          url : target_url, // ?callback=?
          success: function(data){
            console.log('success');
            //console.log(data);
          //console.log(data.length);
          if (data.length != 0) {

            var BldgTweetArrayTemp = new Array();
            
            //console.log ("For Building:" + name);
            
            for (var j = 0; j <data.length; j++) {

            //console.log("Tweet: " + data[j]['text']);
            BldgTweetArrayTemp[j]=data[j]['text'];    

            var stringID = data[j]['id'];
            //console.log(stringID);
            tweetIdObj[stringID] = true;



          }          

          tweetObj[name] = BldgTweetArrayTemp;

        }
        CALLBACK_COUNTER++;

      },

      error: function(e){
        console.log('error');
        console.dir(e);
      },
      complete: function(data){
      }

    }); 


    
  });

 /* //should be ON LOAD-------------------------
  window.setTimeout(function(){
    drawTweetsFace(1,0);
    console.log(tweetObj);
  }, 2000);
*/

var iterations = 0;

var intervalID = setInterval(function(){
  iterations++;
  if( (iterations >= 10) || (CALLBACK_COUNTER >= FACE_COUNT) ){
    clearInterval(intervalID);
    drawTweetsFace(3,2);
    //drawLevel1();
    console.log(tweetObj);
  }
}, 200);

};


function getNewTweets(level, face) {

 console.log("getNewTweets() Called.");
  //$("mySvg3").hide();
  $.each(bldgList[face], function(i,name) { 
    var bldgTemp = bldgList[face][i];
    var target_url =  'http://webassite.com/util/twitter-api/REST/tweets/movements/hashtag/'+name+'/recent/'+getInterval;

    $.ajax({
      type : "GET",
      dataType : "jsonp",
          url : target_url, // ?callback=?
          success: function(data){
            console.log('success');
            //console.log(data);
            //console.log(data.length);
            if (data.length != 0) {
              for (m=0;m<data.length;m++) {
                if (tweetIdObj[data[m]['id']]!=true) { 
                  console.log("This Tweet is new");
                  var stringID = data[m]['id'];

                  tweetIdObj[stringID] = true;
                  console.log("New Tweet for: "+ name);
              ///HIDE, ADD, SHOW


              //$('.'+bldgTemp+'Text').hide('slow', function(){$('.'+bldgTemp+'Text').remove()});
              $('.'+bldgTemp+'Text').remove();

              //console.log("tweets removed from "+bldgTemp + ", "+data);
              //tweetObj[bldgTemp].insertBefore(data, tweetObj[bldgTemp].firstChild);
              tweetObj[bldgTemp].unshift(data[m]['text']);
              

              //----------
              var mySvg = document.getElementById(svgId);
              console.log("svg= "+mySvg);
                          //mySvg.addEventListener("load", function() {
                      //console.log("SVGLoaded ");
                      //var svg = mySvg.getSVGDocument();
                      //console.log("SVGLoaded 2");
                      if (svg.getElementById(bldgTemp).childNodes[3] != null){
                        var ptx = svg.getElementById(bldgTemp).childNodes[3].getAttribute('x2');
                        var pty = svg.getElementById(bldgTemp).childNodes[3].getAttribute('y2');
                        console.log (tweetIdObj[data[m]['id']]);

                        

                            //--------- redraw bubbles

                            for(var j=0; j<tweetObj[bldgTemp].length ; j++) {




                              var ptxt = ptx-60;
                              var ptyt = pty-80-verticalBubbleShift *j;

                              var classString = ''+bldgTemp+'Text';
                              var classStringFace  = "Face" + face;

                              $('#wrapper').append( '<p id="'+bldgTemp+'Text" class="'+ classString+'" style="width:200px; height:auto; position:absolute; z-index:101;left:' + ptxt + 'px;top:'+ ptyt + 'px" >'+tweetObj[bldgTemp][j]+'</p>');

                              //$('.TweetText').hide();
                              var ptxb = ptx-80;
                              var ptyb = pty-80-verticalBubbleShift *j;

                              var bubbleString = "";
                              if (j>0){

                                var randInt = Math.floor((Math.random()*5)+1);
                                bubbleString = "bubbleTop"+String(randInt)+".png";
                              }
                              else {
                                var randInt = Math.floor((Math.random()*6)+1);
                                bubbleString = "bubbleBottom"+String(randInt)+".png";
                              }

                              $('#wrapper').append( '<img src="images/'+bubbleString+'" class="'+ classString+'" style="width:auto; height:auto; position:absolute; z-index:100;left:' + ptxb + 'px;top:'+ ptyb +'px" />');
                              //console.log("New Tweet Prepended at line Pts: X:"+ptx+" Y:"+pty);
                            }
                          }
                        }  
                      }
                    }
                  }

                  ,

                  error: function(e){
                    console.log('error');
                    console.dir(e);
                  },
                  complete: function(data){
                  }

                }); 



});


};




function drawTweetsFace(level,face) {
  console.log("drawTweetsFaceCalled");

  for (var i = 0; i <bldgList[face].length; i++) { 


    var bldgTemp = bldgList[face][i];
    //console.log("bldgTemp: " + bldgTemp);
    if (tweetObj[bldgTemp] !=null) {

      var mySvg = document.getElementById(bldgTemp);
      var myLine = mySvg.childNodes[3];
      console.log(myLine) ;
            //mySvg.addEventListener("load", function() {
                //console.log("SVGLoaded ");
                //var svg = mySvg.getSVGDocument();
                console.log("SVGLoaded 2");
                //console.log(svg.getElementById(bldgTemp).childNodes[0]);
                if (document.getElementById(svgId) != null){
                  console.log("inside");
                  var ptx = myLine.getAttribute('x2');
                  var pty = myLine.getAttribute('y2');
                    //console.log("Tweets at bldg: "+bldgTemp+" = "+tweetObj[bldgTemp].length);

                    for(var j=0; j<tweetObj[bldgTemp].length && j<maxTweetLevel3; j++) {

                      var ptxt = ptx-30;
                      var ptyt = pty-80-verticalBubbleShift *j;

                      var classString = ''+bldgTemp+'Text';
                      var classStringFace  = "Face" + face;

                      $('#image').append( '<p id="'+bldgTemp+'Text" class="'+ classString+'" style="width:200px; height:auto; position:absolute; z-index:101;left:' + ptxt + 'px;top:'+ ptyt + 'px" >'+tweetObj[bldgTemp][j]+'</p>');

                              //$('.TweetText').hide();
                              var ptxb = ptx-60;
                              var ptyb = pty-130-verticalBubbleShift *j;

                              var bubbleString = "";
                              if (j>0){

                                var randInt = Math.floor((Math.random()*5)+1);
                                bubbleString = "bubbleTop"+String(randInt)+".png";
                              }
                              else {
                                var randInt = Math.floor((Math.random()*6)+1);
                                bubbleString = "bubbleBottom"+String(randInt)+".png";
                              }

                              $('#image').append( '<img src="img/bubbles/'+bubbleString+'"  class="'+ classString+'"    style="width:auto; height:auto; position:absolute; z-index:100;left:' + ptxb + 'px;top:'+ ptyb +'px" />');
                              //console.log("Tweet Appended at line Pts: X:"+ptx+" Y:"+pty);
                            }

                          } 
        //})   

}

}


};









function getTweetActivity() {


  for (var i = 1; i <4; i++) {
    console.log("getTweetActivity() for block " +i+".");


    var target_url =  'http://webassite.com/util/twitter-api/REST/tweets/movements/block/'+i+'/recent/100000/count';

    $.ajax({
      type : "GET",
      dataType : "jsonp",
          url : target_url, // ?callback=?
          success: function(data){
            console.log('success');
            console.log(data);
          //console.log(data.length);
          
            console.log("inside2");
           activityArray[i]=55;           
           console.log(activityArray[i]);
         
       },


       error: function(e){
        console.log('error');
        console.dir(e);
      },
      complete: function(data){
      }

    }); 
  }

};

function drawLevel1() {

  console.log("twitter.drawLevel1() Called");

  for (var i = 1; i <4; i++) { 
    //console.log("Activity Array" +activityArray[i]);

    var bldgTemp = "block"+String(i);
    //console.log("bldgTemp: " + bldgTemp);
    //if (activityArray[i] !=null) {

      var mySvg = document.getElementById("block"+String(i));
      console.log("mySvg=" + mySvg);
      var myLine = mySvg.childNodes[3];
      console.log(myLine) ;
            //mySvg.addEventListener("load", function() {
                console.log("Level1 SVGLoaded ");
                //var svg = mySvg.getSVGDocument();
                console.log("SVGLoaded 2");

                if (document.getElementById(bldgTemp) != null){
                  console.log("inside");
                  var ptx = myLine.getAttribute('x2');
                  var pty = myLine.getAttribute('y2');


                  var ptxt = ptx-30;
                  var ptyt = pty-30

                  var classString = ''+bldgTemp+'Text';
                  //var classStringFace  = "Face" + face;

                  $('#image').append( '<p id="'+bldgTemp+'Text" class="'+ classString+'" style="width:200px; height:auto; position:absolute; z-index:101;left:' + ptxt + 'px;top:'+ ptyt + 'px" >'+i*27+'</p>');

                              //$('.TweetText').hide();
                              var ptxb = ptxt-30;
                              var ptyb = ptyt-30;

                              var bubbleString = "";
                              
                              
                                var randInt = Math.floor((Math.random()*6)+1);
                                bubbleString = "bubbleBottom"+String(randInt)+".png";
                              
                               $('#image').append( '<img src="img/bubbles/'+bubbleString+'"  class="'+ classString+'"    style="width:auto; height:auto; position:absolute; z-index:100;left:' + ptxb + 'px;top:'+ ptyb +'px" />');
                              //console.log("Tweet Appended at line Pts: X:"+ptx+" Y:"+pty);


                         //   } 
        //})   

}

}



}




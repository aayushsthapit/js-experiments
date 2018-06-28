var mainWrapper=document.getElementById("main-wrapper");

var imageWrapper=document.getElementById("image-wrapper");

//Previous button handler.
var previousButton=document.getElementById("previous");
var clickcount=0;
    previousButton.onclick=function()
    {
        clickcount++;
        if(clickcount==1){
            if((imageSlider.style.marginLeft.replace(/px/,""))==0)
            {
                imageSlider.style.marginLeft=-3150+"px";
            }   
            var nextpoint=parseInt(imageSlider.style.marginLeft.replace(/px/,""));
    
            var counterRef=setInterval(function(){
                var margin=parseInt(imageSlider.style.marginLeft.replace(/px/,""));
                imageSlider.style.marginLeft=(margin+5)+"px";
                if(nextpoint+525==margin+5) 
                {
                    clearInterval(counterRef);
                    clickcount=0;
                }
            },8);
        }
    }

//Next button handler.
var nextButton=document.getElementById("next");

nextButton.onclick=function(){
    clickcount++;
    if(clickcount==1)
    {
        if((imageSlider.style.marginLeft.replace(/px/,""))==-3150)
        {
            imageSlider.style.marginLeft=0+"px"
        }   
        var nextpoint=parseInt(imageSlider.style.marginLeft.replace(/px/,""));
        var counterRef=setInterval(function(){
            var margin=parseInt(imageSlider.style.marginLeft.replace(/px/,""));
            imageSlider.style.marginLeft=(margin-5)+"px";
            if(nextpoint-525==margin-5) {
                clearInterval(counterRef);
                clickcount=0;
            }
        },8);
    }
};



var imageSlider=document.getElementById("image-sliderlist");
imageSlider.style.listStyleType="none";
imageSlider.style.width="10000px";
imageSlider.style.marginLeft="-525px";


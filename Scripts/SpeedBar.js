#pragma strict

public var SpeedBar : UI.Scrollbar;

public var Amount : float = 0;



function addSpeed(value:float){
	Amount += value;
	SpeedBar.size = Amount /100;
}


function Update(){
	SpeedBar.size = Amount /100;
	if(Amount > 100){
		Amount = 100;
	}
}
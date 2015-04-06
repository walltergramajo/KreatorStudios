#pragma strict

var maxFallDistance = -10;
private var isRestarting = false;

function Update(){
	if(transform.position.y <= maxFallDistance)
	{
		if(isRestarting == false)
		{
			RestartLevel();
		}
	}
}

function RestartLevel(){
	var pause : playerController;
	pause = gameObject.GetComponent("playerController");
	pause.displayPauseMenu = true;
	isRestarting = true;
	transform.position = CheckPoint.ReachedPoint;
	isRestarting = false;
}
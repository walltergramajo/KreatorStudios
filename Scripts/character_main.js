#pragma strict

var targetScript : Inventory;
//var controller : CharacterMotor;
public var OnDeathResetTo : Transform;
public var deathClock : float;




private var myTimer : float = 0;

 var clockBG : Texture2D;
 var clockFG : Texture2D;
 private var clockFGMaxWidth : float; //the starting width of the foreground bar
 private var currentHealth:float = 0;

 
 function Update(){

 if(currentHealth > 0){
 	currentHealth -= Time.deltaTime;
 	Debug.Log(currentHealth);
 }else if(currentHealth <= 0){
 	currentHealth = deathClock;
	this.transform.position = OnDeathResetTo.position;
	return;
 }


 if(myTimer > 0){
		myTimer -= Time.deltaTime;
	}if(myTimer <=0) {
		//controller.movement.maxForwardSpeed = controller.movement.maxForwardSpeed/2;
	}

  


for(var x = 0; x < 1 +targetScript.MainInventory.Count; x++){
	if(Input.GetKeyDown(""+x) && targetScript.MainInventory.Count != 0 && targetScript.MainInventory[(x-1)].Amount > 0){	
		SendMessage(""+targetScript.MainInventory[(x-1)].PowerUp,Vector2(targetScript.MainInventory[(x-1)].Variable,(x-1)));
		
	}
}
 


 }




function health(health:Vector2){

 currentHealth += health.x;
  Debug.Log(currentHealth);
  targetScript.MainInventory[health.y].Amount--;
if(targetScript.MainInventory[health.y].Amount  < 1){
  	targetScript.MainInventory.RemoveAt(health.y);
  }
 
 if(currentHealth > deathClock){
 	currentHealth = deathClock;
 } 
 
  
}

function sprint(speed:Vector2){

	//controller.movement.maxForwardSpeed = controller.movement.maxForwardSpeed*2;
	myTimer = speed.x;
	
	targetScript.MainInventory[speed.y].Amount--;
	if(targetScript.MainInventory[speed.y].Amount  < 1){
  		targetScript.MainInventory.RemoveAt(speed.y);
 	}
		
	}





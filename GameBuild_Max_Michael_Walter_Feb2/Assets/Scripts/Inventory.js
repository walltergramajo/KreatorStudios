import System.Collections.Generic;
//holding our items
var items : Items[];
//inventory
var texture : Texture2D;
var MainInventory : List.<Items> = new List.<Items>();

//Character controller for speed powerup
var controller : playerController;


// Timer for the speed powerup
private var myTimer : float = 0;

@HideInInspector
var invincibility : boolean = false;



function Start(){

}




function OnTriggerEnter(other : Collider){

	// add a for loop to check which is being added and selected
	for(var i = 0; i < items.length; i++){
	// if items are not isntant and need to be put in the inventory
		if(items[i].tagName == other.tag && items[i].Instant != true){
			//Debug.Log(items[i].Instant);
			if(items[i].Amount == 0){
			MainInventory.Add(items[i]);
			}	
			items[i].Amount++;		
			Destroy(other.gameObject);
			}
		// if items are Instant and do not need to be put into the inventory for use
		if(items[i].tagName == other.tag && items[i].Instant == true){
			SendMessage(""+items[i].PowerUp,Vector2(items[i].Variable,i));
			Destroy(other.gameObject);
		}
	}
	
	  if (invincibility){
		  if(other.gameObject.tag == "enemy"){
		 
		 	 Destroy(other.gameObject);
		 	 Debug.Log('hit when invincible');
		  }
 		 	
 		 		 	
 		 		
 		 	
 		 
 	   }
	
}




function Update(){

 //if(myTimer > 0){
	//	myTimer -= Time.deltaTime;
	//}if(myTimer <=0) {
		
//	}

  


for(var x = 0; x < 1 + MainInventory.Count; x++){
	if(Input.GetKeyDown(""+x) && MainInventory.Count != 0 && MainInventory[(x-1)].Amount > 0){	
		SendMessage(""+MainInventory[(x-1)].PowerUp,Vector2(MainInventory[(x-1)].Variable,(x-1)));
		MainInventory[x-1].Amount--;
		if(MainInventory[x-1].Amount  < 1){
	  		MainInventory.RemoveAt(x-1);
	 	}
	}
}

 }



function sprint(speed:Vector2){
	var maxSpeed : float = controller.maxSpeed;
	
	controller.speed = controller.speed*2;
	controller.maxSpeed = maxSpeed*2;
	// Yield workaround 
	//myTimer = speed.x;
	
	Debug.Log(controller.speed);
 	// Anything after this call will not work until seconds are finished. 
 	yield WaitForSeconds(speed.x);
 	
	controller.speed = maxSpeed;
	controller.maxSpeed = maxSpeed;
	
	//Debug.Log(controller.maxSpeed + "maxspeed");

	}
	
	
function invulnerability (speed:Vector2){
	
	//transform.renderer.material.color = Color.red;
	invincibility = true;
	controller.hitBlink = true;
	Debug.Log(invincibility);
	yield WaitForSeconds(speed.x);
	Debug.Log('dang im normal');
	invincibility = false;
	controller.hitBlink = false;
	//transform.renderer.material.color = Color.white;

}
	
	
	
	
	
function OnGUI(){

	for(var x = 0; x < MainInventory.Count; x++){
       GUI.DrawTexture(Rect(10, 10 + (50*x), 50, 50), MainInventory[x].Icon);
 	   GUI.Label(Rect(15,11 +(50*x),20,20), "#"+(x+1));
 	    GUI.Label(Rect(45,37 +(50*x),20,20), ""+MainInventory[x].Amount);
  
		//if(GUI.Button(Rect(10, 10 + (50*x), 50, 50), ""+MainInventory[x].Amount)){
			//Debug.Log(MainInventory[x].Description);
		//}
	}
}




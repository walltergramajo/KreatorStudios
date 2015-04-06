import System.Collections.Generic;
//holding our items
//var items : List.<Items> = new List.<Items>();
public var items : List.<Items> = new List.<Items>();
//inventory
var texture : Texture2D;
var MainInventory : List.<Items> = new List.<Items>();

//Character controller for speed powerup
private var controller;

// Timer for the speed powerup
private var myTimer : float = 0;

@HideInInspector
var invincibility : boolean = false;


private var Audio_Speed: AudioClip;
private var Audio_Invincibility: AudioClip;
private var Audio_BerryGood: AudioClip;
private var Audio_BerryBad: AudioClip;


function Start(){
Audio_BerryGood = Resources.Load('Audio/hit');
Audio_BerryBad = Resources.Load('Audio/hit');
Audio_Invincibility = Resources.Load('Audio/hit');
Audio_Speed = Resources.Load('Audio/hit');

controller = transform.GetComponent(playerController);

items.Add(Items('Speed','Run faster for 3 seconds',3, PowerUp.sprint, null, 0, true,  Audio_Speed));
items.Add(Items('Invincibility','Invincibile for 3 seconds',3, PowerUp.invulnerability, null, 0, true,  Audio_Invincibility));
items.Add(Items('Berry_good','give 25 points',25, PowerUp.berry, null, 0, true,  Audio_BerryGood));
items.Add(Items('Bad_Berry','minus 100 points',100, PowerUp.badBerry, null, 0, true,  Audio_BerryBad));
items.Add(Items('sprint_bar','minus 100 points',30, PowerUp.sprintBar, null, 0, true,  Audio_BerryBad));
//items.Size
//items.Push();

}




function OnTriggerEnter(other : Collider){

	// add a for loop to check which is being added and selected
	for(var i = 0; i < items.Count; i++){
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
			if(items[i].AudioPlay){	
			AudioSource.PlayClipAtPoint(items[i].AudioPlay, transform.position);
			}
			var particles = other.gameObject.GetComponent(ParticleSystem);
		
			//Debug.Log());
			if(particles){
				
				other.gameObject.GetComponent(MeshRenderer).enabled = false;
				//ParticleSystem.Play();
			
				particles.Play();	
				Destroy(other.gameObject, 10);
			}else{
			Destroy(other.gameObject);
			}
			var powerUp = PowerUp.badBerry;
		}
	}
	
	  if (invincibility){
		  if(other.gameObject.tag == "enemy"){
		 
		 	 Destroy(other.gameObject);
		 	 //Debug.Log('hit when invincible');
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
	var maxSpeed : float = transform.GetComponent(playerController).maxSpeed;
	
	
	controller.speed = controller.speed*2;
	controller.maxSpeed = maxSpeed*2;
	controller.run.speed = controller.run.speed*1.5;
	controller.speedPowerup = true;
	// Yield workaround 
	//myTimer = speed.x;
 	// Anything after this call will not work until seconds are finished. 

 	yield WaitForSeconds(speed.x);
 	controller.speedPowerup = false;
 	controller.run.speed = controller.run.speed/1.5;
	controller.speed = maxSpeed;
	controller.maxSpeed = maxSpeed;
	
	//Debug.Log(controller.maxSpeed + "maxspeed");

	}

function sprintBar(amount:Vector2){

	var script = gameObject.Find("Camera");
	var speedBar = script.GetComponent(SpeedBar);

	speedBar.addSpeed(amount.x);


}
	
	
function invulnerability (speed:Vector2){
	var maxSpeed : float = transform.GetComponent(playerController).maxSpeed;

	//transform.renderer.material.color = Color.red;
	invincibility = true;
	controller.hitBlink = true;
	controller.speedPowerup = true;
	//speed
	controller.speed = controller.speed*1.5;
	controller.maxSpeed = maxSpeed*1.5;
	controller.run.speed = controller.run.speed*1.25;

	yield WaitForSeconds(speed.x);
	
	controller.speedPowerup = false;
	invincibility = false;
	controller.hitBlink = false;
	controller.run.speed = controller.run.speed/1.25;
	controller.speed = maxSpeed;
	controller.maxSpeed = maxSpeed;
	//transform.renderer.material.color = Color.white;

}



function berry(amount:Vector2){
			controller.score += amount.x; 
			controller.scoreText = "Score: " + controller.score; 
			

}

function badBerry(amount:Vector2){
		controller.score -= amount.x; 
		controller.scoreText = "Score: " + controller.score;
		controller.doBlink();
		controller.speed = controller.resetSpeed;
		controller.run.speed = 0; 
		var Berries = transform.Find('Berries');
		var selfParticles = Berries.GetComponent(ParticleSystem);
			selfParticles.Play();
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





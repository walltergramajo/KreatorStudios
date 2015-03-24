#pragma strict
import System.Collections.Generic;

//speed toggle
@HideInInspector
@System.NonSerialized
public var maxSpeed : float = 17;
@HideInInspector
@System.NonSerialized
public var resetSpeed : float = 2;

public var speed : float = 0;
// jump toggles
private var jumpHeight : float = 23;
private var gravity : float = 70;
private var targetRotation : int;
private var jumpTime : float;
private var doubleJump : float;
private var jumpMaxTime: float = 0.5;
private var extraJump = 0.8;


public var displayMessageTime : float;
private var velocity : Vector3;
private var enableTimer = true;
//Particle Emitter

//sound


public var hitSound :AudioClip;
public var berrySound :AudioClip;
public var jumpSound :AudioClip;

// Point System


public var maxTimerPoints : int = 1500;
public var maxTimeAllowedInSeconds : int = 120;
var finalPoints;

// Score System
var score = 0; 
var scoreText = "Score: 0"; 


// Pause Menu
private var pauseMenuTexture : Texture2D;
public var resumeButton : Texture2D;
public var restartButton : Texture2D;
public var mainMenuButton : Texture2D;
public var displayPauseMenu : boolean = false;
private var menuChoice : String = "";
private var windowPosition : Vector2 = Vector2(0,0);
private var windowSize : Vector2 = Vector2(Screen.width, Screen.height);
private var windowRect : Rect = new Rect(windowPosition.x, windowPosition.y, windowSize.x, windowSize.y);

//Timer

var timer : float = 0;


//Score
var bestTime : int = 0;
var completeTime : int = 0;
public var FastTimeLevel : String = "Best Time : " ;
private var displayFastTimeLevel : boolean = false;
public var playWaitTime : float = 5; 
public var launchMessage : String = "Go!";
var roundedPlayWaitTime; 
private var displayRoundedPlayWaitTime : boolean = false;
var displayPlayWaitTime = true;



//blink 
private var hit : boolean;

var invincible : boolean = false;
 //testing

public var runner  : boolean;
//dust

var pe : ParticleSystem;


public var hitBlink : boolean = false;



//animations
var idle : AnimationState;
var run : AnimationState;
var jump : AnimationState;

rigidbody.useGravity = false;

// invincibility 


function Start(){
	
	
	bestTime = PlayerPrefs.GetInt("bestTime", bestTime);

	animation["Run"].speed = 0.1;
	animation["Run"].layer = 0;
	animation["Jump"].layer = 1;
	jump = animation["Jump"];
	run = animation["Run"];
	
	
	pauseMenuTexture = Resources.Load("Textures/pauseMenu", Texture2D);
	resumeButton = Resources.Load("Textures/resumeButton", Texture2D);
	restartButton = Resources.Load("Textures/restartButton", Texture2D);
	mainMenuButton = Resources.Load("Textures/mainMenuButton", Texture2D);

}


function FixedUpdate () {
	transform.position.z = 0; //keep player from moving on the z axis
	rigidbody.AddForce(new Vector3(0, -gravity * rigidbody.mass, 0));
	


	//handle horizontal movement
	
	
	  
	// rigidbody.isKinematic = false;
	// rigidbody.MovePosition = speed * Input.GetAxis("Horizontal");
	
	//turning
	
	// if(rigidbody.velocity.x < 0){
	// 	targetRotation = 180;
	// }else if (rigidbody.velocity.x > 0){
	// 	targetRotation = 0;
	// }
	
	//transform.eulerAngles.y=targetRotation;
	
	//transform.eulerAngles.y-=(transform.eulerAngles.y-targetRotation)/5;
	
	//jump
	



}

// blink 

 function doBlink() 
	 { 
		 var startBlinking : float = Time.time;
		  while ((Time.time - startBlinking) < 2)
		  { //Blink for 2 Seconds 
			GetComponentInChildren(SkinnedMeshRenderer).enabled = false; yield WaitForSeconds(0.1); //Player invisible for some Time 
			GetComponentInChildren(SkinnedMeshRenderer).enabled = true; yield WaitForSeconds(0.3); //Player visible for a longer amount of Time 
		  }
		  // Instantiate(ce, transform.position, transform.rotation);
	}
 
//Make Character stationary on platform
function OnCollisionStay(hit:Collision){
	if(hit.gameObject.tag == "platform"){
		transform.parent = hit.transform;
		rigidbody.isKinematic = true;
		//Debug.Log("On Platform");
		if(Input.GetAxis("Jump")){
			//Debug.Log("Player Input");
			rigidbody.isKinematic = false;
		}
		if(Input.GetAxis("Horizontal")){
			//Debug.Log("Player Input");
			rigidbody.isKinematic = false;
		}
	}else{
		transform.parent = null;
		//Debug.Log("No Platform");
	}
}

	function pause(){
		if(Input.GetButtonDown("Pause")){
			Debug.Log("pause Area");
			if (displayPauseMenu == false) {
				displayPauseMenu = true;
			}else if (displayPauseMenu == true) {
				displayPauseMenu = false;
				Debug.Log("unpause");
			}
		}

	}
	
	function pauseFunctions(menu:String){
	switch(menu) {
		case "resumeGame":	
			displayPauseMenu = false;
			break;
			
		case "restartGame":
			// Application.LoadLevel("mainmenu");
			Debug.Log("LoadThisLevel");
			Application.LoadLevel(Application.loadedLevel);
			break;

		case "mainMenu":
			Application.LoadLevel("Menu");
			break;
		default:
			//do nothing, return
			Debug.Log("nothing clicked");
			break;
	}
}

function Update (){
	
	pause();
	colliding();



// runner code

	if (speed < maxSpeed - 0.2)
	{
	 	 speed += maxSpeed*0.01;
		
	}
	
	if(animation["Run"].speed < 1 )
		{
		  run.speed += 1 * 0.01;
		  // Debug.Log(speed/maxSpeed + " :MaxSpeed");
		}
		
		
		


	if(runner){
		if(isGrounded()){
		pe.enableEmission = true;
		animation.Play("Run");	
		}else{
		animation.Stop("Run");	
		pe.enableEmission = false;
		}
	rigidbody.velocity = new Vector3(speed, rigidbody.velocity.y);
	}else{
	rigidbody.velocity.x = speed * Input.GetAxis("Horizontal");
	}

	
	//Jumping code

	//If Character is on the ground reset the Jump Time
	if(Input.GetButtonDown("Jump") && isGrounded()){
		playSound(jumpSound);
		jumpTime = 0;
		rigidbody.velocity.y = jumpHeight;	
		doubleJump = 1;

		animation.Stop("Run");
		animation.CrossFade("Jump");
	}
// Debug.Log(jumpTime);
//If character jumps and holds down the key, jump higher. 
	if(Input.GetButton("Jump") && jumpTime < jumpMaxTime){
	    rigidbody.velocity.y += extraJump;
	    jumpTime += Time.deltaTime;
	}
	//if character jumps and releases key prevent from acending again mid air. 
	if(Input.GetButtonUp("Jump")){
		jumpTime = jumpMaxTime;
	}

	//Double jump
	if(Input.GetButtonDown("Jump") && doubleJump == 1 && !isGrounded()){
		playSound(jumpSound);
		rigidbody.velocity.y = jumpHeight + 5;
		animation.CrossFade("Jump");
		doubleJump = 0;
		
	}

	timer += Time.deltaTime;
	// Debug.Log(bestTime);


	// playWaitTime -= Time.time; roundedPlayWaitTime = Mathf.CeilToInt(playWaitTime);

	// if(roundedPlayWaitTime == 0){
	// 	Debug.Log("Time0");
	// 	playWaitTime = 0;
	// 	return;
	// }
	

	// if(enableTimer){
	// 	playWaitTime -= Time.time; roundedPlayWaitTime = Mathf.CeilToInt(playWaitTime);
	// }


	// if(roundedPlayWaitTime == 0){
	// 	playWaitTime = 0;
	// 	enableTimer = false;
	// 	displayRoundedPlayWaitTime = false;
	// }

	
	
}
function playSound(sound :AudioClip){
	if(sound){
	AudioSource.PlayClipAtPoint(sound, transform.position);
	}
};


 function OnTriggerEnter (other : Collider){
	 	if(colliding() && other.gameObject.tag == "Collision"){
	 	Debug.Log('hit');
			   transform.rigidbody.velocity.y = 30;
			   speed = -20;
			   run.speed = -1;
			   // Debug.Log(run.speed);
			 
			  
		}
 	
         if (!hitBlink){
             if(other.gameObject.tag == "enemy"){
                 hit = true;
                 
                 hitBlink = true; // makes this whole function unusable since invincible is no longer false              
	             playSound(hitSound);
                 doBlink();
                 speed = resetSpeed;
                 run.speed = 0.1;
                 yield WaitForSeconds (3); 
                 hitBlink = false; // makes this whole function reusable since invincible is false again
             }
         }

         if (other.tag == "Berry_good") { 
			score += 25; 
			scoreText = "Score: " + score; 
			playSound(berrySound);
			Destroy(other.gameObject); 
		} 

        if(other.gameObject.tag == "endLevel"){
			Debug.Log("End level");
			completeTime = timer;

				if(bestTime == 0){
					bestTime = completeTime;
					Debug.Log("Time added now because no time was added before");
					PlayerPrefs.SetInt("bestTime",bestTime);	
					displayFastTimeLevel = true;
					yield WaitForSeconds (displayMessageTime);
					displayFastTimeLevel = false;
				}else{

					Debug.Log("Time Was added before");
						// Debug.Log(bestTime);
					if(completeTime >= bestTime){
						Debug.Log("Too Slow");
						// displayFastTimeLevel = true;
						// yield WaitForSeconds (displayMessageTime);
						// displayFastTimeLevel = false;
					}

					if(completeTime <= bestTime){
						bestTime = completeTime;
						Debug.Log(bestTime);
						Debug.Log("New Record!");
						PlayerPrefs.SetInt("bestTime",bestTime);	
						displayFastTimeLevel = true;
						// yield WaitForSeconds (displayMessageTime);
						// displayFastTimeLevel = false;
					}

				}

				// Point System
				// Debug.Log("POINTSSS!");

				Debug.Log("Final Time:" + completeTime);
				Debug.Log("Max Points" + maxTimerPoints);
				var bulkPoints = completeTime * maxTimerPoints / maxTimeAllowedInSeconds;
				Debug.Log("Points" + bulkPoints);
				var totalTimePoints = maxTimerPoints - bulkPoints;
				var finalPoints = totalTimePoints + score;
				Debug.Log("Total Time Points:" + totalTimePoints);
				Debug.Log("Total Time + Berries Points:" + finalPoints);

				
		}

		
		
		
		if (other.gameObject.tag == 'jumpPad' ){
		   // Apply the current movement to launch velocity
		   //velocity = rigidbody.velocity;
		   rigidbody.velocity.y = 30;
		   speed = speed * 3;
		   Debug.Log("BOUNCE Jump");
		   
		  }

		if (speed > maxSpeed){

		 	 speed -= maxSpeed*0.40;
		 	 
		}

     }






function isGrounded(){
	var front : Vector3 = transform.position;
	front.x += 0.4;
	
	var middle : Vector3 = transform.position;
	
	var back : Vector3 = transform.position;
	back.x -= 0.4;
	
	//debug ray cast
	
		var jumpLine : float = collider.bounds.size.y/2 -1;
	Debug.DrawRay(middle, Vector3(0, -jumpLine, 0), Color.red);
	Debug.DrawRay(front, Vector3(0, -jumpLine, 0), Color.red);
	Debug.DrawRay(back, Vector3(0, -jumpLine, 0), Color.red);
	
	if(
		Physics.Raycast(front, Vector3.down, collider.bounds.size.y/2 + 0.1) ||
		Physics.Raycast(middle, Vector3.down, collider.bounds.size.y/2 + 0.1) ||
		Physics.Raycast(back, Vector3.down, collider.bounds.size.y/2 + 0.1)
		){
		return true;
	}
	
	return false;
	
}

function colliding(){
	var top : Vector3 =  transform.position;
	top.x += 0.4;
	top.y += collider.bounds.size.y;
	var middle : Vector3 = transform.position;
	middle.x += 0.4;
	middle.y += collider.bounds.size.y/2;
	
	var bottom : Vector3 = transform.position;
	bottom.x += 0.4;
	bottom.y += collider.bounds.size.y/4;
	
	var collision : float = collider.bounds.size.x/3;
	Debug.DrawRay(middle, Vector3(collision,0 , 0), Color.red);
	Debug.DrawRay(top, Vector3(collision, 0, 0), Color.red);
	Debug.DrawRay(bottom, Vector3(collision, 0, 0), Color.red);
	
	if(
		Physics.Raycast(top, Vector3.right, collider.bounds.size.x/2.5) ||
		Physics.Raycast(middle, Vector3.right, collider.bounds.size.x/2.5) ||
		Physics.Raycast(bottom, Vector3.right, collider.bounds.size.x/2.5)
		){
		return true;
	}
	
	return false;

}



function OnGUI() { 
	var minutes: int = Mathf.FloorToInt(timer / 60); 
	var seconds: int = Mathf.FloorToInt(timer - minutes * 60); 
	var niceTime: String = String.Format("{0:0}:{1:00}", minutes, seconds); 
	var countdown: String = String.Format("{0:0}", roundedPlayWaitTime); 
	GUI.Label(new Rect(10,10,250,100), niceTime); GUI.Label(new Rect(10,30,250,100), scoreText.ToString()); 
	
	if (displayFastTimeLevel){ 
		GUI.Label(Rect(Screen.width/2-80,Screen.height/2-130,300,100),FastTimeLevel + bestTime.ToString() + " Seconds"); 
	}
	if(displayPlayWaitTime == true){
	 	GUI.Label(new Rect(Screen.width/2-10,Screen.height/2-130,130,100), countdown); Time.timeScale = 1; 
	}if(roundedPlayWaitTime == 0){ 
		displayPlayWaitTime = false; 
		if(displayRoundedPlayWaitTime){
			GUI.Label(new Rect(Screen.width/2-9,Screen.height/2-130,130,100), launchMessage);
		}
	// 	Time.timeScale = 1; 
	} 

	if(displayPauseMenu){
		GUI.backgroundColor = Color.clear;
		Time.timeScale = 0;
		GUI.DrawTexture(windowRect, pauseMenuTexture, ScaleMode.ScaleToFit);
		// GUI.DrawTexture(windowRect, resumeButton, ScaleMode.ScaleToFit);
		if (GUI.Button(Rect(Screen.width/2.8,Screen.height/3,200,100),resumeButton)){
			menuChoice = "resumeGame";
			Debug.Log(menuChoice);
			pauseFunctions(menuChoice);
		}
		if (GUI.Button(Rect(Screen.width/2.8,Screen.height/2,200,100),restartButton)){
			menuChoice = "restartGame";
			Debug.Log(menuChoice);
			pauseFunctions(menuChoice);
		}
		if (GUI.Button(Rect(Screen.width/2.8,Screen.height/1.5,200,100),mainMenuButton)){
			menuChoice = "mainMenu";
			Debug.Log(menuChoice);
			pauseFunctions(menuChoice);
		}
		// GUI.DrawTexture(windowRect, restartButton, ScaleMode.ScaleToFit);
		// GUI.DrawTexture(windowRect, mainMenuButton, ScaleMode.ScaleToFit);

	}else{
		Time.timeScale = 1;
	}
}
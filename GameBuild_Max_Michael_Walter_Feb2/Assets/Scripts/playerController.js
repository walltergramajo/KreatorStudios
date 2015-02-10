#pragma strict
import System.Collections.Generic;

//speed toggles
public var maxSpeed : float;
public var resetSpeed : float;
public var speed : float;
// jump toggles
public var jumpHeight : float;
public var gravity : float;
private var targetRotation : int;
private var jumpTime : float;
private var doubleJump : float;
public var jumpMaxTime: float = 0.3;
public var extraJump = 0.4;
public var displayMessageTime : float;
private var velocity : Vector3;
//Particle Emitter


// Point System


public var maxTimerPoints : int = 1500;
public var maxTimeAllowedInSeconds : int = 120;
var finalPoints;

// Score System
var score = 0; 
var scoreText = "Score: 0"; 



//Timer

var timer : float = 0;


//Score
var bestTime : int = 0;
var completeTime : int = 0;
public var FastTimeLevel : String = "Best Time : " ;
private var displayFastTimeLevel : boolean = false;



//blink 
private var hit : boolean;

var invincible : boolean = false;
 //testing

public var runner  : boolean;
//dust




var pe : ParticleSystem;
<<<<<<< HEAD


public var hitBlink : boolean = false;
=======
>>>>>>> origin/master


public var hitBlink : boolean = false;


//animations
private var idle : AnimationState;
private var run : AnimationState;
private var jump : AnimationState;

rigidbody.useGravity = false;

// invincibility 


function Start(){
	
	
	bestTime = PlayerPrefs.GetInt("bestTime", bestTime);

	animation["Run"].speed = 0.1;
	animation["Run"].layer = 0;
	animation["Jump"].layer = 1;
	jump = animation["Jump"];

	//run = animation["Run"];

	run = animation["Run"];

<<<<<<< HEAD

=======
>>>>>>> origin/master
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
	

	
	

<<<<<<< HEAD

=======
>>>>>>> origin/master
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


function Update (){



	 if (speed < maxSpeed){
	 	 speed += maxSpeed*0.01;
	 	 if(animation["Run"].speed < 1)
	 	 animation["Run"].speed += 1 * 0.01;
	 }


// runner code

	if (speed < maxSpeed)
	{
	 	 speed += maxSpeed*0.01;
		
	}
	
	if(animation["Run"].speed < 1)
		{
		  animation["Run"].speed += 1 * 0.01;
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
		rigidbody.velocity.y = jumpHeight;
		animation.CrossFade("Jump");
		doubleJump = 0;
		
	}

	timer += Time.deltaTime;
	// Debug.Log(bestTime);

	
	
}

 function OnTriggerEnter (other : Collider){
 
 		
         if (!hitBlink){
             if(other.gameObject.tag == "enemy"){
                 hit = true;
                 
                 hitBlink = true; // makes this whole function unusable since invincible is no longer false
                 doBlink();
                 speed = resetSpeed;
                 animation["Run"].speed = 0.1;
                 yield WaitForSeconds (3); 
                 hitBlink = false; // makes this whole function reusable since invincible is false again
             }
         }

         if (other.tag == "Berry_good") { 
			score += 25; 
			scoreText = "Score: " + score; 
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
		   rigidbody.velocity.y = 35;
		   speed = speed * 3;
		   Debug.Log("BOUNCE Jump");
		   
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


function OnGUI() {
    var minutes: int = Mathf.FloorToInt(timer / 60);
    var seconds: int = Mathf.FloorToInt(timer - minutes * 60);
 
    var niceTime: String = String.Format("{0:0}:{1:00}", minutes, seconds);
 
    GUI.Label(new Rect(10,10,250,100), niceTime);
    GUI.Label(new Rect(10,30,250,100), scoreText.ToString());
    


    // GUI.Label(Rect(Screen.width/2-80,Screen.height/2-130,300,100),FastTimeLevel +  bestTime.ToString() + " Seconds");

    if (displayFastTimeLevel){
		GUI.Label(Rect(Screen.width/2-80,Screen.height/2-130,300,100),FastTimeLevel +  bestTime.ToString() + " Seconds");

	}

 }
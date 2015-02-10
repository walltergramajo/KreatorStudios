#pragma strict

public var enemyhealth = 3; 

 var Player : Transform;
 var MoveSpeed = 4;
 var MaxDist = 10;
 var MinDist = 5;
 
 


 
function Start () {

}


function Update () { 
	if((Vector3.Distance(transform.position,Player.position) <= MinDist) && (enemyhealth > 0) ){
		transform.LookAt(Player);
		transform.position += transform.forward*MoveSpeed*Time.deltaTime;
   
	    if(Vector3.Distance(transform.position,Player.position) >= MaxDist) {
	    	transform.LookAt(Player);
	             
		}
	}
}



function OnTriggerEnter (other : Collider){
	if(other.tag == "Player") {
		if(other.tag == "Player" && enemyhealth > 0) {
			enemyhealth--;
			/*audio.clip = healthSound;
            audio.Play();*/
			var rBody : Rigidbody = GetComponent( Rigidbody );
			if (enemyhealth == 0 && rBody == null){
				var addRigidBody : Rigidbody;
				addRigidBody = gameObject.AddComponent (Rigidbody);
				addRigidBody.mass  = 8;
				addRigidBody.useGravity = true;
				addRigidBody.angularDrag  = 2;

			//	NotificationCenter.DefaultCenter().PostNotification(this, "EnemyKilled");

			}
		}
	}
	
	
	
}
















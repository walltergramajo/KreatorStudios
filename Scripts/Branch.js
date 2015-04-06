#pragma strict
 
var owlMove : boolean = false;
var owl : Transform;
var owlPosition : float;

	
function Start() {
	owl = transform.Find('theOwl');
	Debug.Log(owl.position.y);
	owlPosition = owl.position.y + 3;
	Debug.Log(owlPosition);
	
}

// If player enters area set value to true
function OnTriggerEnter (other : Collider){
	if(other.tag == "Player"){
		var branch = transform.Find('Branchfall');
	
		owlMove = true;
		
		branch.rigidbody.useGravity = true;
	}
}

function Update () {

	if(owlMove && owlPosition > owl.position.y){
	
		owl.position.y += owl.position.y * 0.005;
	
		
		
	}

}

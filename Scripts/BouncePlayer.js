var BounceAmount : float;

function OnTriggerEnter(other : Collider){
	if(other.tag == "Player") {
		var P = GameObject.FindGameObjectWithTag('Player');
		P.GetComponent("playerController").movement.velocity.y  = BounceAmount;
	}
}


    //  #pragma strict
    // var strength : int = 10; // Strenght, how high will the jumppad make the player jump
    // // make sure to check the Is Trigger checkbox in the Box/mesh/whatever collider
    // function OnTriggerEnter(col : Collider){
    // // Make sure the "Player" tag is set on the player
    // if(col.CompareTag("Player")){
    // col.gameObject.GetComponent(CharacterMotor).SetVelocity(Vector3.up * strength);
    // }
    // }
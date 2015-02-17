#pragma strict

var spawnPoint : Transform;

function OnTriggerEnter(other: Collider){
	if(other.tag == "Player"){ //if tag is equal to player then move spawn point
		spawnPoint.position = Vector3(transform.position.x, spawnPoint.position.y, spawnPoint.position.z);
		Destroy(gameObject);
	}
}
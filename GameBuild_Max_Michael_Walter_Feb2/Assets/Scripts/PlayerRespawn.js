#pragma strict

var Player : GameObject;
var spawnPoint : Transform;

function OnTriggerEnter(other: Collider){
	Destroy(other.gameObject);
	var P : GameObject = Instantiate(Player, spawnPoint.position, Quaternion.identity);
	var sf = Camera.main.GetComponent(camera_follow);

	sf.target = P.gameObject;
}
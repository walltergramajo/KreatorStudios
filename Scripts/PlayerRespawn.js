#pragma strict

var Player : GameObject;
var spawnPoint : Transform;
var P : GameObject;

function OnTriggerEnter(other: Collider){
	Destroy(other.gameObject);
	P =  Instantiate(Player, spawnPoint.position, Quaternion.identity);
	P.transform.Rotate(0,90,0);
//	var sf = Camera.main.GetComponent(camera_follow);

//	sf.target = P.gameObject;
}
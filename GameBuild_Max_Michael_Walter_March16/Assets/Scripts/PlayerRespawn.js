#pragma strict

var Player : GameObject;
var spawnPoint : Transform;
var P : GameObject;

var FoxPrefab : GameObject;
var ChipmunkPrefab : GameObject;
var Rabbitprefab : GameObject;

var savedCharacter : int = 0;

function Awake () {
	savedCharacter = PlayerPrefs.GetInt("selectedPlayer");
	Debug.Log(savedCharacter);

	FoxPrefab = GameObject.Find("Fox");
	ChipmunkPrefab = GameObject.Find("Chipmunk");
	Rabbitprefab = GameObject.Find("Rabbit");

	if(savedCharacter == 0){
		FoxPrefab.SetActive(true);
		ChipmunkPrefab.SetActive(false);
		Rabbitprefab.SetActive(false);
	}
	if(savedCharacter == 1){
		FoxPrefab.SetActive(true);
		ChipmunkPrefab.SetActive(false);
		Rabbitprefab.SetActive(false);
	}
	if(savedCharacter == 2){
		FoxPrefab.SetActive(false);
		ChipmunkPrefab.SetActive(true);
		Rabbitprefab.SetActive(false);
	}
	if(savedCharacter == 3){
		FoxPrefab.SetActive(false);
		ChipmunkPrefab.SetActive(false);
		Rabbitprefab.SetActive(true);
	}

}


function OnTriggerEnter(other: Collider){
	if(savedCharacter == 0){
		P =  Instantiate(FoxPrefab, spawnPoint.position, Quaternion.identity);
		P.transform.Rotate(0,90,0);
	}
	if(savedCharacter == 1){
		P =  Instantiate(FoxPrefab, spawnPoint.position, Quaternion.identity);
		P.transform.Rotate(0,90,0);
		P.name = 'Fox';
		
	}
	if(savedCharacter == 2){
		P =  Instantiate(ChipmunkPrefab, spawnPoint.position, Quaternion.identity);
		P.transform.Rotate(0,90,0);
		P.name = 'Chipmunk';
		
	}
	if(savedCharacter == 3){
		P =  Instantiate(Rabbitprefab, spawnPoint.position, Quaternion.identity);
		P.transform.Rotate(0,90,0);
		P.name = 'Rabbit';

		// var playerController : playerController = P.GetComponent(playerController);
		// playerController.enabled = true;
		
	}
	Destroy(P.gameObject);
// var sf = Camera.main.GetComponent(camera_follow);

// sf.target = P.gameObject;
}
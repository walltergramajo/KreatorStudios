#pragma strict

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

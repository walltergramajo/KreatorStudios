﻿#pragma strict

private var ray : Ray;
private var hit : RaycastHit;
private var target : GameObject;
public var smooth : float = 2;
public var selectedPlayer : int = 0;


function Start () {
		target = GameObject.FindGameObjectWithTag("StartMenu");
		transform.position.x = target.transform.position.x + 1;
		transform.position.y = target.transform.position.y = 0;
		transform.position.z = target.transform.position.z - 30;
}

function Update () {

	

	if(Input.GetMouseButtonUp(0)){
		ray = Camera.main.ScreenPointToRay(Input.mousePosition);

		

		if(Physics.Raycast(ray, hit)){
			if(hit.transform.name == "StartButton"){
				target = GameObject.FindGameObjectWithTag("MainMenu");
				transform.position.x = target.transform.position.x+1;
				transform.position.y = target.transform.position.y -5;
				transform.position.z = target.transform.position.z-25;
				// transform.LookAt(target.transform);
			}
			if(hit.transform.name == "ExitButton"){
				Application.Quit();
			}
			if(hit.transform.name == "BackToStart"){
				target = GameObject.FindGameObjectWithTag("StartMenu");
				transform.position.x = target.transform.position.x+1;
				transform.position.y = target.transform.position.y = 0;
				transform.position.z = target.transform.position.z - 30;
				// transform.LookAt(target.transform);
			}
			if (hit.transform.name == "Fox"){
				selectedCharacter01();
			}
			if (hit.transform.name == "Chipmunk"){
				selectedCharacter02();
			}
			if (hit.transform.name == "Rabbit"){
				selectedCharacter03();
			}
			if (hit.transform.name == "Level01"){
				Application.LoadLevel("Dabo_level");
			}
			if (hit.transform.name == "Level02"){
				Application.LoadLevel("ProxyLevel");
			}
			if (hit.transform.name == "Level03"){
				Application.LoadLevel("Jane's Level");
			}

		}
	}

    

}


function selectedCharacter01() {
	Debug.Log("Character 1 Selected");
	selectedPlayer = 1;
	PlayerPrefs.SetInt("selectedPlayer", (selectedPlayer));
}

function selectedCharacter02() {
	Debug.Log("Character 2 Selected");
	selectedPlayer = 2;
	PlayerPrefs.SetInt("selectedPlayer", (selectedPlayer));
}

function selectedCharacter03() {
	Debug.Log("Character 3 Selected");
	selectedPlayer = 3;
	PlayerPrefs.SetInt("selectedPlayer", (selectedPlayer));
}
#pragma strict

public var target : GameObject;


function Start () {
}

function Update () {
 target = GameObject.FindGameObjectWithTag("Player");
 transform.position.x = target.transform.position.x+12;
 transform.position.y = target.transform.position.y+7;
 transform.position.z = target.transform.position.z-16;
 
}
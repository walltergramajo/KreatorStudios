#pragma strict

public var target : GameObject;


function Start () {
}

function Update () {
 target = GameObject.FindGameObjectWithTag("Player");
 transform.position.x = target.transform.position.x+12;
 transform.position.y = target.transform.position.y+5;
 transform.position.z = target.transform.position.z-16;
 
}
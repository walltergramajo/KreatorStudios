#pragma strict

public var rotationAmount : float = 20;
// private var points : int;

// function OnTriggerEnter(other : Collider){
	
// 	if(other.gameObject.tag == "Player"){
// 		points += 1;
// 		Debug.Log("Score is:" + points);
// 		Destroy(gameObject);


// 	}
// }

function Update () {
	var rotate : float = Time.deltaTime * rotationAmount;
	transform.Rotate (0, rotate, 0);

}



// function CountPoint () {
// 	Debug.Log(points);
// }





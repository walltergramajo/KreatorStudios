#pragma strict
 
var pathPoints : Transform[];
var t : float;
public var owl : Transform;
var entered : boolean;

function Start() {

}
// If player enters area set value to true
function OnTriggerEnter (other : Collider){
	if(other.tag == "Player"){
		entered = true;
		//Debug.Log('true');
	}
}

function Update () {

	if (entered && owl != null) {
		//Rotation
		var q : Quaternion;
		// Move owl on curve
	    owl.position = Spline.MoveOnPath(pathPoints, owl.position, t, q, 25f, 100, EasingType.Quadratic, true, true);
	    // t = position of animation 0 - 1 .  Time.deltaTime the time in seconds to complete last frame. 
	    t += Time.deltaTime/3;
	    owl.rotation.z = q.z;
   }
      
}

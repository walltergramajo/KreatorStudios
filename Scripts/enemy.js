var waypoint : Transform[]; //empty array of transforms
public var speed : float; // var to control enemy speed
private var currentWaypoint : int;

function Update () {

	if(currentWaypoint < waypoint.length){
		var target : Vector3 = waypoint[currentWaypoint].position;
		var moveDirection : Vector3 = target - transform.position;
		var velocity = moveDirection.normalized * speed;
		
		if(moveDirection.magnitude < .5){
			currentWaypoint++;
		}
		
	}else{
		currentWaypoint = 0;
	}
	
	rigidbody.velocity = velocity;

}

function OnDrawGizmos(){
	Gizmos.color = Color.red;	
	Gizmos.DrawCube(GameObject.FindGameObjectWithTag("waypoint").transform.position, new Vector3(0.5, 0.5, 0.5));
}

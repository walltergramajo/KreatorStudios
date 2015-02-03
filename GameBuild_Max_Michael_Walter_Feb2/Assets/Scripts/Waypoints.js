#pragma strict



public static var start: Waypoints;
public var next: Waypoints;
public var isStart : boolean = false;

function Awake(){
	
	if(!next){
		Debug.LogWarning("Waypoint Not Connected");
	}
	
	if(isStart){
		start = this;
	}

}

function OnDrawGizmos(){
	Gizmos.color = Color.red;
	Gizmos.DrawCube(transform.position, new Vector3(0.5, 0.5, 0.5));
	
	if(next){
		Gizmos.color = Color.green;
		Gizmos.DrawLine(transform.position, next.transform.position);
	}
}
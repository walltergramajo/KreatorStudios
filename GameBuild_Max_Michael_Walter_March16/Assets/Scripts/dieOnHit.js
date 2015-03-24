#pragma strict

function OnTriggerEnter () {
	var enemy = transform.GetComponentInParent(EnemySide);
	enemy.Die();
}
public class Items{

	var tagName : String;
	var Description : String;
	var Variable : int;
	var PowerUp : PowerUp;
	var Icon : Texture2D;
	var Amount : int = 0;
	var Instant : boolean = true; 
	var AudioPlay : AudioClip; 
}

enum PowerUp {
	health,
	sprint,
	invulnerability
}
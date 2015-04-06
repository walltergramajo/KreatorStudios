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
	sprintBar,
	invulnerability,
	berry,
	badBerry
}


function Items (tagName : String, Description : String, Variable : int, PowerUp : PowerUp, Icon : Texture2D, Amount : int, Instant :boolean, AudioPlay :AudioClip ){
this.tagName = tagName;
this.Description = Description;
this.Variable = Variable;
this.PowerUp = PowerUp;
this.Icon = Icon;
this.Amount = Amount;
this.Instant = Instant;
this.AudioPlay = AudioPlay;
}
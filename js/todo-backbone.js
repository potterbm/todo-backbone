

// Models
window.Item = Backbone.Model.extend({
	defaults : {
		completed : false
	},
	complete : function() {
		this.completed = true;
	}
});

window.List = Backbone.Collection.extend({
	localStorage : new Backbone.LocalStorage("List"),
	model : Item,
	url : "../api/lists"
});




// Views




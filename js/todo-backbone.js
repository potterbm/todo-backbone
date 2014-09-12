

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
	model : Item,
	url : "../api/lists"
});




// Views




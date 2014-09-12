

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

window.AppView = Backbone.View.extend({
	el : "#list",
	
	initialize : function() {
		this.render();
	},
	
	render : function() {
		this.$el.html("Hello world");
	}
});

var appView = new AppView();
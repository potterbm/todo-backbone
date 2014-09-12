
var app = {};

// Models
app.Item = Backbone.Model.extend({
	defaults : {
		text : '',
		completed : false
	},
	
	localStorage : new Store("todo-item"),
	
	complete : function() {
		this.completed = true;
	}
});

app.List = Backbone.Collection.extend({
	model : Item,
	url : "../api/lists"
});




// Views

app.AppView = Backbone.View.extend({
	el : "#list",
	
	initialize : function() {
		this.render();
	},
	
	render : function() {
		this.$el.html("Hello world");
	}
});

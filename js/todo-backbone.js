
var todo = {};

// Models
todo.Item = Backbone.Model.extend({
	defaults : {
		text : '',
		completed : false
	},
	
	idAttribute : 'data-id'
});


todo.List = Backbone.Collection.extend({
	model : todo.Item,
	
	localStorage : new Store("todo-list")
});




// Views

todo.ItemView = Backbone.View.extend({
	
	tagName : "li",
	
	className : "item",
	
	events : {
		'click' : 'toggleCompleted',
		'click .remove-item-button' : 'delete'
	},
	
	initialize : function() {
		if(this.model.get("completed")) {
			this.$el.addClass("completed");
		}
	},
	
	delete : function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		console.log(todo.app.collection);
		console.log(this.model);
		todo.app.collection.remove(this.model);
		this.model.destroy();
		this.remove();
	},
	
	template : _.template($("#todo-item-template").html()),
	
	toggleCompleted : function(e) {
		this.model.set("completed", !this.model.get("completed"));
		this.$el.toggleClass("completed");
	},
	
	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
	
});



todo.ListView = Backbone.View.extend({
	el : "#list",
	
	initialize : function() {
		this.input = $("#new-item-input");
		this.collection = new todo.List();
		
		// Event Bindings
		this.collection.bind("add", this.add, this);
		this.collection.bind("reset", this.reset, this);
		
		this.collection.fetch();
	},
	
	events : {
		'keypress #new-item-input' : 'createOnEnter'
	},
	
	createOnEnter : function(e) {
		console.log('createOnEnter');
		
		if(e.which !== 13 || !this.input.val().trim()) {
			return;
		}
		
		this.collection.create({text : this.input.val().trim() });
		this.input.val('');
	},
	
	add : function(item) {
		this.$el.append(new todo.ItemView({ model : item }).render().el);
	},
	
	reset : function() {
		this.collection.each(this.add, this);
	},
	
	render : function() {
	}
});



$(document).ready(function(e) {
	
	todo.app = new todo.ListView();
	
});
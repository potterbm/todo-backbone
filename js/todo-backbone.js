
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
		
		this.remove();
	},
	
	template : _.template($("#todo-item-template").html()),
	
	toggleCompleted : function(e) {
		this.model.set("completed") = !this.model.get("completed");
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
		console.log('ListView');
		this.input = $("#new-item-input");
		this.collection = new todo.List();
		
		// Event Bindings
		this.collection.bind("add", this.add);
		this.collection.bind("reset", this.reset);
		
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
		
		todo.collection.create({text : this.input.val().trim() });
		this.input.val('');
	},
	
	add : function(item) {
		var view = new todo.ItemView({ model : item });
		console.log(this.$el);
		console.log(this.el);
		this.$el.append(view.render().el);
	},
	
	reset : function() {
		this.$el.find(".item").remove();
		todo.collection.each(this.add, this);
	},
	
	render : function() {
	}
});



$(document).ready(function(e) {
	
	todo.app = new todo.ListView();
	
});
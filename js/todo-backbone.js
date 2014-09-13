
var todo = {};

// Models
todo.Item = Backbone.Model.extend({
	defaults : {
		text : '',
		completed : false
	},
	
	idAttribute : 'data-id',
	
	complete : function() {
		this.completed = true;
	}
});


todo.List = Backbone.Collection.extend({
	model : todo.Item,
	
	localStorage : new Store("todo-list")
});

todo.collection = new todo.List();




// Views

todo.ItemView = Backbone.View.extend({
	
	tagName : "li",
	
	className : "item",
	
	events : {
		'click' : 'toggleCompleted',
		'click .remove-item-button' : 'delete'
	},
	
	initialize : function() {
		console.log(this.model.get("completed"));
		if(this.model.get("completed")) {
			this.$el.addClass("completed");
		}
	},
	
	delete : function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		
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
		
		// Event Bindings
		todo.collection.bind("add", this.add);
		todo.collection.bind("reset", this.reset);
		
		todo.collection.fetch();
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
		this.$el.html("Hello world");
	}
});

todo.app = new todo.ListView();
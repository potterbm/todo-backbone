
var app = {};

// Models
app.TodoItem = Backbone.Model.extend({
	defaults : {
		text : '',
		completed : false
	},
	
	complete : function() {
		this.completed = true;
	}
});


app.TodoList = Backbone.Collection.extend({
	model : app.TodoItem,
	
	localStorage : new Store("todo-list")
});

app.todoList = new app.TodoList();



// Views


app.TodoItemView = Backbone.View.extend({
	
	tagName : "li",
	
	className : "item",
	
	template : _.template($("#todo-item-template").html()),
	
	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
	
});



app.TodoListView = Backbone.View.extend({
	el : "#list",
	
	initialize : function() {
		console.log('TodoListView');
		this.input = $("#new-item-input");
		
		// Event Bindings
		this.on("add", this.add, this);
		this.on("reset", this.reset, this);
		
		this.fetch();
	},
	
	events : {
		'keypress #new-item-input' : 'createOnEnter',
		'click #new-item-button' : 'createOnClick'
	},
	
	createOnEnter : function(e) {
		console.log('createOnEnter');
		
		if(e.which !== 13 || !this.input.val().trim()) {
			return;
		}
		
		this.createItem();
	},
	
	createOnClick : function(e) {
		console.log('createOnClick');
		
		e.preventDefault();
		e.stopPropagation();
		
		this.createItem();
	},
	
	createItem : function() {
		console.log('create');
		
		app.todoList.create({text : this.input.val().trim() });
		this.input.val('');
	},
	
	add : function(item) {
		var view = new app.TodoItemView({ model : item });
		this.$el.append(view.render().el);
	},
	
	reset : function() {
		this.$el.html('');
		app.todoList.each(this.addOne, this);
	},
	
	render : function() {
		this.$el.html("Hello world");
		
	}
});

app.todoListView = new app.TodoListView();
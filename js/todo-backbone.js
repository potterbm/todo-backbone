
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
	
	className : "list-item",
	
	template : _.template($("#todo-item-template").html()),
	
	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
	
});


app.ListView = Backbone.View.extend({
	el : "#list",
	
	initialize : function() {
		this.input = this.$("#new-item-input");
		
		// Event Bindings
		app.todoList.on("add", this.addOne, this);
		app.todoList.on("reset", this.reset, this);
		
		app.todoList.fetch();
	},
	
	events : {
		'keypress #new-item-input' : 'createTodoOnEnter'
	},
	
	createTodoOnEnter : function(e) {
		if(e.which !== 13 || !this.input.val().trim()) {
			return;
		}
		
		app.todoList.create({ title : this.input.val().trim() });
		this.input.val('');
	},
	
	add : function(item) {
		var view = new app.TodoItemView({ model : todo });
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
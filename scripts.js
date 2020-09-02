//making Backbone Model
var Blog = Backbone.Model.extend({
    defaults: {
        author: '',
        title: '',
        url: ''
    }
})

//making Backbone Collection: which is array of Models
var Blogs = Backbone.Collection.extend({});

//Instantiate two Blogs

var blog1 = new Blog({
    author: 'Ankita',
    title: 'Ankita\'s Blog Portfolio',
    url: 'https://ankitatiwari.netlify.app'
})

var blog2 = new Blog({
    author: 'Ank',
    title: 'Ankita\'s Blog IBD',
    url: 'https://inflammatoryboweldiesease.netlify.app'
})

//Instantiate a COllection
var blogs = new Blogs([blog1,blog2]);

//make Backbone Views
// 1st View : Backbone View for one Blog
var BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: 'tr',
    initialize: function () {
        this.template = _.template($('.blogs-list-template').html());
    },
    render: function () {
        //we are taking the tag through el and then giving it an template and inside the template we are using model, hence we have view for individual blog
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

// 2nd View : Backbone View for all blogs, i.e.,to have all the blogs to be nicely listed/displayed
var BlogsView = Backbone.View.extend({
    model: blogs,
    el: $('.blogs-list'),
    initialize: function () {
        this.model.on('add', this.render, this);
    },
    render: function () {
        //this is assigned to varible self becoz _.each() method dosent allow direct use of this
        var self = this;
        //emptying the el before filling content to avoid adding too much 
        this.$el.html('');
        //this.model refers to blogs
        _.each(this.model.toArray(), function (blog) {
            //for each table row we are gonna append new BlogView and then render to the element
            self.$el.append((new BlogView({ model: blog })).render().$el);
        });
        return this;
    }
});

//Instantiate our blogs view
var blogsView = new BlogsView();

// create a document ready code which loads once the page is compelted loaded
$(document).ready(function () {
    //when add button is clicked we will run the function to create a new Blog
    $('.add-blog').on('click', function () {
        //creating new blog model
        var blog = new Blog({
            author: $('.author-input').val(),
            title: $('.title-input').val(),
            url: $('.url-input').val()
        });
        //Clear entered content in input tag after adding it
        // $('.author-input').val('');
        // $('.title-input').val('');
        // $('.url-input').val('');

        //Just checking in console whether the new blogs are getting added
        console.log(blog.toJSON());

        //Everytime we add a blog we will take the Blogs Collection and add there the new blog created, hence it will trigger the Backbone View all blogs when rendering
        blogs.add(blog);
    });
});
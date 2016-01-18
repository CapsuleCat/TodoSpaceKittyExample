/**
 * TodoApp
 */
TodoApp = React.createClass({
  mixins: [ReactMeteorData, ReactBEM],
  getMeteorData() {
    return {
      tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
    }
  },

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    var text = this.refs.textInput.value.trim();
 
    Tasks.insert({
      text: text,
      createdAt: new Date() // current time
    });
 
    // Clear form
    this.refs.textInput.value = "";
  },

  renderTasks() {
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  bem_blocks: ['todo-app'],
  bem_render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>

           <form className="new-task" onSubmit={this.handleSubmit} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks" />
          </form>
        </header>
 
        <ul className="collection">
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});

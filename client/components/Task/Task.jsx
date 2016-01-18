/**
 * Task
 */
Task = React.createClass({
  mixins: [React.addons.PureRenderMixin, ReactBEM],
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    task: React.PropTypes.object.isRequired
  },
  getDefaultProps() {
    return {};
  },

 toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: {checked: ! this.props.task.checked}
    });
  },
 
  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  },
 

  bem_blocks: ['task'],
  bem_render() {
    let taskClassName = this.props.task.checked ? "checked" : "";
 
    taskClassName += ' collection-item';

    return (
      <li className={taskClassName}>
        <a href="#!" className="secondary-content" onClick={this.deleteThisTask}>
          <i className="material-icons red-text">delete</i>
        </a>
    
        <input
          type="checkbox"
          readOnly={true}
          checked={this.props.task.checked}
          onClick={this.toggleChecked}
          id={this.props.task._id}/>
 
        <label htmlFor={this.props.task._id} className="text">{this.props.task.text}</label>
      </li>
    );
  }
});

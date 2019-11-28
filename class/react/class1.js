class Widget extends React.Component {
  // how do i make this Component
  // must return a react element
  // can return a list of react elements
  render() {

    let s = '';
    for (let i = 0; i < +this.props.times; i++) {
      s += this.props.greeting;
    }

    return (
      <section>
        <h1>
          <div>{this.props.greeting} Hello from our Component</div>
        </h1>
      </section>
    );
  }

}

//reason why above is going deprecated
//why use a class when you only return one thing?

//prop is a html removeAttribute
//manifests as property on instance
// via this.props.attributeName

function MyComponent(props) {
  return (
    <section>
      <h1>
        <div>{props.exclamation}from our Component</div>
        // React.createElement('div', {}, this.props.greeting)
      </h1>
    </section>
  );
}

ReactDOM.render(
  <div><MyComponent exclamation='!!!!'/><Widget greeting='holaaa' times='3' /><Widget greeting='hi' times='7' /></div>

);


class Greeter extends React.Component{
  render(){
    // const elements = new Array(5);
    const elements = ['foo','bar','baz'];
    const newElements = elements.map((ele, i) => <h1 key = {i}>{i}</h1>)
    return(
      <div>Elements: {newElements}</div>    //need to wrap it in element or it will give error

    );
  }

}

ReactDOM.render(
  <div><Greeter times = '5' /></div>
);

class MyButton extends React.Component {
  constructor(props) {
    // ...
  }
  handleClick() {
    console.log('hello');
    console.log(this.props.greeting);
  }

  render() {
    return(
      <button onClick = {()=>this.handleClick}></button>
    );
  }
}

ReactDOM.render(
  <div><MyButton greeting='hey there!'/></div>
);

/*
read ... this.state.stateName
set ... this.setState({name: value})
//setState is asynchronous
be careful when setting state to an existing state value, especially after already setting state previously

DO NOT do this -> this.state.stateName = ...
(except in constructor)

*/


class Clicker extends React.Component{
  constructor(props){
    super(props);
    this.state = {count: 0},
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.setState({count:this.state.count + 1});
  }

  render(){
    // const elements = new Array(5);
    // const elements = ['foo','bar','baz'];
    // const newElements = elements.map((ele, i) => <h1 key = {i}>{i}</h1>)
    return(
      <div className ='clicker' onClick={this.handleClick}>
      {this.state.count}
      </div>    //need to wrap it in element or it will give error
    );
  }
}

ReactDOM.render(
  <div><Clicker /><Clicker /><Clicker /></div>,
  document.getElementById('root')
)

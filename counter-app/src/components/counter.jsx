/*import React, { Component } from 'react';

class Counter extends Component {
   /* state = {
        value: this.props.counter.value
       
    };*/

    /*constructor() {
        super();//calling constructor of parent(base) class using super() keyword
        this.handleIncrement = this.handleIncrement.bind(this);//bind(this) create new instance of handleIncrement function & in that function
        //this alwyse refrencing the current obj ,that reset handleIncrement
        //console.log("Constructor", this);
    }*/
    //insted of adding constructor we  can add arrow function, it does not rebind this keword but they inherit it
    //Obj.method();
    // function
   /* handleIncrement =()=> {
        //console.log("Increment Clicked", this);//("Increment Clicked", this) this alwyse refrencing the current counter obj
        //this.state.count++; it doent work in react
        //console.log(product);
        this.setState({ value: this.state.value + 1 });
    };*/

    // doHandleIncrement =()=> {
    //     this.handleIncrement({ id: 1});
    // };
/*
    render() {
        return ( 
            <div>
                <span className={ this.getBadgeClasses() }>{this.formatCount()}</span>
                <button 
                 //onClick={this.doHandleIncrement}
                // onClick={()=>this.handleIncrement({id:1})} //inline pass of paramenter  onClick={()=>this.handleIncrement(product)}
                onClick={() => this.props.onIncrement(this.props.Counter)}
                 className="btn btn-secondary btn-sm"
                >
                    Increment
                </button>
                <button
                onClick={() => this.props.onDelete(this.props.counter.id)}
                className="btn btn-danger btn-sm m-2">Delete</button>
            </div>
         );
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += (this.props.counter.value === 0) ? "warning" : "primary";
        return classes;
    }

    formatCount(){
       // const { count } = this.state; //object destructring
        const { value } = this.props.counter;
        return value === 0 ? "Zero" : value;
    }
} 
export default Counter;*/


import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-1">
          <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        </div>
        <div className="col">
          <button
            onClick={() => this.props.onIncrement(this.props.counter)}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>
          <button
            onClick={() => this.props.onDecrement(this.props.counter)}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.props.counter.value === 0 ? "disabled" : ""}
          >
            -
          </button>
          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;

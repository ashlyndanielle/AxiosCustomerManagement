import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';
import { getCustomerList, postCustomer } from '../customers';

class App extends Component {
  constructor() {
    super()
    this.state = {
      customerList: undefined,
      initialLoad: true,
      creating: false,
      currentCustomer: null
    }

  }

  componentDidMount(){
    getCustomerList().then( customerList => {
      this.setState({
        customerList
      })
    })
  }

  startNewCustomer = () => {
    this.setState({
      initialLoad: false,
      creating: true,
      currentCustomer: null
    })
  }

  createCustomer = customer => {
    postCustomer(customer).then( response => {
      this.setState({
        customerList: [...this.state.customerList, response],
        initialLoad: true,
        creating: false
      })
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div className="App__container">
          {
            this.state.customerList ?
            <List
              customerList={this.state.customerList}
              startNewCustomer={this.startNewCustomer}
              />
            : null
          }
          <Workspace initialLoad={this.state.initialLoad}
                    currentCustomer={this.state.currentCustomer}
                    creating={this.state.creating}
                    createCustomer={this.createCustomer}
                  />
        </div>
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';
import { getCustomerList, postCustomer, getCustomer, updateCustomer, deleteCustomer, getTraffic } from '../customers';

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
    getTraffic().then( traffic => {
      console.log('TRAFFIC: ', traffic.features[0])
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

  selectCustomer = customer => {
    getCustomer(customer).then( response => {
      this.setState({
        initialLoad: false,
        currentCustomer: response
      })
    }).catch( () => console.log('select customer failed'))
  }

  saveEdit = (id, propertyObject) => {
    updateCustomer(id, propertyObject).then( customer => {
      console.log('saveEdit response', customer);
      getCustomerList().then( list => {
        this.setState({
          customerList: list,
          currentCustomer: customer
        })
      })
    }).catch( () => console.log('failed to update customer'))
  }

  removeCustomer = id => {
    deleteCustomer(id).then( () => {
      getCustomerList().then( list => {
        this.setState({
          customerList: list,
          initialLoad: true,
          creating: false
        })
      })
    }).catch( () => console.log('failed to delete'));
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
              selectCustomer={this.selectCustomer}
              />
            : null
          }
          <Workspace initialLoad={this.state.initialLoad}
                    currentCustomer={this.state.currentCustomer}
                    creating={this.state.creating}
                    createCustomer={this.createCustomer}
                    saveEdit={this.saveEdit}
                    removeCustomer={this.removeCustomer}
                  />
        </div>
      </div>
    )
  }
}

export default App;

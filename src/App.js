import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import StockList from './components/StockList';
import RecipeList from './components/RecipeList';
import StockItemDetail from './components/StockItemDetail';
import RecipeDetail from './components/RecipeDetail';
import IntakeList from './components/IntakeList';
import IntakeDetail from './components/IntakeDetail';

class App extends Component {

  constructor(props){
    super(props);
    this.state= {loggedIn: false};
  }  

  setLoggedIn = () => {
    this.setState({loggedIn: true});
  }
//TODO: check '/path/:id' works
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <ul>
                {!this.state.loggedIn &&
                <div>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                </div>}

               {true &&
                <div>
                <li>
                  <Link to="/stocks">Stock</Link>
                </li>
                <li>
                <Link to="/recipes">Recipes</Link>
                </li>
                <li>
                <Link to="/intakes">Intakes</Link>
                </li>
                </div>
              }
              </ul>
            </nav>
            <Route path="/login" exact component={() => <Login callback={this.setLoggedIn} loggedIn={this.state.loggedIn}></Login>} />
            <Route path="/register" exact component={Register} />
            <Route path="/stocks" exact component={StockList} />
            <Route path="/recipes" exact component={RecipeList} />
            <Route path="/intakes" exact component={IntakeList} />
            <Route path="/stocks/:id" exact component={StockItemDetail} /> 
            <Route path="/recipes/:id" exact component={RecipeDetail} /> 
            <Route path="/intakes/:id" exact component={IntakeDetail} /> 
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

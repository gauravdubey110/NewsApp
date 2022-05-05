import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Footer from './components/Footer';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            height={5}
            color='#f11946'
            progress={this.state.progress}
          // onLoaderFinished={() => setProgress(0)}
          />

          <Switch>
            <Route exact path="/"><News setProgress={this.setProgress} apiKey={this.apiKey}  key="general" pageSize={8} category="general" /></Route>
            <Route exact path="/business"><News setProgress={this.setProgress} apiKey={this.apiKey}  key="business" pageSize={8} category="business" /></Route>
            <Route exact path="/entertainment"><News setProgress={this.setProgress} apiKey={this.apiKey}  key="entertainment" pageSize={8} category="entertainment" /></Route>
            <Route exact path="/general"><News setProgress={this.setProgress} apiKey={this.apiKey}  key="general2" pageSize={8} category="general" /></Route>
            <Route exact path="/health"><News setProgress={this.setProgress} apiKey={this.apiKey}  key="health" pageSize={8} category="health" /></Route>
            <Route exact path="/science"><News setProgress={this.setProgress} apiKey={this.apiKey}  key="science" pageSize={8} category="science" /></Route>
            <Route exact path="/sports"><News setProgress={this.setProgress} apiKey={this.apiKey}  key="sports" pageSize={8} category="sports" /></Route>
            <Route exact path="/technology"><News setProgress={this.setProgress} apiKey={this.apiKey}  key="technology" pageSize={8} category="technology" /></Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    )
  }
}

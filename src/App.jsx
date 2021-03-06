import React, { Component,Suspense } from 'react';
import { authRoutes,noAuthRoutes } from './config/routhes';
import BasicLayout from '../src/components/basic-layout'
import { Route,Switch } from "react-router-dom";
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { Spin } from 'antd';

const history = createBrowserHistory()
window.browserHistory = history

//git push -u origin chaochenxin 将代码推送到远程分支上去
  class App extends Component {
    render() {
      return (
        <Suspense fallback={<Spin size="large" />}>
          <Router history={history}>
            <Switch>
              {noAuthRoutes.map( (route,index) => 
                <Route {...route} key={index} />
              )}
              <BasicLayout>
                <Switch>
                  {authRoutes.map( (route,index) => 
                    <Route {...route} key={index} />
                  )}
                </Switch>
              </BasicLayout> 
            </Switch>
          </Router>
        </Suspense>  
      );
    }
  }

  export default App;
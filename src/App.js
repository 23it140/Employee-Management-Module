import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeCreate from './pages/EmployeeCreate';
import EmployeeEdit from './pages/EmployeeEdit';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={EmployeeListPage} />
        <Route path="/create" component={EmployeeCreate} />
        <Route path="/edit/:id" component={EmployeeEdit} />
      </Switch>
    </Router>
  );
};

export default App;

import React from 'react';
//import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import Home from "./components/home";
import To_Be_Approved from "./components/to_be_approved";
import CreateUser from "./components/create-user.component";
import Month_Expiration from "./components/month_expiration";
import Account_Blocked from "./components/account_blocked"
import Account_Expired from "./components/account_expired"
import Account_Passed from "./components/account_passed"
import Sales_History from "./components/sales_history"

function App() {

  
  return (
    <Router>
      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit" component={EditExercise} />
      <Route path="/create/:id" component={CreateExercise} />
      <Route path="/user" component={CreateUser} />
      <Route path="/To_Be_Approved" component={To_Be_Approved} />
      <Route path="/Month_Expiration" component={Month_Expiration} />
      <Route path="/Home" component={Home} />
      <Route path="/Account_Blocked" component={Account_Blocked} />
      <Route path="/Account_Expired" component={Account_Expired} />
      <Route path="/Account_Passed" component={Account_Passed} />
      <Route path="/Sales_History" component={Sales_History} />
    </Router>
  );
}

export default App;

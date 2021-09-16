import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import cogoToast from 'cogo-toast';
import moment from "moment";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: [],
      userid: '',
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
};

  onSubmit = () =>{
   console.log('this.state.userid: ', this.state.userid)
    const hotel = {  val: 'project='+this.state.userid, date: moment().unix() }
if(this.state.userid === ''){
    console.log('empty')
}
else{
    cogoToast.loading('Creating Please Wait...').then(() => {
        axios.post('https://superadmins.herokuapp.com/additional_info/add__Additional_Info', hotel)
        .then(res => {res.data ==='Added!'? cogoToast.success('Data Successfully Added'):cogoToast.error('Sorry There are Error Please Try Again '+res.data)});
      });
 
}
  }

  render() {
    return (
      <body>
      
      <div class="dashboard-main-wrapper">
          
           <div class="dashboard-header">
              <nav class="navbar navbar-expand-lg bg-white fixed-top">
                  <a class="navbar-brand" href="../index.html">Gloreto Super Admin</a>
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse " id="navbarSupportedContent">
                      <ul class="navbar-nav ml-auto navbar-right-top">
                          <li class="nav-item">
                              <div id="custom-search" class="top-search-bar">
                                  <input class="form-control" type="text" placeholder="Search.."/>
                              </div>
                          </li>
                         
                          <li class="nav-item dropdown nav-user">
                              <a class="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="../assets/images/avatar-1.jpg" alt="" class="user-avatar-md rounded-circle" /></a>
                              <div class="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                                  <div class="nav-user-info">
                                      <h5 class="mb-0 text-white nav-user-name">
  John Abraham</h5>
                                      <span class="status"></span><span class="ml-2">Available</span>
                                  </div>
                                  <a class="dropdown-item" href="#"><i class="fas fa-user mr-2"></i>Account</a>
                                  <a class="dropdown-item" href="#"><i class="fas fa-cog mr-2"></i>Setting</a>
                                  <a class="dropdown-item" href="#"><i class="fas fa-power-off mr-2"></i>Logout</a>
                              </div>
                          </li>
                      </ul>
                  </div>
              </nav>
          </div>
          <div class="nav-left-sidebar sidebar-dark">
              <div class="menu-list">
                  <nav class="navbar navbar-expand-lg navbar-light">
                      <a class="d-xl-none d-lg-none" href="#">Dashboard</a>
                      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                      </button>
                      <div class="collapse navbar-collapse" id="navbarNav">
                          <ul class="navbar-nav flex-column">
                              <li class="nav-divider">
                                  Menu
                              </li>
                              <li class="nav-item ">
                                <Link to="/" class="nav-link"><i class="fa fa-fw fa-user-circle"></i>Dashboard <span class="badge badge-success">6</span></Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/To_Be_Approved" class="nav-link"><i class="fa fa-fw fa-rocket"></i>To be Approved</Link>
                            </li>
                            <li class="nav-item">
                            <Link to="/Month_Expiration" class="nav-link"><i class="fas fa-fw fa-chart-pie"></i>A month Before Expiration</Link>
                            </li>
                            <li class="nav-item ">
                            <Link to="/user" class="nav-link"><i class="fab fa-fw fa-wpforms"></i>A Week Before Expiration</Link>
                            </li>
                            <li class="nav-item">
                            <Link to="/Home" class="nav-link"><i class="fa fa-fw fa-rocket"></i>List of Hotels</Link>
                            </li>
                            <li class="nav-item">
                            <Link to="/Account_Expired" class="nav-link"><i class="fa fa-fw fa-rocket"></i>List of Expired Hotel</Link>
                            </li>
                            <li class="nav-item">
                            <Link to="/Account_Blocked" class="nav-link"><i class="fa fa-fw fa-rocket"></i>List of Blocked Accounts</Link>
                            </li>
                            <li class="nav-item">
                            <Link to="/Account_Passed" class="nav-link"><i class="fa fa-fw fa-rocket"></i>List of Passed Accounts</Link>
                            </li>
                            <li class="nav-item">
                            <Link to="/Sales_History" class="nav-link"><i class="fa fa-fw fa-rocket"></i>List of Sales History</Link>
                            </li>
                            <li class="nav-item">
                            <Link to="/edit" class="nav-link active"><i class="fas fa-fw fa-table"></i>Website Database</Link>
                            </li>
                          </ul>
                      </div>
                  </nav>
              </div>
          </div>
          <div class="dashboard-wrapper">
              <div class="container-fluid  dashboard-content">
                  <div class="row">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div class="page-header">
                              <h2 class="pageheader-title">Website Database </h2>
                              <p class="pageheader-text">Proin placerat ante duiullam scelerisque a velit ac porta, fusce sit amet vestibulum mi. Morbi lobortis pulvinar quam.</p>
                              <div class="page-breadcrumb">
                                  <nav aria-label="breadcrumb">
                                      <ol class="breadcrumb">
                                          <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">Dashboard</a></li>
                                          <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">Forms</a></li>
                                          <li class="breadcrumb-item active" aria-current="page">Website Database</li>
                                      </ol>
                                  </nav>
                              </div>
                          </div>
                      </div>
                  </div>
               
                      <div class="row">
                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div class="card">
                                  <h5 class="card-header">Create Database for Website</h5>
                                  <div class="card-body">
                                          <div class="form-group">
                                              <label for="inputUserName">User ID</label>
                                              <input id="inputUserName" type="text" name="userid" onChange={this.onChange} data-parsley-trigger="change" required="" placeholder="Enter user ID" autocomplete="off" class="form-control"/>
                                          </div>
                                          <div class="row">
                                              <div class="col-sm-6 pb-2 pb-sm-4 pb-lg-0 pr-0">
                                                  <label class="be-checkbox custom-control custom-checkbox">
                                                      <input type="checkbox" class="custom-control-input"/><span class="custom-control-label">Remember me</span>
                                                  </label>
                                              </div>
                                              <div class="col-sm-6 pl-0">
                                                  <p class="text-right">
                                                      <button  onClick={this.onSubmit} class="btn btn-space btn-primary">Submit</button>
                                                      <button class="btn btn-space btn-secondary">Cancel</button>
                                                  </p>
                                              </div>
                                          </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                </div>    
              
          </div>
      </div>

  </body>
    )
  }
}
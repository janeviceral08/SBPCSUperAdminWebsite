import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScriptTag from 'react-script-tag';
import {Helmet} from "react-helmet";
import Navbar from "./navbar.component"
import moment from "moment";

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class Sales_History extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {for_approval: [], result: []};
  }

  componentDidMount() {

      axios.post('https://superadmins.herokuapp.com/sales_history/get_all_sales')
      .then(response =>this.setState({for_approval: response.data, result: response.data}))
      .catch(function (error) {  console.log('error',error) })
  }

  

  deleteExercise(id) {
    axios.delete('https://superadmins.herokuapp.com/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }



  onChange = event => {
    // this.setState({ [event.target.name]: event.target.value });
    if(event.target.value != ""){
     const newData = this.state.for_approval.filter(item => {
         const itemData = item.name.toUpperCase();
         const textData = event.target.value.toUpperCase();
        
         return itemData.indexOf(textData) > -1
       });
       this.setState({result: newData})
 
    }
    else{
     this.setState({result: this.state.for_approval})
    }
     
      
 };


  render() {

    return (
<body>
    <div class="dashboard-main-wrapper">
        <div class="dashboard-header">
            <nav class="navbar navbar-expand-lg bg-white fixed-top">
                <a class="navbar-brand" href="index.html">Gloreto Super Admin</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto navbar-right-top">
                        <li class="nav-item">
                            <div id="custom-search" class="top-search-bar">
                                <input class="form-control" type="text" placeholder="Search.." />
                            </div>
                        </li>
                        <li class="nav-item dropdown nav-user">
                            <a class="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="assets/images/avatar-1.jpg" alt="" class="user-avatar-md rounded-circle" /></a>
                            <div class="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                                <div class="nav-user-info">
                                    <h5 class="mb-0 text-white nav-user-name">John Abraham </h5>
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
                                <Link  to="/" class="nav-link"><i class="fa fa-fw fa-user-circle"></i>Dashboard <span class="badge badge-success">6</span></Link>
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
                            <Link to="/Home" class="nav-link active"><i class="fa fa-fw fa-rocket"></i>List of Hotels</Link>
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
                            <Link to="/Sales_History" class="nav-link Active"><i class="fa fa-fw fa-rocket"></i>List of Sales History</Link>
                            </li>
                            <li class="nav-item">
                            <Link to="/edit" class="nav-link"><i class="fas fa-fw fa-table"></i>Website Database</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
        <div class="dashboard-wrapper">
            <div class="influence-finder">
                <div class="container-fluid dashboard-content">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="page-header">
                                <h3 class="mb-2"> Sales History Accountsr </h3>
                                <p class="pageheader-text">Proin placerat ante duiullam scelerisque a velit ac porta, fusce sit amet vestibulum mi. Morbi lobortis pulvinar quam.</p>
                                <div class="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">Dashboard</a></li>
                                            <li class="breadcrumb-item active" aria-current="page"> Sales History Accountsr</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="card">
                                <div class="card-body">
                                    <form>
                                        <input class="form-control form-control-lg" type="search" placeholder="Search" aria-label="Search" name="search"  onChange={this.onChange}/>
                                        <button class="btn btn-primary search-btn" type="submit">Search</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card">
                            <h5 class="card-header">Sales History Accounts Table</h5>
                            <div class="card-body">
                                <div class="table-responsive">
                                <table class="table table-striped table-bordered first">
                                        <thead>
                                            <tr>
                                                <th>Email</th>
                                                <th>User Id</th>
                                                <th>Goods</th>
                                                <th>Rooms</th>
                                                <th>Expiration</th>
                                                <th>Total</th>
                                                <th>Date</th>
                                               
                                          
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { this.state.result.map((info,index)=>
                                            <tr key={index}>
                                            <td>{info.email}</td>
                                            <td>{info.user_id}</td>
                                      
                                            <td>payed: {info.price} | {info.name_goods_promo}| {info.number}| {info.description}  </td>
                                            <td>payed: {info.price_room_plan} | {info.name_room_plan}| {info.number_room_plan}| {info.description_room_plan} </td>
                                            <td>{moment(info.expiration * 1000).format('MMM D, YYYY h:mm a')}</td>
                                            <td>{info.price+info.price_room_plan}</td>
                                            <td>{moment(info.createdAt * 1000).format('MMM D, YYYY h:mm a')}</td>
                                         
                                        </tr>
                                            ) }
                                            
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                            <th>Email</th>
                                                <th>User Id</th>
                                                <th>Goods</th>
                                                <th>Rooms</th>
                                                <th>Expiration</th>
                                                <th>total</th>
                                                <th>Date</th>
                                           
                                            </tr>
                                        </tfoot>
                                    </table>
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
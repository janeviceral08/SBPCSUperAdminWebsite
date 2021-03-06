import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScriptTag from 'react-script-tag';
import {Helmet} from "react-helmet";
import Navbar from "./navbar.component"
import moment from "moment";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import cogoToast from 'cogo-toast';

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

export default class Account_Passed extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {
        for_approval: [],
        setShow: false,
        email: "",
        room_price: "",
        room_desc: "",
        room_no: "",
        room_name: "",
        goods_price: "",
        goods_desc: "",
        goods_no: "",
        goods_name: "",
        _partition:"",
        _id:"",
        expiration:"",
        result: [],
  
      };
  }

  componentDidMount() {
      axios.post('https://superadmins.herokuapp.com/admin/passed')
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

  
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  select= event => {

    this.setState({
		[event.target.name]: event.target.value
    })
  }
  onSubmit = event => {
    const { room_price, room_desc, room_no, room_name, goods_price,goods_desc, goods_no, goods_name, _id, expiration, email} = this.state;
  

  //  console.log('expired: ', moment(expiration).unix())

    if(expiration === ''){
        cogoToast.warn('Please Select Date');

    }
    else{
        const sales = {
            expiration:  moment(expiration).unix(),
            price: parseFloat(goods_price),
            name_goods_promo: goods_name,
            number: goods_no,
            description: goods_desc,
            _partition: 'user='+_id,
            createdAt: moment().unix(),
            price_room_plan: parseFloat(room_price),
            name_room_plan: room_name,
            number_room_plan: room_no,
            description_room_plan: room_desc,
            user_id: _id,
            email: email,
        }
            const approved = {
                id: 'user='+_id,
                expiration : moment(expiration).unix(),
                max_Goods :parseFloat(goods_no),
                rooms :parseFloat(room_no),
                createdAt: moment().unix(),
            }
      axios.post('https://superadmins.herokuapp.com/admin/extend_account', approved)
         .then(res =>axios.post('https://superadmins.herokuapp.com/sales_history/add_sales', sales)
         .then(res =>window.location.reload()))    
     /*    axios.post('https://superadmins.herokuapp.com/sales_history/add_sales', sales)
         .then(res =>{   console.log('okey sales' ) })*/
    }
};

   handleClose = () => { this.setState({setShow: false})};

   handleShow = (info) => {
    this.setState({
    _partition: 'project='+info._id,
    _id: info._id,
    setShow: true,
    email: info.name,
    room_price: info.price_room_plan === null || info.price_room_plan === undefined?'':parseFloat(info.price_room_plan),
    room_desc: info.description_room_plan,
    room_no: info.number_room_plan,
    room_name: info.name_room_plan,
    goods_price: info.price === null || info.price_room_plan === undefined? '': parseFloat(info.price),
    goods_desc: info.description,
    goods_no: info.number,
    goods_name: info.name_goods_promo,})};




    handleShowBlocked = (info) => {
   
    
        const approved = {
            id: 'user='+info._id,
            createdAt: moment().unix(),
        }
        
        axios.post('https://superadmins.herokuapp.com/admin/blocked_account_ext', approved)
        .then(res =>window.location.reload())  

    };



        handleShowPass = (info) => {
            const approved = {
                id: 'user='+info._id,
                createdAt: moment().unix(),
            }
            axios.post('https://superadmins.herokuapp.com/admin/pass_account_ext', approved)
         .then(res =>window.location.reload()) 
        };



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
<Modal show={this.state.setShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.email}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        <CardDeck>
  <Card>

    <Card.Body>
      <Card.Title style={{'text-align': 'center'}}>??? {parseFloat(this.state.room_price)} </Card.Title>
      <Card.Text style={{'text-align': 'center'}}>
      {this.state.room_name} <br />  {this.state.room_no}  {this.state.room_desc}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Room Plan</small>
    </Card.Footer>
  </Card>
  <Card>
 
    <Card.Body>
    <Card.Title style={{'text-align': 'center'}}>??? {parseFloat(this.state.goods_price)}</Card.Title>
      <Card.Text style={{'text-align': 'center'}}>
      {this.state.goods_name} <br />  {this.state.goods_no}  {this.state.goods_desc}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Goods Plan</small>
    </Card.Footer>
  </Card>
  
</CardDeck>
            
            <div class="form-group">
                                              <label for="inputUserName">Expiration Date</label>
                                              <input id="inputUserName" type="date" name="expiration" onChange={this.select} data-parsley-trigger="change" required="" placeholder="Enter user ID" autocomplete="off" class="form-control"/>
                                          </div>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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
                            <Link to="/Home" class="nav-link"><i class="fa fa-fw fa-rocket"></i>List of Hotels</Link>
                            </li>
                            <li class="nav-item">
                            <Link to="/Account_Expired" class="nav-link"><i class="fa fa-fw fa-rocket"></i>List of Expired Hotel</Link>
                            </li>
                            <li class="nav-item">
                            <Link to="/Account_Blocked" class="nav-link"><i class="fa fa-fw fa-rocket"></i>List of Blocked Accounts</Link>
                            </li>
                            <li class="nav-item">
                            <Link to="/Account_Passed" class="nav-link active"><i class="fa fa-fw fa-rocket"></i>List of Passed Accounts</Link>
                            </li>
                            <li class="nav-item">
                            <Link to="/Sales_History" class="nav-link"><i class="fa fa-fw fa-rocket"></i>List of Sales History</Link>
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
                                <h3 class="mb-2"> Passed Accounts </h3>
                                <p class="pageheader-text">Proin placerat ante duiullam scelerisque a velit ac porta, fusce sit amet vestibulum mi. Morbi lobortis pulvinar quam.</p>
                                <div class="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">Dashboard</a></li>
                                            <li class="breadcrumb-item active" aria-current="page"> Passed Accounts</li>
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
                                        <input class="form-control form-control-lg" type="search" placeholder="Search" aria-label="Search" name="search"  onChange={this.onChange} />
                                        <button class="btn btn-primary search-btn" type="submit">Search</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card">
                            <h5 class="card-header">Passed Accounts Table</h5>
                            <div class="card-body">
                                <div class="table-responsive">
                                <table class="table table-striped table-bordered first">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Mobile</th>
                                                <th>Hotel Telephone</th>
                                                <th>Hotel Name</th>
                                                <th>Status</th>
                                                <th>Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { this.state.result.map((info,index)=>
                                            <tr key={index}>
                                            <td>{info.full_name}</td>
                                            <td>{info.name}</td>
                                            <td>{info.mobile}</td>
                                            <td>{info.hotel_tel}</td>
                                            <td>{info.hot_name}</td>
                                            <td>{info.status}</td>
                                            <td>{moment(info.created_at * 1000).format('MMM D, YYYY h:mm a')}</td>
                                            <td><a onClick={()=>this.handleShow(info)}>Extend</a> | <a onClick={()=>this.handleShowBlocked(info)}>Blocked</a></td>
                                        </tr>
                                            ) }
                                            
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                            <th>Name</th>
                                                <th>Email</th>
                                                <th>Mobile</th>
                                                <th>Telephone</th>
                                                <th>Hotel Name</th>
                                                <th>Status</th>
                                                <th>Date</th>
                                                <th>Action</th>
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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
         exercises: [],
         current: 0, 
         past: 0, 
         count: 0, 
         current_reserve: 0, 
         past_reserve: 0, 
         count_reserve: 0,
         current_reserve_cancelled: 0, 
         past_reserve_cancelled: 0, 
         count_reserve_cancelled: 0,
         web_past: 0, 
         web_current: 0, 
         web_all: 0,


         expired_past: 0, 
         expired_current: 0, 
         expired_all: 0,


         blocked_past: 0, 
         blocked_current: 0, 
         blocked_all: 0,

         passed_past: 0, 
         passed_current: 0, 
         passed_all: 0,


all_checkin_past: 0,
all_checkin_current: 0,
all_checkin_all: 0,


otc_past: 0,
otc_current: 0,
otc_all: 0,


week_all:[],
week_sales_datas:[],
week_past:[],


month_current:[],
month_sales_datas:[],
month_past:[],


fquarter_current:[],
fquarter_sales_datas:[],
fquarter_past:[],
        };
  }

  componentDidMount() {
      let dates = moment().add(-60, 'days').unix()
      let datess = moment().add(-30, 'days').unix()
      console.log('moment from', dates)
      console.log('moment to', datess)
      const exercise = {
        from: dates,
	    to: datess,
      }
      let dates_current = moment().add(-30, 'days').unix()
      let datess_current = moment().unix()
      console.log('moment from', dates_current)
      console.log('moment to', datess_current)
      const exercise_current = {
        from: dates_current,
        to: datess_current,
      }
      axios.post('https://superadmins.herokuapp.com/admin/hotels_past', exercise)
      .then(response =>this.setState({past: response.data.length}))
      .catch(function (error) {  console.log('error',error) })


        axios.post('https://superadmins.herokuapp.com/admin/hotels_current', exercise_current)
        .then(response =>this.setState({current: response.data.length})) 
        .catch(function (error) {  console.log('error',error) })

          axios.post('https://superadmins.herokuapp.com/admin/hotels_current_count')
          .then(response =>this.setState({count: response.data.length})) 
          .catch(function (error) {  console.log('error',error) })

          axios.post('https://superadmins.herokuapp.com/reservation/reserve_past', exercise)
      .then(response =>this.setState({past_reserve: response.data.length}))
      .catch(function (error) {  console.log('error',error) })


        axios.post('https://superadmins.herokuapp.com/reservation/reserve_current', exercise_current)
        .then(response =>this.setState({current_reserve: response.data.length})) 
        .catch(function (error) {  console.log('error',error) })
        axios.post('https://superadmins.herokuapp.com/reservation/all_reserve')
        .then(response =>this.setState({count_reserve: response.data.length})) 
        .catch(function (error) {  console.log('error',error) })
          axios.post('https://superadmins.herokuapp.com/reservation/cancelled_reserve')
          .then(response =>this.setState({count_reserve_cancelled: response.data.length})) 
          .catch(function (error) {  console.log('error',error) })
          axios.post('https://superadmins.herokuapp.com/reservation/reserve_past_cancelled', exercise)
          .then(response =>this.setState({past_reserve_cancelled: response.data.length}))
          .catch(function (error) {  console.log('error',error) })
    
    
            axios.post('https://superadmins.herokuapp.com/reservation/reserve_current_cancelled', exercise_current)
            .then(response =>this.setState({current_reserve_cancelled: response.data.length})) 
            .catch(function (error) {  console.log('error',error) })

            



            axios.post('https://superadmins.herokuapp.com/additional_info/web_all')
            .then(response =>this.setState({web_all: response.data.length})) 
            .catch(function (error) {  console.log('error',error) })
  
            axios.post('https://superadmins.herokuapp.com/additional_info/web_past', exercise)
        .then(response =>this.setState({web_past: response.data.length}))
        .catch(function (error) {  console.log('error',error) })
  
  
          axios.post('https://superadmins.herokuapp.com/additional_info/web_current', exercise_current)
          .then(response =>this.setState({web_current: response.data.length})) 
          .catch(function (error) {  console.log('error',error) })


const exp ={ todayis : moment().unix()}

          axios.post('https://superadmins.herokuapp.com/admin/expired_all', exp)
          .then(response =>this.setState({expired_all: response.data.length})) 
          .catch(function (error) {  console.log('error',error) })

          axios.post('https://superadmins.herokuapp.com/admin/expired_past', exercise)
      .then(response =>this.setState({expired_past: response.data.length}))
      .catch(function (error) {  console.log('error',error) })


        axios.post('https://superadmins.herokuapp.com/admin/expired_current', exercise_current)
        .then(response =>this.setState({expired_current: response.data.length})) 
        .catch(function (error) {  console.log('error',error) })
        




        axios.post('https://superadmins.herokuapp.com/admin/blocked_all', exp)
        .then(response =>this.setState({blocked_all: response.data.length})) 
        .catch(function (error) {  console.log('error',error) })

        axios.post('https://superadmins.herokuapp.com/admin/blocked_past', exercise)
    .then(response =>this.setState({blocked_past: response.data.length}))
    .catch(function (error) {  console.log('error',error) })


      axios.post('https://superadmins.herokuapp.com/admin/blocked_current', exercise_current)
      .then(response =>this.setState({blocked_current: response.data.length})) 
      .catch(function (error) {  console.log('error',error) })





      axios.post('https://superadmins.herokuapp.com/admin/passed_all', exp)
      .then(response =>this.setState({passed_all: response.data.length})) 
      .catch(function (error) {  console.log('error',error) })

      axios.post('https://superadmins.herokuapp.com/admin/passed_past', exercise)
  .then(response =>this.setState({passed_past: response.data.length}))
  .catch(function (error) {  console.log('error',error) })


    axios.post('https://superadmins.herokuapp.com/admin/passed_current', exercise_current)
    .then(response =>this.setState({passed_current: response.data.length})) 
    .catch(function (error) {  console.log('error',error) })




    axios.post('https://superadmins.herokuapp.com/checkout/all_checkin_all', exp)
    .then(response =>this.setState({all_checkin_all: response.data.length})) 
    .catch(function (error) {  console.log('error',error) })

    axios.post('https://superadmins.herokuapp.com/checkout/all_checkin_past', exercise)
.then(response =>this.setState({all_checkin_past: response.data.length}))
.catch(function (error) {  console.log('error',error) })


  axios.post('https://superadmins.herokuapp.com/checkout/all_checkin_current', exercise_current)
  .then(response =>this.setState({all_checkin_current: response.data.length})) 
  .catch(function (error) {  console.log('error',error) })










  axios.post('https://superadmins.herokuapp.com/checkout/otc_all', exp)
    .then(response =>this.setState({otc_all: response.data.length})) 
    .catch(function (error) {  console.log('error',error) })

    axios.post('https://superadmins.herokuapp.com/checkout/otc_past', exercise)
.then(response =>this.setState({otc_past: response.data.length}))
.catch(function (error) {  console.log('error',error) })


  axios.post('https://superadmins.herokuapp.com/checkout/otc_current', exercise_current)
  .then(response =>this.setState({otc_current: response.data.length})) 
  .catch(function (error) {  console.log('error',error) })


  





 
  axios.post('https://superadmins.herokuapp.com/sales_history/week_current', exercise_current)
  .then(response =>this.setState({week_all: response.data, week_sales_datas: response.data})) 
  .catch(function (error) {  console.log('error',error) })

  axios.post('https://superadmins.herokuapp.com/sales_history/week_past', exercise)
.then(response =>this.setState({week_past: response.data}))
.catch(function (error) {  console.log('error',error) })



     


let dates_month = moment().add(-14, 'days').unix()
      let datess_month  = moment().add(-7, 'days').unix()
    
      const exercise_month = {
        from: dates_month ,
	    to: datess_month ,
      }
      let dates_current_month  = moment().add(-7, 'days').unix()
      let datess_current_month  = moment().unix()

      const exercise_currents_month = {
        from: dates_current_month ,
        to: datess_current_month ,
      }
     


      axios.post('https://superadmins.herokuapp.com/sales_history/month_current', exercise_currents_month)
      .then(response =>this.setState({month_current: response.data, month_sales_datas: response.data})) 
      .catch(function (error) {  console.log('error',error) })
    
      axios.post('https://superadmins.herokuapp.com/sales_history/month_past', exercise_month)
    .then(response =>this.setState({month_past: response.data}))
    .catch(function (error) {  console.log('error',error) })
    






    
let dates_fquarter= moment().add(-730, 'days').unix()
let datess_fquarter = moment().add(-365, 'days').unix()

const exercise_fquarter= {
  from: dates_fquarter,
  to: datess_fquarter,
}
let dates_current_fquarter = moment().add(-365, 'days').unix()
let datess_current_fquarter = moment().unix()

const exercise_currents_fquarter= {
  from: dates_current_fquarter,
  to: datess_current_fquarter,
}



axios.post('https://superadmins.herokuapp.com/sales_history/fquarter_current', exercise_currents_fquarter)
.then(response =>this.setState({fquarter_current: response.data, fquarter_sales_datas: response.data})) 
.catch(function (error) {  console.log('error',error) })

axios.post('https://superadmins.herokuapp.com/sales_history/fquarter_past', exercise_fquarter)
.then(response =>this.setState({fquarter_past: response.data}))
.catch(function (error) {  console.log('error',error) })

       
  }

  deleteExercise(id) {
    axios.delete('https://superadmins.herokuapp.com/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }



  render() {

      let inc = this.state.current - this.state.past;
      let per = inc / this.state.past;
      let res = per * 100;




      let inc_reserve = this.state.current_reserve - this.state.past_reserve;
      let per_reserve = inc_reserve / this.state.past_reserve;
      let res_reserve = per_reserve * 100;





      let inc_reserve_cancelled = this.state.current_reserve_cancelled - this.state.past_reserve_cancelled;
      let per_reserve_cancelled = inc_reserve_cancelled / this.state.past_reserve_cancelled;
      let res_reserve_cancelled = per_reserve_cancelled * 100;






      let inc_web= this.state.web_current - this.state.web_past;
      let per_web = inc_web / this.state.web_past;
      let res_web_all = per_web * 100;


      let inc_expired= this.state.expired_current - this.state.expired_past;
      let per_expired = inc_expired / this.state.expired_past;
      let res_expired_all = per_expired * 100;


      let inc_blocked= this.state.blocked_current - this.state.blocked_past;
      let per_blocked = inc_blocked / this.state.blocked_past;
      let res_blocked_all = per_blocked * 100;



      let inc_passed= this.state.passed_current - this.state.passed_past;
      let per_passed= inc_passed / this.state.passed_past;
      let res_passed_all = per_passed * 100;



      let inc_all_checkin= this.state.all_checkin_current - this.state.all_checkin_past;
      let per_all_checkin= inc_all_checkin / this.state.all_checkin_past;
      let res_all_checkin_all = per_all_checkin * 100;

  
      let inc_otc= this.state.otc_current - this.state.otc_past;
      let per_otc= inc_otc / this.state.otc_past;
      let res_otc_all = per_otc * 100;


      let week_all= this.state.week_all.reduce((sum, i) => (  sum += parseFloat(i.price_room_plan)+parseFloat(i.price) ), 0)
      let week_past =this.state.week_past.reduce((sum, i) => (  sum += parseFloat(i.price_room_plan)+parseFloat(i.price)   ), 0)
      let inc_week_sales= week_all - week_past;
      let per_week_sales= inc_week_sales / week_past;
      let res_week_sales_all = per_week_sales * 100;



      let month_current= this.state.month_current.reduce((sum, i) => (  sum += parseFloat(i.price_room_plan)+parseFloat(i.price) ), 0)
      let month_past =this.state.month_past.reduce((sum, i) => (  sum += parseFloat(i.price_room_plan)+parseFloat(i.price)   ), 0)
      let inc_month_sales= month_current - month_past;
      let per_month_sales= inc_month_sales / month_past;
      let res_month_sales_all = per_month_sales * 100;


      let fquarter_current= this.state.fquarter_current.reduce((sum, i) => (  sum += parseFloat(i.price_room_plan)+parseFloat(i.price) ), 0)
      let fquarter_past =this.state.fquarter_past.reduce((sum, i) => (  sum += parseFloat(i.price_room_plan)+parseFloat(i.price)   ), 0)
      let inc_fquarter_sales= fquarter_current - fquarter_past;
      let per_fquarter_sales= inc_fquarter_sales / fquarter_past;
      let res_fquarter_sales_all = per_fquarter_sales * 100;
 
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
                                <input class="form-control" type="text" placeholder="Search.."/>
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
                            <Link  to="/" class="nav-link active"><i class="fa fa-fw fa-user-circle"></i>Dashboard <span class="badge badge-success">6</span></Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/To_Be_Approved" class="nav-link"><i class="fas fa-clipboard-check"></i>To be Approved</Link>
                            </li>
                            <li class="nav-item">
                            <Link to="/Month_Expiration" class="nav-link"><i class="fas fa-exclamation-circle"></i>A month Before Expiration</Link>
                            </li>
                            <li class="nav-item ">
                            <Link to="/user" class="nav-link"><i class="far fa-clock"></i>A Week Before Expiration</Link>
                            </li>
                            <li class="nav-item">
                            <Link to="/Home" class="nav-link"><i class="fab fa-fw fa-wpforms"></i>List of Hotels</Link>
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
                            <Link to="/edit" class="nav-link"><i class="fas fa-database"></i>Website Database</Link>
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
                            <h3 class="mb-2">Dashboard</h3>
                            <p class="pageheader-text">Lorem ipsum dolor sit ametllam fermentum ipsum eu porta consectetur adipiscing elit.Nullam vehicula nulla ut egestas rhoncus.</p>
                            <div class="page-breadcrumb">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">Dashboard</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="text-muted">Hotels</h5>
                                <div class="metric-value d-inline-block">
                                    <h1 class="mb-1 text-primary">{this.state.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                                </div>
                                {res > 0?
                                <div class="metric-label d-inline-block float-right text-success">
                                <i class="fa fa-fw fa-caret-up"></i><span>{res.toFixed(2)}%</span>
                            </div>
                                :
                                <div class="metric-label d-inline-block float-right text-danger">
                                <i class="fa fa-fw fa-caret-down"></i><span>{Math.abs(res.toFixed(2))}%</span>
                            </div>
                            }
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="text-muted">Booking</h5>
                                <div class="metric-value d-inline-block">
                                    <h1 class="mb-1 text-primary">{this.state.count_reserve.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                                </div>
                                {res_reserve > 0?
                                <div class="metric-label d-inline-block float-right text-success">
                                <i class="fa fa-fw fa-caret-up"></i><span>{res_reserve.toFixed(2)}%</span>
                            </div>
                                :
                                <div class="metric-label d-inline-block float-right text-danger">
                                <i class="fa fa-fw fa-caret-down"></i><span>{Math.abs(res_reserve.toFixed(2))}%</span>
                            </div>
                            }
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="text-muted">Cancelled Booking</h5>
                                <div class="metric-value d-inline-block">
                                    <h1 class="mb-1 text-primary">{this.state.count_reserve_cancelled.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                                </div>
                                {res_reserve_cancelled > 0?
                                <div class="metric-label d-inline-block float-right text-success">
                                <i class="fa fa-fw fa-caret-up"></i><span>{res_reserve_cancelled.toFixed(2)}%</span>
                            </div>
                                :
                                <div class="metric-label d-inline-block float-right text-danger">
                                <i class="fa fa-fw fa-caret-down"></i><span>{Math.abs(res_reserve_cancelled.toFixed(2))}%</span>
                            </div>
                            }
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="text-muted">Websites</h5>
                                <div class="metric-value d-inline-block">
                                    <h1 class="mb-1 text-primary">{this.state.web_all.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                                </div>
                                {res_web_all > 0?
                                <div class="metric-label d-inline-block float-right text-success">
                                <i class="fa fa-fw fa-caret-up"></i><span>{res_web_all.toFixed(2)}%</span>
                            </div>
                                :
                                <div class="metric-label d-inline-block float-right text-danger">
                                <i class="fa fa-fw fa-caret-down"></i><span>{Math.abs(res_web_all.toFixed(2))}%</span>
                            </div>
                            }
                            </div>
                        </div>
                    </div>
                </div>
               
                
                <div class="row">
                    <div class="col-xl-5 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div class="card">
                            <h5 class="card-header"> Sales Preview</h5>
                            <div class="card-body p-0">
                                <ul class="social-sales list-group list-group-flush">
                                    <li class="list-group-item social-sales-content"><span class="social-sales-name">This Week</span>
                                   
                                    {res_month_sales_all < 0?
                                     <span class="social-sales-count text-dark">{this.state.month_sales_datas.reduce((sum, i) => (
              
                                        sum += parseFloat(i.price_room_plan)+parseFloat(i.price)
                                      ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') } <span class="icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light"><i class="fa fa-fw fa-arrow-down"></i></span><span class="ml-1 text-danger">{res_month_sales_all.toFixed(2)}%</span> </span>  
                                    : <span class="social-sales-count text-dark">{this.state.month_sales_datas.reduce((sum, i) => (
              
                                        sum += parseFloat(i.price_room_plan)+parseFloat(i.price)
                                      ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') } <span class="icon-circle-small icon-box-xs text-success ml-4 bg-success-light"><i class="fa fa-fw fa-arrow-up"></i></span><span class="ml-1 text-success">{res_month_sales_all.toFixed(2)}%</span> </span>  
                                
                                }
                                   
                                    </li>
                                    <li class="list-group-item social-sales-content"><span class="social-sales-name">This Month</span>
                                    {res_week_sales_all < 0?
                                     <span class="social-sales-count text-dark">{this.state.week_sales_datas.reduce((sum, i) => (
              
                                        sum += parseFloat(i.price_room_plan)+parseFloat(i.price)
                                      ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') } <span class="icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light"><i class="fa fa-fw fa-arrow-down"></i></span><span class="ml-1 text-danger">{res_week_sales_all.toFixed(2)}%</span> </span>  
                                    : <span class="social-sales-count text-dark">{this.state.week_sales_datas.reduce((sum, i) => (
              
                                        sum += parseFloat(i.price_room_plan)+parseFloat(i.price)
                                      ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') } <span class="icon-circle-small icon-box-xs text-success ml-4 bg-success-light"><i class="fa fa-fw fa-arrow-up"></i></span><span class="ml-1 text-success">{res_week_sales_all.toFixed(2)}%</span> </span>  
                                
                                }  </li>
                                    <li class="list-group-item social-sales-content"><span class="social-sales-name">Annual</span>{res_fquarter_sales_all < 0?
                                     <span class="social-sales-count text-dark">{this.state.fquarter_sales_datas.reduce((sum, i) => (
              
                                        sum += parseFloat(i.price_room_plan)+parseFloat(i.price)
                                      ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') } <span class="icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light"><i class="fa fa-fw fa-arrow-down"></i></span><span class="ml-1 text-danger">{res_fquarter_sales_all.toFixed(2)}%</span> </span>  
                                    : <span class="social-sales-count text-dark">{this.state.fquarter_sales_datas.reduce((sum, i) => (
              
                                        sum += parseFloat(i.price_room_plan)+parseFloat(i.price)
                                      ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') } <span class="icon-circle-small icon-box-xs text-success ml-4 bg-success-light"><i class="fa fa-fw fa-arrow-up"></i></span><span class="ml-1 text-success">{res_fquarter_sales_all.toFixed(2)}%</span> </span>  
                                
                                }    </li>
                        
                                </ul>
                            </div>
                            <div class="card-footer text-center">
                                <a href="#" class="btn-primary-link">View Details</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-7 col-lg-8 col-md-8 col-sm-12 col-12">
                        <div class="card">
                            <h5 class="card-header"> Check-ins and Accounts</h5>
                            <div class="card-body p-0">
                                <ul class="traffic-sales list-group list-group-flush">
                                <li class="traffic-sales-content list-group-item">
                                        <span class="traffic-sales-name">All Check-in
                                            <span class="traffic-sales-amount ">{this.state.all_checkin_all.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}   
                                            {res_all_checkin_all > 0?
                             <span>
                             <span class="icon-circle-small icon-box-xs text-success ml-4 bg-success-light">
                             <i class="fa fa-fw fa-arrow-up"></i>
                         </span>
                         <span class="ml-1 text-success">{res_all_checkin_all.toFixed(2)}%
                         </span> </span>
                                :
                                <span>
                                <span class="icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light">
                                <i class="fa fa-fw fa-arrow-down"></i>
                            </span>
                            <span class="ml-1 text-danger">{res_all_checkin_all.toFixed(2)}%
                            </span> </span>
                            }
                                               
                                               
                                               
                                               
                                            </span>
                                        </span>
                                    </li>
                                    <li class="traffic-sales-content list-group-item">
                                        <span class="traffic-sales-name">Over the Counter Check-in
                                            <span class="traffic-sales-amount ">{this.state.otc_all.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}   
                                            {res_otc_all > 0?
                             <span>
                             <span class="icon-circle-small icon-box-xs text-success ml-4 bg-success-light">
                             <i class="fa fa-fw fa-arrow-up"></i>
                         </span>
                         <span class="ml-1 text-success">{res_otc_all.toFixed(2)}%
                         </span> </span>
                                :
                                <span>
                                <span class="icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light">
                                <i class="fa fa-fw fa-arrow-down"></i>
                            </span>
                            <span class="ml-1 text-danger">{res_otc_all.toFixed(2)}%
                            </span> </span>
                            }
                                               
                                               
                                               
                                               
                                            </span>
                                        </span>
                                    </li>
                                    <li class="traffic-sales-content list-group-item">
                                        <span class="traffic-sales-name">Expired Accounts
                                            <span class="traffic-sales-amount ">{this.state.expired_all.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}   
                                            {res_expired_all > 0?
                             <span>
                             <span class="icon-circle-small icon-box-xs text-success ml-4 bg-success-light">
                             <i class="fa fa-fw fa-arrow-up"></i>
                         </span>
                         <span class="ml-1 text-success">{res_expired_all.toFixed(2)}%
                         </span> </span>
                                :
                                <span>
                                <span class="icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light">
                                <i class="fa fa-fw fa-arrow-down"></i>
                            </span>
                            <span class="ml-1 text-danger">{res_expired_all.toFixed(2)}%
                            </span> </span>
                            }
                                               
                                               
                                               
                                               
                                            </span>
                                        </span>
                                    </li>
                                    <li class="traffic-sales-content list-group-item">
                                        <span class="traffic-sales-name">Blocked Accounts
                                        <span class="traffic-sales-amount ">{this.state.blocked_all.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}   
                                            {res_blocked_all > 0?
                             <span>
                             <span class="icon-circle-small icon-box-xs text-success ml-4 bg-success-light">
                             <i class="fa fa-fw fa-arrow-up"></i>
                         </span>
                         <span class="ml-1 text-success">{res_blocked_all.toFixed(2)}%
                         </span> </span>
                                :
                                <span>
                                <span class="icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light">
                                <i class="fa fa-fw fa-arrow-down"></i>
                            </span>
                            <span class="ml-1 text-danger">{res_blocked_all.toFixed(2)}%
                            </span> </span>
                            }
                                               
                                               
                                               
                                               
                                            </span>
                                        </span>
                                    </li>
                                    <li class="traffic-sales-content list-group-item">
                                        <span class="traffic-sales-name">Passed Accounts
                                        <span class="traffic-sales-amount ">{this.state.passed_all.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}   
                                            {res_passed_all > 0?
                             <span>
                             <span class="icon-circle-small icon-box-xs text-success ml-4 bg-success-light">
                             <i class="fa fa-fw fa-arrow-up"></i>
                         </span>
                         <span class="ml-1 text-success">{res_passed_all.toFixed(2)}%
                         </span> </span>
                                :
                                <span>
                                <span class="icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light">
                                <i class="fa fa-fw fa-arrow-down"></i>
                            </span>
                            <span class="ml-1 text-danger">{res_passed_all.toFixed(2)}%
                            </span> </span>
                            }
                                               
                                               
                                               
                                               
                                            </span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div class="card-footer text-center">
                                <a href="#" class="btn-primary-link">View Details</a>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
            <div class="footer">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            Copyright © 2018 Gloreto Super Admin. All rights reserved. Dashboard by <a href="https://colorlib.com/wp/">Colorlib</a>.
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div class="text-md-right footer-links d-none d-sm-block">
                                <a href="javascript: void(0);">About</a>
                                <a href="javascript: void(0);">Support</a>
                                <a href="javascript: void(0);">Contact Us</a>
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
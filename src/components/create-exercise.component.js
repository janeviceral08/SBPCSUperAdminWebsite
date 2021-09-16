import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import empty from '../files/assets/images/avatar-1.jpg'

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      datas: [],
      feedback:[],
      reserve:0,
      reserve_all:0,
      reserve_cancel:0,
      reserve_confirm:0,
      rooms:0,
      current:0,
      checkout:0,
      goods: 0


    }
  }

  componentDidMount() {
    const exercise_current = {
        id: this.props.match.params.id,
      }

      const hotel = {  val: 'project='+this.props.match.params.id.slice(5), }


    axios.post('https://superadmins.herokuapp.com/admin/hotel_infos', exercise_current)
      .then(response =>this.setState({datas: response.data }))
      .catch(function (error) {  console.log('error',error) })
     


      axios.post('https://superadmins.herokuapp.com/room_type/', hotel)
      .then(response => {
        this.setState({ rooms: response.data.length  })
      })
      axios.post('https://superadmins.herokuapp.com/Checkin/get_Checkin', hotel)
      .then(response => {
        this.setState({ current: response.data.length  })
      })
      axios.post('https://superadmins.herokuapp.com/Checkout/get_Checkout', hotel)
      .then(response => {
        this.setState({ checkout: response.data.length  })
      })
      axios.post('https://superadmins.herokuapp.com/Goods/get_Goods', hotel)
      .then(response => {
        this.setState({ goods: response.data.length  })
      })

      axios.post('https://superadmins.herokuapp.com/reservation/reserve/', hotel)
      .then(response => this.setState({ reserve: response.data.length }))
      .catch((error) => {
        console.log(error);
      })

      axios.post('https://superadmins.herokuapp.com/reservation/reserve_all/', hotel)
      .then(response =>this.setState({ reserve_all: response.data.length }))
      .catch((error) => {
        console.log(error);
      })

      axios.post('https://superadmins.herokuapp.com/reservation/reserve_cancelled/', hotel)
      .then(response => this.setState({ reserve_cancel: response.data.length }))
      .catch((error) => {
        console.log(error);
      })

      axios.post('https://superadmins.herokuapp.com/reservation/reserve_confirm/', hotel)
      .then(response => this.setState({ reserve_confirm: response.data.length }))
      .catch((error) => {
        console.log(error);
      })


      axios.post('https://superadmins.herokuapp.com/feedback/View_Feedback/', hotel)
      .then(response => {
        this.setState({ feedback: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
    }
  

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('https://superadmins.herokuapp.com/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

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
                                  <input class="form-control" type="text" placeholder="Search.."/>
                              </div>
                          </li>
                        
                          <li class="nav-item dropdown nav-user">
                              <a class="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={empty} alt="" class="user-avatar-md rounded-circle"/></a>
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
              <div class="influence-profile">
                  <div class="container-fluid dashboard-content ">
                      <div class="row">
                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div class="page-header">
                                  <h3 class="mb-2">Hotel Profile </h3>
                                  <p class="pageheader-text">Proin placerat ante duiullam scelerisque a velit ac porta, fusce sit amet vestibulum mi. Morbi lobortis pulvinar quam.</p>
                                  <div class="page-breadcrumb">
                                      <nav aria-label="breadcrumb">
                                          <ol class="breadcrumb">
                                              <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">Dashboard</a></li>
                                              <li class="breadcrumb-item active" aria-current="page">Hotel Profile</li>
                                          </ol>
                                      </nav>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                              <div class="card">
                                  <div class="card-body">
                                      <div class="user-avatar text-center d-block">
                                          <img src={empty} alt="User Avatar" class="rounded-circle user-avatar-xxl"/>
                                      </div>
                                      <div class="text-center">
                                          <h2 class="font-24 mb-0">{this.state.datas.hot_name}</h2>
                                          <p>{this.state.datas.full_name}<br /> {this.state.datas._partition}</p>
                                      </div>
                                  </div>
                                  <div class="card-body border-top">
                                      <h3 class="font-16">Contact Information</h3>
                                      <div class="">
                                          <ul class="list-unstyled mb-0">
                                          <li class="mb-2"><i class="fas fa-fw fa-envelope mr-2"></i>{this.state.datas.name}</li>
                                          <li class="mb-0"><i class="fas fa-fw fa-phone mr-2"></i>{this.state.datas.hot_address}</li>
                                          <li class="mb-0"><i class="fa fa-map-marker-alt mr-2"></i>{this.state.datas.mobile}</li>
                                      </ul>
                                      </div>
                                  </div>
                               
                                  <div class="card-body border-top">
                                      <h3 class="font-16">Hotel Information</h3>
                                      <div class="">
                                          <ul class="mb-0 list-unstyled">
                                          <li class="mb-1"><a href="#"><i class="fas fa-phone-square mr-1 facebook-color"></i>{this.state.datas.hotel_tel}</a></li>
                                          <li class="mb-1"><a href="#"><i class="fas fa-mobile-alt mr-1 twitter-color"></i>{this.state.datas.hot_mobile}</a></li>
                                          <li class="mb-1"><a href="#"><i class="fas fa-globe mr-1 instagram-color"></i>{this.state.datas.hot_website}</a></li>
                                          <li class="mb-1"><a href="#"><i class="fas fa-envelope mr-1 rss-color"></i>{this.state.datas.hotel_email}</a></li>
                                          <li class="mb-1"><a href="#"><i class="fas fa-cart-plus mr-1 pinterest-color"></i>{this.state.goods} out of {this.state.datas.max_Goods}</a></li>
                                          <li class="mb-1"><a href="#"><i class="fas fa-building mr-1 youtube-color"></i>{this.state.rooms} out of {this.state.datas.rooms}</a></li>
                                      </ul>
                                      </div>
                                  </div>
                                 
                              </div>
                          </div>
                          <div class="col-xl-9 col-lg-9 col-md-7 col-sm-12 col-12">
                              <div class="influence-profile-content pills-regular">
                                  <ul class="nav nav-pills mb-3 nav-justified" id="pills-tab" role="tablist">
                                      <li class="nav-item">
                                          <a class="nav-link active" id="pills-campaign-tab" data-toggle="pill" href="#pills-campaign" role="tab" aria-controls="pills-campaign" aria-selected="true">About</a>
                                      </li>
                                      <li class="nav-item">
                                          <a class="nav-link" id="pills-review-tab" data-toggle="pill" href="#pills-review" role="tab" aria-controls="pills-review" aria-selected="false">Reviews</a>
                                      </li>
                                  </ul>
                                  <div class="tab-content" id="pills-tabContent">
                                      <div class="tab-pane fade show active" id="pills-campaign" role="tabpanel" aria-labelledby="pills-campaign-tab">
                                          
                                          <div class="section-block">
                                              <h3 class="section-title">Hotel Statistics</h3>
                                          </div>
                                          <div class="card">
                                              <div class="card-body">
                                                  <div class="row">
                                                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                          <div class="media influencer-profile-data d-flex align-items-center p-2">
                                                              <div class="mr-4">
                                                                  <img src={empty} alt="User Avatar" class="user-avatar-lg"/>
                                                              </div>
                                                              <div class="media-body ">
                                                                  <div class="influencer-profile-data">
                                                                      <h3 class="m-b-10">Hotel Online Booking Statistics</h3>
                                                                      <p>
                                                                          <span class="m-r-20 d-inline-block"> Publish Date
                                                                              <span class="m-l-10 text-secondary">{moment(this.state.datas.created_at * 1000).format('D MMM, YYYY h:mm a')}</span>
                                                                          </span>
                                                                              <span class="m-r-20 d-inline-block">Ends <span class="m-l-10  text-info">{moment(this.state.datas.expiration * 1000).format('D MMM, YYYY h:mm a')}</span>
                                                                          </span>
                                                                      </p>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div class="border-top card-footer p-0">
                                                  <div class="campaign-metrics d-xl-inline-block">
                                                      <h4 class="mb-0">{this.state.reserve_all}</h4>
                                                      <p>Total Booking</p>
                                                  </div>
                                                  <div class="campaign-metrics d-xl-inline-block">
                                                      <h4 class="mb-0">{this.state.reserve}</h4>
                                                      <p>Total Pending</p>
                                                  </div>
                                                  <div class="campaign-metrics d-xl-inline-block">
                                                      <h4 class="mb-0">{this.state.reserve}</h4>
                                                      <p>Total Confirmed</p>
                                                  </div>
                                                  <div class="campaign-metrics d-xl-inline-block">
                                                      <h4 class="mb-0">{this.state.reserve_cancel}</h4>
                                                      <p>Total Cancelled</p>
                                                  </div>
                                               
                                              </div>
                                          </div>
                                          <div class="card">
                                              <div class="card-body">
                                                  <div class="row">
                                                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                          <div class="media influencer-profile-data d-flex align-items-center p-2">
                                                              <div class="mr-4">
                                                                  <img src={empty} alt="User Avatar" class="rounded-circle user-avatar-lg"/>
                                                              </div>
                                                              <div class="media-body">
                                                                   <h3 class="m-b-10">Hotel On-Site Booking Statistics</h3>
                                                                   <p>
                                                                          <span class="m-r-20 d-inline-block"> Publish Date
                                                                              <span class="m-l-10 text-secondary">{moment(this.state.datas.created_at * 1000).format('D MMM, YYYY h:mm a')}</span>
                                                                          </span>
                                                                              <span class="m-r-20 d-inline-block">Ends <span class="m-l-10  text-info">{moment(this.state.datas.expiration * 1000).format('D MMM, YYYY h:mm a')}</span>
                                                                          </span>
                                                                      </p>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div class="border-top card-footer p-0">
                                                  <div class="campaign-metrics d-xl-inline-block">
                                                      <h4 class="mb-0 ">{this.state.checkout}</h4>
                                                      <p>Total Guest</p>
                                                  </div>
                                                  <div class="campaign-metrics d-xl-inline-block">
                                                      <h4 class="mb-0 ">{this.state.current}</h4>
                                                      <p>Current Guest</p>
                                                  </div>
                                              </div>
                                          </div>
                                          
                                      </div>
                                      
                                      <div class="tab-pane fade" id="pills-review" role="tabpanel" aria-labelledby="pills-review-tab">
                                          <div class="card">
                                              <h5 class="card-header">Guest Reviews</h5>
                                             
                                                {this.state.feedback.map((info, index)=>
                                                 <div class="card-body border-top">
                                                 <div class="review-block">
                                                     <p class="review-text font-italic m-0">“{info.feedback}”</p>

                                                     {info.rate == 1 ?
					<div class="rating-star mb-4">
                    <i class="fa fa-fw fa-star"></i>
                </div>
						:
						info.rate == 2 ?
                        <div class="rating-star mb-4">
                        <i class="fa fa-fw fa-star"></i>
                        <i class="fa fa-fw fa-star"></i>
                    </div>
					:
					info.rate == 3 ?
                    <div class="rating-star mb-4">
                    <i class="fa fa-fw fa-star"></i>
                    <i class="fa fa-fw fa-star"></i>
                    <i class="fa fa-fw fa-star"></i>
                </div>
					:
					info.rate == 4 ?
					<div class="rating-star mb-4">
                                                         <i class="fa fa-fw fa-star"></i>
                                                         <i class="fa fa-fw fa-star"></i>
                                                         <i class="fa fa-fw fa-star"></i>
                                                         <i class="fa fa-fw fa-star"></i>
                                                     </div>
					:
					<div class="rating-star mb-4">
                                                         <i class="fa fa-fw fa-star"></i>
                                                         <i class="fa fa-fw fa-star"></i>
                                                         <i class="fa fa-fw fa-star"></i>
                                                         <i class="fa fa-fw fa-star"></i>
                                                         <i class="fa fa-fw fa-star"></i>
                                                     </div>}
                                                     
                                                     <span class="text-dark font-weight-bold">{info.name}</span><small class="text-mute"> ({info.address})</small>
                                                 </div>
                                             </div>
                                                )}

                                             
                                             
                                          </div>
                                         
                                      </div>
                                     
                                  </div>
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
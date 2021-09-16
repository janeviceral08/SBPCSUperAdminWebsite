import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {

  componentDidMount() {
    window.onscroll = function() {myFunction()};

    var header = document.getElementById("myHeader");
    var sticky = header.offsetTop;
    
    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
  }
  render() {
    return (
      <div>     
    
  
      </div>
    );
  }
}
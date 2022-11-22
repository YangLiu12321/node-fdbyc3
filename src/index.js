/**
 * CSCI2720/ESTR2106 Assignment 2
 * Simple Image System in React
 *
 * I declare that the assignment here submitted is original
 * except for source material explicitly acknowledged,
 * and that the same or closely related material has not been
 * previously submitted for another course.
 * I also acknowledge that I am aware of University policy and
 * regulations on honesty in academic work, and of the disciplinary
 * guidelines and procedures applicable to breaches of such
 * policy and regulations, as contained in the website.
 *
 * University Guideline on Academic Honesty:
 *   http://www.cuhk.edu.hk/policy/academichonesty
 * Faculty of Engineering Guidelines to Academic Honesty:
 *   https://www.erg.cuhk.edu.hk/erg/AcademicHonesty
 *
 * Student Name: xxx <Yang Liu>
 * Student ID  : xxx <1155141479>
 * Date        : xxx <22/11/2022>
 */
import ReactDOM from "react-dom/client";
import React from 'react';
import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useMatch,
  useLocation,
} from 'react-router-dom';

const data = [
  {filename: "cuhk-2013.jpg", year: 2013, remarks: "Sunset over CUHK"},
  {filename: "cuhk-2017.jpg", year: 2017, remarks: "Bird's-eye view of CUHK"},
  {filename: "sci-2013.jpg", year: 2013, remarks: "The CUHK Emblem"},
  {filename: "shb-2013.jpg", year: 2013, remarks: "The Engineering Buildings"},
  {filename: "stream-2009.jpg", year: 2009, remarks: "Nature hidden in the campus"},
];


class App extends React.Component {
  render() {
    {/* <> fragment for >1 components */}
    return (
      <> 
        <Title name={this.props.name}/>
        <BrowserRouter>
          <div>
            <ul>
              <li> <Link to="/">Home</Link> </li>
              <li> <Link to="/gallery">Images</Link> </li>
              <li> <Link to="/slideshow">Slideshow</Link> </li>
            </ul>
          </div>

          <hr />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/slideshow" element={<Slideshow />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      </>  
    );
  }
}


class Gallery extends React.Component {
  render() {
    return (
      <main className="container">
        {data.map((file,index) => <FileCard i={index} key={index} />)}
      </main> 
    );
  }
} 

class FileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: -1 };
  }
  handleMouseOver(index,e) {
    this.setState({selected: index});
  }
  handleMouseOut(index,e) {
    this.setState({selected: -1});
  }
  render() {
    let i = this.props.i;
    return (
      <div onMouseOver={(e)=>this.handleMouseOver(i,e)} onMouseOut={(e)=>this.handleMouseOut(i,e)} className="card d-inline-block m-2" style={{width:this.state.selected===i? '220px' : '200px'}}>
        <img src={"images/"+data[i].filename} className="w-100" />
        <div className="card-body">
          <h6 className="card-title">{data[i].filename}</h6>
          <p className="card-text">{data[i].year}</p>
          { this.state.selected===i && <p className="card-text">{data[i].remarks}</p> }
        </div>
      </div>
    );
  }
}
class Title extends React.Component {
  render() {
    return (
      <header className="bg-warning">
        <h1 className="display-4 text-center">{this.props.name}</h1>
      </header>
    );
  }
}
class Home extends React.Component{
  render(){
    return(
      <div>
        <h2>Home</h2>
        <div className="card d-inline-block m-2" id="homeimage" style={{width:'100%'}}>
          <img src={"images/homeimage.jpg"} className="w-100" />
        </div>
      </div>
    );
  }
}
class Slideshow extends React.Component{
  constructor(props) {
    super(props);
    this.state = {currentImageID: 0, 
                  currentInterval: 1500,
                  interval: 0
                };
  }
  set = function(){
    if(this.state.currentImageID<data.length-1){
      this.setState({currentImageID: this.state.currentImageID+1});
    }else if(this.state.currentImageID===data.length-1){
      this.setState({currentImageID:0});
    }else{
      this.setState({currentImageID:0});
    }
  }
  start(){
    this.setState({interval:setInterval(()=>this.set(),this.state.currentInterval)});
  }
  stop(){
    clearInterval(this.state.interval);
  }
  slower(){
    this.setState({currentInterval: this.state.currentInterval+200});
    this.stop();
    this.start();
  }
  faster(){
    if(this.state.currentInterval-200>=200){
      this.setState({currentInterval: this.state.currentInterval-200});
    }
    this.stop();
    this.start();
  }
  render(){
    return(
      <div>
        <h2>Slideshow</h2>
        <button type="button" className="task1" onClick={()=>this.start()}>Start Slideshow</button>
        <button type="button" className="task2" onClick={()=>this.stop()}>Stop Slideshow</button>
        <button type="button" className="task3" onClick={()=>this.slower()}>Slower</button>
        <button type="button" className="task4" onClick={()=>this.faster()}>Faster</button>
        <br></br>
        <div className="card d-inline-block m-2" id="slides" style={{width:'100%'}}>
          <img src={"images/"+data[this.state.currentImageID].filename} className="w-100" />
          <div className="card-body">
            <h6 className="card-title">{data[this.state.currentImageID].filename}</h6>
          </div>
        </div>
      </div>
    );
  }
}
function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App name="CUHK Pictures"/>);

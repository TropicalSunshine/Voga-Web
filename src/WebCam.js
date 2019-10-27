import React, { Component, createRef } from 'react'
import * as cocoSsd from '@tensorflow-models/coco-ssd';

import {sendWord, addWords} from "./network.js";

import SnackBar from "./SnackBar.js";
/*
export default class WebCam extends Component {
    constructor(props)
    {
        super(props);
        this.update = this.update.bind(this);
    }
    componentDidMount()
    {
        //video dimensions
        const constraints = {
            video: {width: {exact: 900}, height: {exact: 700}}
        };

        
        const video = document.getElementById("webcam-dom");
        
        navigator.mediaDevices.getUserMedia(constraints).
        then((stream) => {
            video.srcObject = stream;
        });
    }

    update(){

    }

    render() {
        return (
            <div className = "webcam" onClick = {(e) => {
                console.log(e);
                console.log(e.pageX);
                console.log(e.pageY);
            }}>
                <video id = "webcam-dom" autoPlay></video>
            </div>
        )
    }
}
*/

export default class WebCam extends Component {

    constructor(props){
      super(props);

      this.predictions = [];
      this.state = {
        isloaded: false,
        word: "",
        addedWord: false
      }

      this.checkClick = this.checkClick.bind(this);

      this.interval = null;

      
          // reference to both the video and canvas
    this.videoRef = createRef();
    this.canvasRef = createRef();

    
    // we are gonna use inline style
    this.styles = {
      position: 'fixed',
      marginLeft: "auto",
      marginRight: "auto",
      left: 0,
      right: 0
    };
     }
  
  
    detectFromVideoFrame = (model, video) => {
      model.detect(video).then(predictions => {
        this.showDetections(predictions);
  
        requestAnimationFrame(() => {
          this.detectFromVideoFrame(model, video);
        });
      }, (error) => {
        console.log("Couldn't start the webcam")
        console.error(error)
      });
    };

    checkClick = (e) => {
      var that = this;


      var x = (e.pageX - this.canvasRef.current.offsetLeft);
      var y = (e.pageY - this.canvasRef.current.offsetTop);

      this.predictions.forEach((p) => {
        console.log("aaa");
        if( (x > p[0])&&(x < (p[0] + p[2]) )&&(y > p[1])&&(y < (p[1] + p[3]) ) ){
          //do something with p[4]
          this.setState({
            word: p[4],
            addedWord: true
          })

          sendWord(p[4],this.props.language);
          addWord(word);
        }
      });

        //clearing the snackbar
        clearInterval(this.interval);

        this.interval =  setInterval(()=> {
          this.setState({
            addedWord: false
          })
          clearInterval(that.setInterval);
        }, 3000)
      }

    
  
    showDetections = predictions => {
      const ctx = this.canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const font = "24px helvetica";
      ctx.font = font;
      ctx.textBaseline = "top";
      
      this.predictions = [];
      predictions.forEach(prediction => {
      
        
        const y = prediction.bbox[0];
        const x = prediction.bbox[1];
        const width = prediction.bbox[2];
        const height = prediction.bbox[3];

        this.predictions.push([x, y, width, height, prediction.class]);

        // Draw the bounding box.
        ctx.strokeStyle = "#2fff00";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, width, height);
        // Draw the label background.
        ctx.fillStyle = "#2fff00";
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font, 10);
        // draw top left rectangle
        ctx.fillRect(x, y, textWidth + 10, textHeight + 10);
        // draw bottom left rectangle
        ctx.fillRect(x, y + height - textHeight, textWidth + 15, textHeight + 10);
  
        // Draw the text last to ensure it's on top.
        ctx.fillStyle = "#000000";
        ctx.fillText(prediction.class, x, y);
        ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight);
      });
    };

  
    
    componentDidMount() {
      if (navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia) {
        // define a Promise that'll be used to load the webcam and read its frames
        const webcamPromise = navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: false,
          })
          .then(stream => {
            // pass the current frame to the window.stream
            window.stream = stream;
            // pass the stream to the videoRef
            this.videoRef.current.srcObject = stream;
            
            return new Promise(resolve => {
              this.videoRef.current.onloadedmetadata = () => {
                resolve();
              };
            });
          }, (error) => {
            console.log("Couldn't start the webcam")
            console.error(error)
          });

        // define a Promise that'll be used to load the model
        const loadlModelPromise = cocoSsd.load();
        
        // resolve all the Promises
       
        Promise.all([loadlModelPromise, webcamPromise])
          .then(values => {
            this.detectFromVideoFrame(values[0], this.videoRef.current);
          })
          .catch(error => {
            console.error(error);
          });



      }
    }

    componentWillUnmount(){
      clearInterval(this.interval);
    }

  
    // here we are returning the video frame and canvas to draw,
    // so we are in someway drawing our video "on the go"
    render() {
        var that = this;
        var vidwidth = window.screen.width;
        var vidheight = window.screen.height;
      return (
        <div className = "webcam">
          {this.state.addedWord && <SnackBar word = {this.state.word}/>}
          <video
            facingMode="environment"
            style={this.styles}
            autoPlay
            muted
            ref={this.videoRef}
            width="800px"
            height="600px"
          />
          <canvas style={this.styles} ref={this.canvasRef} width="800px" height="600px" 
          onClick = {this.checkClick}/>
        </div>
      );
    }
  }



  class WordList extends Component{
    constructor(prop){

    }

    shouldComponentUpdate
    render(){
      return (
        <div className = "Wordlist">
          
        </div>
      )
    }
  }
import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

import WebCam from "./WebCam.js";
import FlashCards from "./FlashCards.js";

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import HomeIcon from '@material-ui/icons/Home';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


export default class Main extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isFlashCards: false,
            default: true,
            isScan: false
        }

        this.background = this.background.bind(this);
        this.background(this.state);

        this.updateState = this.updateState.bind(this);
    }

    updateState(state){
        console.log(state);
        this.setState(state);
    }

    background(state){
        console.log("state", state);
        var body = document.getElementsByTagName("BODY")[0];
        console.log(body.style);
        body.style.animation = "gradientFlow 5s infinite linear";
    }

    render() {

        return (
            <div className = "Main">
                <div className = "Main-container">
                    <div className = "Main-content">
                        {this.state.isFlashCards && (<FlashCards/>)}
                        {this.state.isScan && (<WebCam/>)}
                        {
                            this.state.default && 

                        (
                            <div className = "main-buttons">
                                <div className = "main-title">If its not you then its hella bs</div>
                                <div className = "main-content-button">
                                    <Button variant="contained" color = "primary" onClick = {() => {
        
                                    this.setState({
                                        isScan: true,
                                        default: false
                                    }, () => {
                                        this.background(this.state);
                                    })
                                }}>
                                        Scan
                                    </Button>
                                </div>
                                <div className = "main-content-button">
                                    <Button variant="contained" color = "secondary" onClick = {() => {
                                        this.setState({
                                            default: false,
                                            isScan: false,
                                            isFlashCards: true
                                        })
                                    }}>
                                        Practice
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className = "navbar">
                    <SimpleBottomNavigation setState = {this.updateState}/>
                </div>
            </div>
        )
    }
}

const useStyles = makeStyles({
    root: {
      width: "100%",
    },
  });

function SimpleBottomNavigation(props) {
    const classes = useStyles();
  
    var sets = {
        0 : {   isFlashCards: false,
                default: false,
                isScan: true
            },
        1 : {   isFlashCards: false,
            default: true,
            isScan: false
        },
        2:  {   isFlashCards: true,
            default: false,
            isScan: false
        } 
    }
    return (
      <BottomNavigation
        onChange={(event, newValue) => {
            props.setState(sets[newValue]);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Scan"  icon = {<AddAPhotoIcon/>}/>
        <BottomNavigationAction label="Home"  icon = {<HomeIcon/>}/>
        <BottomNavigationAction label="Practice"  icon = {<EmojiObjectsIcon/>}/>
      </BottomNavigation>
    );
  }
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


import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';


import logo from "./img/logo.png";

export default class Main extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isFlashCards: false,
            default: true,
            isScan: false,
            language: "fr"
        }

        this.background = this.background.bind(this);
        this.background(this.state);

        this.updateState = this.updateState.bind(this);

        this.dropdownAction = this.dropdownAction.bind(this);
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

    dropdownAction(e, key){
        console.log(key.key);
        this.setState(
            {
                language: key.key
            }
        )

    }

    render() {

        return (
            <div className = "Main">
                <div className = "Main-container">
                    <div className = "Main-content">
                        {this.state.isFlashCards && (<FlashCards/>)}
                        {this.state.isScan && (<WebCam language = {this.state.language}/>)}
                        {
                            this.state.default && 

                        (
                            <div className = "main-buttons">
                                <div className = "main-title"><img src = {logo} height = {450} width = {600}/></div>
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
                                <div className = "main-drop-down">
                                    <DropDown action = {this.dropdownAction}/>
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

  const dropdownStyles = {
    dropdown: { width: 300 }
  };
  const stackTokens = { childrenGap: 20 };
const options = [
    {
        key: "es",
        text: "Spanish"
    },
    {
        key: "fr",
        text: "French"
    },
    {
        key: "zh-cn",
        text: "Chinese"
    },
    {
        key: "ja",
        text: "Japanese"
    },
    {
        key: "ko",
        text: "Korean"
    }
  ];

function DropDown(props){
    return (
        <Stack tokens={stackTokens}>
          <Dropdown
            onChange = {props.action}
            placeHolder = "Select"
            label="Select a Language"
            defaultSelectedKey="Spanish"
            options={options}
            disabled={false}
            styles={dropdownStyles}
          />
        </Stack>
      );
}
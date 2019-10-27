import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class FlashCards extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            flashcard: true,
            currentWordIndex: 0, 
            words: []
        }
    }

    componentDidMount(){
        
    }
    
    
    
    
    
    render() {

        return (
            <div className = "flashcards">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className = "maincontainer">
                            <div className = "flashcard" id = "flashcard-word" onClick = {() => {
                                this.setState({
                                    flashcard: !this.state.flashcard
                                }, () => {
                                    var flashcard = document.getElementById("flashcard-word");
                                    (!this.state.flashcard) ? flashcard.style.transform = "rotateY(180deg)" : flashcard.style.transform = "rotateY(0)";
                                })
                            }}>
                                <div class="thefront">
                                    <div>
                                        {"Cat"}
                                    </div>
                                    <div className = "partofspeech">
                                        {"Noun"}
                                    </div>
                                </div>
                                <div class="theback">{"El Gato"}</div>
                                
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style = {{
                            position: "absolute",
                            top: "50%"
                        }}>
                            <div className = "for-back">
                                <Icon iconName = "Back"/>
                            </div>
                            <div className = "for-back">
                                <Icon iconName = "Forward"/>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div className = "wordlist">
                            helloasdasd
                            asd
                            asd
                            as
                            das
                            dsss
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div className = "word-definition">
                            <div className = "word-def-title">Definition</div>
                            <div className = "word-def-text">The cat is a small carnivorous mammal. It is the only domesticated species in the family Felidae and often referred to as the domestic cat to distinguish it from wild members of the family. The cat is either a house cat or a farm cat, which are pets, or a feral cat, which ranges freely and avoids human contact.</div>
                        </div>
                    </Grid>
                    
                </Grid>
            </div>
        )
    }
}

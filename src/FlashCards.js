import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import Button from '@material-ui/core/Button';

import { Icon } from 'office-ui-fabric-react/lib/Icon';


var data = {
    "airplane": {
      "definition": [
        "an aircraft that has a fixed wing and is powered by propellers or jets"
      ],
      "translated_pron": "Fēijī",
      "translated_word": "飞机"
    },
    "apple": {
      "definition": [
        "native Eurasian tree widely cultivated in many varieties for its firm rounded edible fruits",
        "fruit with red or yellow or green skin and sweet to tart crisp whitish flesh"
      ],
      "translated_pron": null,
      "translated_word": "Pomme"
    },
    "banana": {
      "definition": [
        "any of several tropical and subtropical treelike herbs of the genus Musa having a terminal crown of large entire leaves and usually bearing hanging clusters of elongated fruits",
        "elongated crescent-shaped yellow fruit with soft sweet flesh"
      ],
      "translated_pron": "banana",
      "translated_word": "바나나"
    },
    "baseballbat": {
      "definition": [
        "an implement used in baseball by the batter"
      ],
      "translated_pron": null,
      "translated_word": "棒球棒"
    },
    "bed": {
      "definition": [
        "a depression forming the ground under a body of water",
        "have sexual intercourse with",
        "single thickness of usually some homogeneous substance",
        "prepare for sleep",
        "a stratum of ore or coal thick enough to be mined with profit",
        "a foundation of earth or rock supporting a road or railroad track",
        "a piece of furniture that provides a place to sleep",
        "a plot of ground in which plants are growing",
        "furnish with a bed",
        "(geology) a stratum of rock (especially sedimentary rock)",
        "place (plants) in a prepared bed of soil",
        "put to bed",
        "the flat surface of a printing press on which the type form is laid in the last stage of producing a newspaper or magazine or book etc."
      ],
      "translated_pron": "chimdae",
      "translated_word": "침대"
    },
    "bird": {
      "definition": [
        "informal terms for a (young) woman",
        "badminton equipment consisting of a ball of cork or rubber with a crown of feathers",
        "a cry or noise made to express displeasure or contempt",
        "watch and study birds in their natural habitat",
        "the flesh of a bird or fowl (wild or domestic) used as food",
        "warm-blooded egg-laying vertebrates characterized by feathers and forelimbs modified as wings"
      ],
      "translated_pron": "Niǎo",
      "translated_word": "鸟"
    },
    "bottle": {
      "definition": [
        "the quantity contained in a bottle",
        "a vessel fitted with a flexible teat and filled with milk or formula; used as a substitute for breast feeding infants and very young children",
        "a glass or plastic vessel used for storing drinks or other liquids; typically cylindrical without handles and with a narrow neck that can be plugged or capped",
        "put into bottles",
        "store (liquids or gases) in bottles"
      ],
      "translated_pron": null,
      "translated_word": "bouteille"
    },
    "bowl": {
      "definition": [
        "a small round container that is open at the top for holding tobacco",
        "a large ball with finger holes used in the sport of bowling",
        "the quantity contained in a bowl",
        "the act of rolling something (as the ball in bowling)",
        "a large structure for open-air sports or entertainments",
        "a concave shape with an open top",
        "a dish that is round and open at the top for serving foods",
        "a round vessel that is open at the top; used chiefly for holding food or liquids",
        "a wooden ball (with flattened sides so that it rolls on a curved course) used in the game of lawn bowling",
        "engage in the sport of bowling",
        "hurl a cricket ball from one end of the pitch towards the batsman at the other end",
        "roll (a ball)"
      ],
      "translated_pron": null,
      "translated_word": "bol"
    },
    "car": {
      "definition": [
        "a motor vehicle with four wheels; usually propelled by an internal combustion engine",
        "the compartment that is suspended from an airship and that carries personnel and the cargo and the power plant",
        "where passengers ride up and down",
        "a wheeled vehicle adapted to the rails of railroad",
        "a conveyance for passengers or freight on a cable railway"
      ],
      "translated_pron": "Qìchē",
      "translated_word": "汽车"
    },
    "cat": {
      "definition": [
        "a large tracked vehicle that is propelled by two endless metal belts; frequently used for moving earth in construction and farm work",
        "feline mammal usually having thick soft fur and no ability to roar: domestic cats; wildcats",
        "a whip with nine knotted cords",
        "the leaves of the shrub Catha edulis which are chewed like tobacco or used to make tea; has the effect of a euphoric stimulant",
        "a method of examining body organs by scanning them with X rays and using a computer to construct a series of cross-sec"],
        "translated_pron": "Qìchē",
        "translated_word": "汽车"}}

var url = "https://" + window.location.host;
function getAllTranslations(callback){
    fetch(url + "/getall", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }, 
        body:null 
    }).then(res => res.json()).then(function(resp){
        console.log(resp);
        callback(resp["result"]);
    }).catch(error => {
        console.log(error);
    });
}

export default class FlashCards extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            flashcard: true,
            currentWordIndex: 0, 
            words: {"car": {
                "definition": [
                  "a motor vehicle with four wheels; usually propelled by an internal combustion engine",
                  "the compartment that is suspended from an airship and that carries personnel and the cargo and the power plant",
                  "where passengers ride up and down",
                  "a wheeled vehicle adapted to the rails of railroad",
                  "a conveyance for passengers or freight on a cable railway"
                ],
                "translated_pron": "Qìchē",
                "translated_word": "汽车"}},
            wordsList: ["car"],
            currentIndex: 0,
            defs: [
                "a motor vehicle with four wheels; usually propelled by an internal combustion engine",
                "the compartment that is suspended from an airship and that carries personnel and the cargo and the power plant",
                "where passengers ride up and down",
                "a wheeled vehicle adapted to the rails of railroad",
                "a conveyance for passengers or freight on a cable railway"]
        }

        this.interval = null;

        this.handleWordClick = this.handleWordClick.bind(this);

    }

    componentDidMount(){
        
    }   

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    updateData(){
        getAllTranslations((resp) => {
            console.log(resp);

            if (resp == {})
            {
                this.setState({
                    words: {"car": {
                        "definition": [
                          "a motor vehicle with four wheels; usually propelled by an internal combustion engine",
                          "the compartment that is suspended from an airship and that carries personnel and the cargo and the power plant",
                          "where passengers ride up and down",
                          "a wheeled vehicle adapted to the rails of railroad",
                          "a conveyance for passengers or freight on a cable railway"
                        ],
                        "translated_pron": "Qìchē",
                        "translated_word": "汽车"}
                    },
                    wordsList: ["car"]
                    
                })
            } else {

                this.setState({
                    words: resp,
                    wordsList: Object.keys(resp)
                }, () => {
                    console.log(this.state);
                })
            }
        })
    }

    handleWordClick(index){
        this.setState({
            currentIndex: index,
            defs: this.state.words[this.state.wordsList[index]]["definition"]
        })
    }

    next(e){
        
        var index = (this.state.currentIndex < this.state.wordsList.length - 1) ? this.state.currentIndex + 1 : 0;
        this.setState({
            defs: this.state.words[this.state.wordsList[index]]["definition"],
            currentIndex: index
        });
    }

    prev(e){
        var index = (this.state.currentIndex > 0) ? this.state.currentIndex - 1 : this.state.wordsList.length - 1;
        this.setState({
            defs: this.state.words[this.state.wordsList[index]]["definition"],
            currentIndex: index
        });
    }

    handleFlashcard(){
        this.setState({
            flashcard: !this.state.flashcard
        }, () => {
            var flashcard = document.getElementById("flashcard-word");
            (!this.state.flashcard) ? flashcard.style.transform = "rotateY(180deg)" : flashcard.style.transform = "rotateY(0)";
        })
    }
    
    render() {
        var that = this;

        var def = this.state.defs.map((d, i) =>
            <div key = {i}>{(i + 1) + ". " + d}</div> 
        )

        var words = this.state.wordsList.map((d, i) => 
            <WordList key = {i} word = {d} index = {i} />
        )

        return (
            <div className = "flashcards">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className = "maincontainer">
                            <div className = "flashcard" id = "flashcard-word" onClick = {this.handleFlashcard.bind(this)}>
                                <div class="thefront">
                                    <div>
                                        {that.state.wordsList[that.state.currentIndex]}
                                    </div>
                                </div>
                                <div class="theback">
                                    <div>
                                        {that.state.words[that.state.wordsList[that.state.currentIndex]]["translated_word"]}
                                    </div>
                                    <div className = "partofspeech">
                                        {this.state.words[that.state.wordsList[that.state.currentIndex]]["translated_pron"]}
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style = {{
                            position: "absolute",
                            top: "50%"
                        }}>
                            <div className = "for-back" onClick = {this.prev.bind(this)}>
                                <Icon iconName = "Back"/>
                            </div>
                            <div className = "for-back" onClick = {this.next.bind(this)}>
                                <Icon iconName = "Forward"/>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div className = "wordlist">
                            {words}
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div className = "word-definition">
                            <div className = "word-def-title">Definition</div>
                            <div className = "word-def-text">{def}</div>
                        </div>
                    </Grid>
                    
                </Grid>
                        <div className = "bs-button">
                            <Button  variant="contained" color = "primary" onClick = {this.updateData.bind(this)}>
                                                    refresh
                            </Button>
                        </div>
            </div>
        )
    }
}



function WordList(props){

    return(
        <div className = "WordList">
            <h1>{props.word}</h1>
        </div>
    )
}

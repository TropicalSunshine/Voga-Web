var url = "http://" + window.location.host;

var translated = {};

var words = {};

module.exports = {
    sendWord: function(word, language){
        fetch(url + "/post", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'no-cors',    
            body:JSON.stringify({
                "word": word,
                "language": language
            }) 
        }).then(res => res.json()).then(function(resp){
        }).catch(error => {
            console.log(error);
        });
    },

    addWord: function(word){
        words[word] = true;
    },

    getWords: function(word){
        return Object.keys(words);
    },


    getTranslation: function(){
        fetch(url + "/translations", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'no-cors',    
            body:JSON.stringify({
                "word": word,
                "language": language
            }) 
        }).then(res => res.json()).then(function(resp){
        }).catch(error => {
            console.log(error);
        });
    }
}
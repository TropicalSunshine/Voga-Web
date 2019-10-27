var url = "https://" + window.location.host;

var translated = {};

var words = {};

export function getAllTranslations(callback){
    fetch(url + "/getall", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }, 
        body:null 
    }).then(res => res.json()).then(function(resp){
        callback(resp["result"]);
    }).catch(error => {
        console.log(error);
    });
}

module.exports = {
    addWord: function(word){
        words[word] = true;
    },

    getWords: function(word){
        return Object.keys(words);
    },
    getTranslation: function(word, language, callback){
        console.log("url",url);
        console.log("word", word);
        console.log("lang", language);
        
        fetch(url + "/translate", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }, 
            body:JSON.stringify({
                "word": word,
                "language": language
            }) 
        }).then(res => res.json()).then(function(resp){
            callback(resp["result"]);
        }).catch(error => {
            console.log(error);
        });
    }
}
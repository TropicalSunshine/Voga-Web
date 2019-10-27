var url = "https://" + window.location.host;

var translated = {};

var words = {};

module.exports = {
    addWord: function(word){
        words[word] = true;
    },

    getWords: function(word){
        return Object.keys(words);
    },
    getAllTranslations: async function(callback){
        console.log("url",url);
        console.log("word", word);
        console.log("lang", language);
        
        await fetch(url + "/getall", {
            method: "GET",
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
    },
    getTranslation: async function(word, language){
        console.log("url",url);
        console.log("word", word);
        console.log("lang", language);
        
        await fetch(url + "/translate", {
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
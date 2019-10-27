var url = "http://ec2-54-226-178-32.compute-1.amazonaws.com:8080";

var translated = {};
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
    }
}
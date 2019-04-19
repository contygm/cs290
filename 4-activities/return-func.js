var Donald = { 
    name: "Donald Duck"
};

function dialog(name) {
    return(function (content) {
        return name + " says \"" + content + "\""; 
    })
}

Donald.speak = dialog("Donald Duck");

console.log(Donald.speak("Hello there"));
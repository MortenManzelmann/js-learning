var DEBUG = true;

function debug(msg){
    if(DEBUG)
        console.dir(msg);
}

function debug(msg, verbose){
    if(DEBUG)
        verbose ? console.dir(msg) : console.log(msg);
}
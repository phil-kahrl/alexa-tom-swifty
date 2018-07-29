const data = require('./jokeList');

/**
    Function to find a joke by keyword.
    If there are multiple items matching the keyword, then one is selected randomly.
    If none match, a random joke is selected from the list.
    The return value, indicates whether a match was found.
    
    Input Spec:
        keyword - <String> keyword to match.
    
    OutputSpec:
        {item: <Object>, found: <Boolean>}
    
**/
module.exports = function(keyword) {
    let rows = data.filter( item => item.keyword === keyword);

    if(rows.length){
        const row = rows[Math.floor(Math.random() * rows.length)];
        return {item: row, found: true}
    } else {
        const row = data[Math.floor(Math.random() * data.length)];
        return {item: row, found: false}
    }
}

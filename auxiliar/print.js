/**
 * Lazy print
 * 
 * @param {*} obj 
 * @param {*} geeObjType 
 */

function print (obj, geeObjType) {
    
    geeObjType(obj).evaluate( (success, failure) => {
        
        if (success) {
            console.log(`${success}\n`)
        } else {
            console.log(`${failure}\n`)
        }
    
    })

}

module.exports = print
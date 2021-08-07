/**
 * Lazy print
 * 
 * @param {*} obj 
 * @param {*} geeObjType 
 */

function print (obj, geeObjType) {
    
    geeObjType(obj).evaluate( (success, failure) => {
        
        if (success) {
            console.log(success)
        } else {
            console.log(failure)
        }
    
    })

}

module.exports = print
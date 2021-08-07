/**
 * Lazy print
 * 
 * @param {*} obj 
 * @param {*} geeObjType 
 */

function geePrint (obj, geeObjType) {
    
    geeObjType(obj).evaluate( (success, failure) => {
        
        if (success) {
            console.log(success)
        } else {
            console.log(failure)
        }
    
    })

}

module.exports = geePrint
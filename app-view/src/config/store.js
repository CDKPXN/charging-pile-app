var UserMsg = []

var str = 'hello world'

var obj = () => {
    if (str.toLowerCase().includes('hello')) {
        console.log('hello')
        console.log('world')
    }
}

module.exports = {
    UserMsg,
    obj
}
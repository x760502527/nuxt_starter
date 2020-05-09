module.exports = {
    dev: {
        MODE: 'dev',
        "NODE_HTTP": "http://192.168.10.228:8080",
        "properties":{
            "address_back": "http://192.168.10.147:8080/WebFrames",
            "address_around": "http://192.168.10.147"
        }
    },
    production: {
        MODE: 'production',
        "NODE_HTTP": "http://192.168.10.147:8080",
        "properties":{
            "address_back": "http://192.168.10.147:8080/WebFrames",
            "address_around": "http://192.168.10.147"
        }
    },
    build: {
        MODE: 'build',
        "NODE_HTTP": "http://192.168.10.147:8080",
        "properties":{
            "address_back": "http://192.168.10.147:8080/WebFrames",
            "address_around": "http://192.168.10.146"
        }
    }
}

module.exports = {
    apps : [
        {
            name: "web",
            script: "./startscript.js",
            watch: true,
            env: {
                "NODE_ENV": "development",
                "NODE_HTTP": "http://192.168.10.147:8080",
                "properties":{
                    "address_back": "http://192.168.10.147:8080/WebFrames",
                    "address_around": "http://192.168.10.147"
                }
            },
            env: {
                "NODE_ENV": "production1",
                "NODE_HTTP": "http://192.168.10.147:8080",
                "properties":{
                    "address_back": "http://192.168.10.147:8080/WebFrames",
                    "address_around": "http://192.168.10.147"
                }
            },
            env_production: {
                "NODE_ENV": "production2",
                "NODE_HTTP": "http://192.168.10.147:8080",
                "properties":{
                    "address_back": "http://192.168.10.147:8080/WebFrames",
                    "address_around": "http://192.168.10.147"
                }
            }
        }
    ]
}

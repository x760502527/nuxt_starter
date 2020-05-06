module.exports = {
    apps : [
        {
            name: "namexxx",
            script: "./startscript.js",
            watch: true,
            env: {
                "NODE_ENV": "development"
            },
            env_uat: {
                "NODE_ENV": "generate"
            },
            env_production: {
                "NODE_ENV": "production",
            }
        }
    ]
}

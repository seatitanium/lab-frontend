module.exports = {
    apps: [
        {
            name: 'seati-lab',
            script: './server/index.mjs',
            env: {
                NODE_ENV: 'production',
                PORT: '7000'
            }
        }
    ]
}
const mconfig = {
    server: {
        protocol: 'http://',
        host: 'localhost',
        port: 3001,
    }
}

module.exports = {
    getConfig: function() {
        return mconfig;
    }
};
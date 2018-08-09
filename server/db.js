module.exports = process.env.NODE_ENV === 'development' ? 
                'mongodb://localhost:27017/bar-commander-dev' : 
                'mongodb://localhost:27017/bar-commander-prod';
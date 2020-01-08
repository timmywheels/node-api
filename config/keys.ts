if (process.env.NODE_ENV === 'production') {
    require('./prod');
} else {
    require('./dev')
}
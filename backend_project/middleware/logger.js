function logger(req, res, next) {
    const now = new Date();
    const dateTime = `${now.getDate()}.${now.getMonth()}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    console.log(
        `${dateTime} ${req.method} ${req.path} from ${req.connection.remoteAddress}`
    );
    next();
}

module.exports = logger;

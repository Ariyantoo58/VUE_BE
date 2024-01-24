"use strict";

exports.ErrorHandler = (fn) => {
    return async function (req, res, next) {
        let e = null;
        try {
            await fn(req, res, next);
        } catch (err) {
            e = err;
            next(err);
        }

        if (!e) {
            next();
        }
    };
};
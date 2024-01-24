"use strict";

exports.getUserById = async ({ id }) => {
    return {
        id: id,
        fullname: "Mooniverse",
    }
}
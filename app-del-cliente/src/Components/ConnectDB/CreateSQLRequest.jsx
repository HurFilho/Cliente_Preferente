const dbName = "registro_de_clientes_preferentes"

const CreateSQLRequest =
{
    "SelectWhereLike": (column, data, dbName) => { return ("SELECT * FROM `" + dbName + "` WHERE `" + column + "` LIKE '" + data + "'") },
    "SelectAll": (dbName) => { return ("SELECT * FROM `" + dbName + "`") },
    "CheckCredentials": (userId, data) => { return ("SELECT * FROM `" + dbName + "` WHERE `CorreoElectronico` LIKE '" + userId + "' AND `tempContrasena` LIKE '" + data + "'") },
    "GetUserData": (userId) => { return ("SELECT * FROM `" + dbName + "` WHERE `id` LIKE '" + userId + "'") },
    "CheckQrCodePromotion": (dbName, QrCode) => { return ("SELECT * FROM `" + dbName + "` WHERE `QrCode` LIKE '" + QrCode + "'") },
    "GetPromotionData": (dbName, QrCode) => { return ("SELECT * FROM `" + dbName + "` WHERE `QrCode` LIKE '" + QrCode + "'") },
    "Insert": (columns) => {
        let SQLCommand = "INSERT INTO " + dbName + " (`"
        for (let column of columns) {
            SQLCommand += column.columnName + "`, `"
        }
        SQLCommand = SQLCommand.slice(0, (SQLCommand.length - 3))
        SQLCommand += ") VALUES ('"
        for (let column of columns) {
            SQLCommand += column.value + "', '"
        }
        SQLCommand = SQLCommand.slice(0, (SQLCommand.length - 3))
        SQLCommand += ");"
        return SQLCommand
    },
    "AddQrCode": (columns, id) => {
        let SQLCommand = "UPDATE `" + dbName + "` SET `"
        for (let column of columns) {
            SQLCommand += column.columnName + "` = '" + JSON.stringify(column.value) + "', `"
        }
        SQLCommand = SQLCommand.slice(0, (SQLCommand.length - 3))
        SQLCommand += " WHERE `id` = '" + id + "'"
        return SQLCommand
    }
}

export default CreateSQLRequest;

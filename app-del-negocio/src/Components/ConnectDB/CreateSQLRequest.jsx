const CreateSQLRequest =
{
    "SelectWhereLike": (dbName, column, data) => { return ("SELECT * FROM `" + dbName + "` WHERE `" + column + "` LIKE '" + data + "'") },
    "SelectAll": (dbName) => { return ("SELECT * FROM `" + dbName + "`") },
    "CheckCredentials": (dbName, userId, data) => { return ("SELECT * FROM `" + dbName + "` WHERE `Usuario` LIKE '" + userId + "' AND `Contrasena` LIKE '" + data + "'") },
    "GetClientData": (dbName, userId, CorreoElectronico) => {
        // return ("SELECT `id` FROM `" + dbName + "` WHERE `id`='" + userId + "' AND `CorreoElectronico`='" + CorreoElectronico + "'")
        return ("SELECT `id`, `Nombre`, `Apellido`, `Genero`, `FechaDeNacimiento`, `CorreoElectronico`, `Telefono`, `Puntos`, `Visitas`, `Promociones` FROM `" + dbName + "` WHERE `id`='" + userId + "' AND `CorreoElectronico`='" + CorreoElectronico + "'")
    },
    "CheckQrCodePromotion": (dbName, QrCode) => { return ("SELECT * FROM `" + dbName + "` WHERE `QrCode` LIKE '" + QrCode + "'") },
    "GetPromotionData": (dbName, QrCode) => { return ("SELECT * FROM `" + dbName + "` WHERE `QrCode` LIKE '" + QrCode + "'") },
    "Insert": (dbName, columns) => {
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
    "Update": (dbName, columns, id) => {
        let SQLCommand = "UPDATE `" + dbName + "` SET `"
        for (let column of columns) {
            SQLCommand += column.columnName + "` = '" + column.value + "', `"
        }
        SQLCommand = SQLCommand.slice(0, (SQLCommand.length - 3))
        SQLCommand += " WHERE `id` = '" + id + "'"
        return SQLCommand
    },
    "UpdatePromociones": (dbName, promociones, id) => {
        return "UPDATE `" + dbName + "` SET `Promociones` ='" + promociones + "' WHERE `id` ='" + id + "'"
    }
}

export default CreateSQLRequest;

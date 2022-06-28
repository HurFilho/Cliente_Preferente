const CreateSQLRequest =
{
    "SelectWhereLike": (dbName, column, data) => { return ("SELECT * FROM `" + dbName + "` WHERE `" + column + "` LIKE '" + data + "'") },
    "SelectAll": (dbName) => { return ("SELECT * FROM `" + dbName + "`") },
    "CheckCredentials": (dbName, userId, data) => { return ("SELECT * FROM `" + dbName + "` WHERE `CorreoElectronico` LIKE '" + userId + "' AND `tempContrasena` LIKE '" + data + "'") },
    "Delete": (dbName, id) => { return ("DELETE FROM `" + dbName + "` WHERE `id` = '" + id + "'") },
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
    }
}


export default CreateSQLRequest;

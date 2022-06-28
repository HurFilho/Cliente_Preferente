const ConnectDB = async (phpAddress, SQLCommand, requestedDataType) => {
    // console.log(SQLCommand)
    // console.log(phpAddress)
    // console.log(requestedDataType)
    let fetchedData
    await fetch(phpAddress, {
        method: 'POST',
        body: JSON.stringify(
            { Parameter: SQLCommand },
        )
    })
        .then((response) => response.json())
        .then((responseJson) => {
            // console.log(responseJson)
            fetchedData = responseJson
        }
        );
    let result
    switch (requestedDataType) {
        case "object":
            result = fetchedData;
            break;
        case "json":
            result = JSON.stringify(fetchedData);
            break;
        case "boolean":
            result = true;
            break;
        default:
            result = fetchedData;
            break;
    }
    return result
}

export default ConnectDB
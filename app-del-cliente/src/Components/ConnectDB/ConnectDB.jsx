const ConnectDB = async (SQLCommand, phpAddress, requestedDataType) => {
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
        .then((response) => {
            fetchedData = response.json()
        })
    let result
    switch (requestedDataType) {
        case "object":
            result = fetchedData;
            break;
        case "json":
            result = JSON.stringify(fetchedData);
            break;
        case "boolean":
            result = await fetchedData.length === 0 ? false : true
            break;
        default:
            break;
    }
    return result
}

export default ConnectDB
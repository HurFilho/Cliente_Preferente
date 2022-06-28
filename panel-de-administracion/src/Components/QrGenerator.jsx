import React from "react";

const startQRString = "https://image-charts.com/chart?chs=800x800&cht=qr&chl="
const endQRString = "&choe=UTF-8"

const FinalQRImage = FinalQRImage => {
    return (
        <>
            <div id={FinalQRImage.codigo} className="text-center" style={{ padding: "0" }}>
                <img id={FinalQRImage.codigo} src={startQRString + FinalQRImage.codigo + endQRString} style={{ width: "100%", padding: "0", margin: "0" }} alt="QR Code para Cliente Preferente"
                    className="container" />
            </div>
        </>
    )

}

export default FinalQRImage
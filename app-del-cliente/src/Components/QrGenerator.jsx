import React from "react";

const startQRString = "https://image-charts.com/chart?chs=800x800&cht=qr&chl="
const endQRString = "&choe=UTF-8"

const FinalQRImage = FinalQRImage => {
    return (
        <>
            <div className="align-mid" style={{ padding: "0" }}>
                <img id={FinalQRImage._id}
                    src={startQRString + FinalQRImage.codigo + endQRString}
                    style={{ width: "80%", padding: "0", margin: "0" }}
                    alt="QR Code para Cliente Preferente" />
            </div>
        </>
    )

}

export default FinalQRImage
import React from "react";

const startQRString = "https://image-charts.com/chart?chs=800x800&cht=qr&chl="
const endQRString = "&choe=UTF-8"

const FinalQRImage = FinalQRImage => {
    return (
        <>
            <div className="container-fluid">
                <div className="text-center">
                    <img src={startQRString + FinalQRImage.codigo + endQRString} alt="QR Code para Cliente Preferente"
                        className="container-fluid" />
                </div>
            </div>
        </>
    )

}

export default FinalQRImage
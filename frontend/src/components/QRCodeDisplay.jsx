import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeDisplay({ url }) {
    return (
        <QRCodeCanvas
            value={url}
            size={200}
            level="H"
            includeMargin={false}
            imageSettings={{
                src: "/favicon.ico",
                x: undefined,
                y: undefined,
                height: 40,
                width: 40,
                excavate: true,
            }}
        />
    );
}

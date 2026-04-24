import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
    title = "Sefya Dental Studio | Layanan Gigi Premium & Terpercaya",
    description = "Sefya Dental Studio menawarkan perawatan gigi modern, aman, dan steril. Wujudkan senyum impian Anda dengan teknologi terbaru dan tim ahli kami.",
    keywords = "dokter gigi, dental studio, perawatan gigi, pembersihan karang gigi, behel gigi, kawat gigi, sefya dental studio",
    url = "https://sefyadental.com", // Replace with real URL later
    image = "/og-image.jpg", // Path to OG image
}) => {
    // Structured Data (JSON-LD) for Local Business
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Dentist",
        name: "Sefya Dental Studio",
        image: "https://sefyadental.com/og-image.jpg",
        "@id": "https://sefyadental.com",
        url: "https://sefyadental.com",
        telephone: "+6288975262351",
        address: {
            "@type": "PostalAddress",
            streetAddress:
                "Jl. Subang Pamanukan, Sukamulya, Kec. Pagaden, Kabupaten Subang, Jawa Barat 41252",
            addressLocality: "Subang",
            postalCode: "41252",
            addressCountry: "ID",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: -6.470056305125251,
            longitude: 107.81009223152965,
        },
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                ],
                opens: "08:00",
                closes: "20:00",
            },
        ],
        sameAs: ["https://www.instagram.com/sefyadentalstudio"],
    };

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};

export default SEO;

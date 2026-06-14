import { Helmet } from "react-helmet-async";

const SEO = ({
    title = "Sefya Dental Studio | Dokter Gigi Subang Terbaik & Terpercaya",
    description = "Dokter gigi Subang profesional di Sefya Dental Studio. Perawatan gigi modern, steril & aman. Behel, cabut gigi, scaling, veneer, dan implan. Konsultasi gratis!",
    keywords = "dokter gigi subang, dokter gigi pagaden, klinik gigi subang, perawatan gigi subang, behel gigi subang, cabut gigi subang, scaling gigi subang, veneer gigi subang, sefya dental studio, dental studio subang, klinik gigi terbaik subang, dokter gigi terdekat, membersihkan karang gigi, pasang behel, kawat gigi, tambal gigi, implan gigi",
    url = "https://sefyadentalstudio.web.id",
    image = "https://sefyadentalstudio.web.id/og-image.svg",
}) => {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Dentist",
                "@id": "https://sefyadentalstudio.web.id#dentist",
                name: "Sefya Dental Studio",
                image: "https://sefyadentalstudio.web.id/og-image.svg",
                url: "https://sefyadentalstudio.web.id",
                telephone: "+6288975262351",
                email: "sefyadentalstudio@gmail.com",
                description:
                    "Klinik dokter gigi di Subang dengan perawatan modern, steril, dan nyaman. Layanan behel, scaling, cabut gigi, veneer, implan, dan tambal gigi.",
                priceRange: "Rp 100.000 - Rp 5.000.000",
                areaServed: {
                    "@type": "City",
                    name: ["Subang", "Pagaden", "Pamanukan", "Subang Regency"],
                },
                hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Layanan Gigi",
                    itemListElement: [
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pemasangan Behel / Kawat Gigi" } },
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Scaling / Pembersihan Karang Gigi" } },
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cabut Gigi" } },
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Veneer Gigi" } },
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tambal Gigi" } },
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Implan Gigi" } },
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Konsultasi Gigi" } },
                    ],
                },
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Jl. Subang Pamanukan, Sukamulya",
                    addressLocality: "Pagaden",
                    addressRegion: "Subang",
                    postalCode: "41252",
                    addressCountry: "ID",
                },
                geo: {
                    "@type": "GeoCoordinates",
                    latitude: -6.470056305125251,
                    longitude: 107.81009223152965,
                },
                openingHoursSpecification: [
                    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "08:00", closes: "20:00" },
                    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "08:00", closes: "20:00" },
                    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "08:00", closes: "20:00" },
                    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "08:00", closes: "20:00" },
                    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "08:00", closes: "20:00" },
                    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "20:00" },
                    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "08:00", closes: "20:00" },
                ],
                sameAs: [
                    "https://www.instagram.com/sefyadentalstudio",
                    "https://sefyadentalstudio.web.id",
                ],
                foundingDate: "2020",
                aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    bestRating: "5",
                    ratingCount: "85",
                    reviewCount: "85",
                },
            },
            {
                "@type": "LocalBusiness",
                "@id": "https://sefyadentalstudio.web.id#localbusiness",
                parentOrganization: { "@id": "https://sefyadentalstudio.web.id#dentist" },
                name: "Sefya Dental Studio",
                image: "https://sefyadentalstudio.web.id/og-image.svg",
                telephone: "+6288975262351",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Jl. Subang Pamanukan, Sukamulya",
                    addressLocality: "Pagaden",
                    addressRegion: "Subang",
                    postalCode: "41252",
                    addressCountry: "ID",
                },
                geo: {
                    "@type": "GeoCoordinates",
                    latitude: -6.470056305125251,
                    longitude: 107.81009223152965,
                },
            },
            {
                "@type": "MedicalBusiness",
                "@id": "https://sefyadentalstudio.web.id#medical",
                parentOrganization: { "@id": "https://sefyadentalstudio.web.id#dentist" },
                name: "Sefya Dental Studio",
                specialty: "Dentistry",
            },
        ],
    };

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={url} />
            <meta name="geo.region" content="ID-JB" />
            <meta name="geo.placename" content="Subang" />
            <meta name="geo.position" content="-6.470056305125251;107.81009223152965" />
            <meta name="ICBM" content="-6.470056305125251, 107.81009223152965" />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Sefya Dental Studio" />
            <meta property="og:locale" content="id_ID" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            <link rel="alternate" href={url} hrefLang="id-id" />
            <link rel="alternate" href={url} hrefLang="id" />

            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};

export default SEO;

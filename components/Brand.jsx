export default function Brand({ type }) {
    return (
        <img
            src={
                type == "icon"
                    ? "/logo-icon.png"
                    : type == "text"
                    ? "/logo-text.png"
                    : ""
            }
            alt='Logo Bank Sampah Banyuwangi'
        />
    );
}

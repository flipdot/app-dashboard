import "./Spinner.css";

function Spinner({size}: { size?: "sm" | "md" | "lg" }) {
    size = size || "md";
    return <div className={`spinner spinner-${size}`}>
    </div>;
}

export default Spinner;
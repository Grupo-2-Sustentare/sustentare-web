import "./vectorIcon.module.css";

const VectorIconDefinition = ({ className }) => (
    <svg
        className={className} // Adicionando a propriedade className
        preserveAspectRatio="none"
        viewBox="0 0 26 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M14.9454 23.3255L13.6572 24.5964C13.1117 25.1345 12.2297 25.1345 11.69 24.5964L0.409106 13.4732C-0.136369 12.9351 -0.136369 12.0649 0.409106 11.5325L11.69 0.403595C12.2355 -0.134532 13.1175 -0.134532 13.6572 0.403595L14.9454 1.67449C15.4967 2.21834 15.4851 3.10568 14.9222 3.63808L7.9297 10.2101H24.6073C25.3791 10.2101 26 10.8226 26 11.584V13.416C26 14.1774 25.3791 14.7899 24.6073 14.7899H7.9297L14.9222 21.3619C15.4909 21.8943 15.5025 22.7817 14.9454 23.3255Z"
            fill="#F5FBEF"
        />

    </svg>
);

export default function VectorIcon() {
    return (
        <div>
            <VectorIconDefinition className="icon" />
        </div>
    );
}

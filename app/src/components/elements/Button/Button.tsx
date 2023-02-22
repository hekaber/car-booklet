import React from 'react';
import './Button.css';

interface Iprops {
    label: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
}

const Button: React.FC<Iprops> = ({ label, onClick, disabled = false }) => {
    return (
        <button className="app-btn" onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
};

export default Button;
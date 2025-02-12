import React from 'react'

type INPUTProps = {
    placeholder: string;
    classname: string;
    value: string; // 현재 입력값
    onChange: (value: string) => void; // 입력값 변경 핸들러
    type ?: string
};
const INPUT: React.FC<INPUTProps> = ({ placeholder, classname, value, onChange, type='text'}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`${classname} border rounded-2xl drop-shadow-xl placeholder-custom-blue`}
            value={value}
            onChange={(e) => onChange(e.target.value)} // 입력값 변경 시 호출
        />
    );
};

export default INPUT;
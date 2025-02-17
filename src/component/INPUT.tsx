type INPUTProps = {
    classname?: string;
    placeholder: string;
    value: string | number; // value를 string 또는 number로 받을 수 있게 수정
    onChange: React.ChangeEventHandler<HTMLInputElement>; // onChange 타입 수정
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>)=>void;
    type?: 'text' | 'password' | 'number'; // 숫자 타입 추가
}

const INPUT: React.FC<INPUTProps> = ({ classname, placeholder, value, onChange, onKeyDown, type = 'text' }) => {
    return (
        <input
        className={`${classname} border rounded-2xl drop-shadow-xl placeholder-custom-blue`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            type={type} // 'number' 타입 사용
            onKeyDown={onKeyDown}
        />
    );
}

export default INPUT;
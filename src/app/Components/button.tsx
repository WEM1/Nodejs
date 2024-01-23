import style from './button.module.css';

export default function Button({
  children,
  onClick,
}: {
  children: string;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className={style.button}>
      {children}
    </button>
  );
}

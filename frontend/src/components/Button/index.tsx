import * as S from './styles';

interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({ onClick, children, disabled }) => (
  <S.Button
    type="button"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </S.Button>
);

export default Button;

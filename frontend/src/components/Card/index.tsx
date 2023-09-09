import { IProduct } from '../../interfaces/pricing';
import * as S from './styles';

const Card = ({
  product_code,
  name,
  new_price,
  sales_price,
  errors,
}: IProduct) => (
  <S.Container errors={errors.length > 0}>
    <div className="info">
      <p>
        <strong>código: </strong>
        {product_code ?? '-'}
      </p>
      <p>
        <strong>nome: </strong>
        {name ?? '-'}
      </p>
      <p>
        <strong>preço atual: </strong>
        {sales_price ? `R$ ${sales_price.replace('.', ',')}` : '-'}
      </p>
      <p>
        <strong>novo preço: </strong>
        {new_price ? `R$ ${new_price.replace('.', ',')}` : '-'}
      </p>
    </div>

    {errors.length > 0 && (
      <div className="errors">
        <strong>Erros:</strong>
        {errors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </div>
    )}
  </S.Container>
);

export default Card;

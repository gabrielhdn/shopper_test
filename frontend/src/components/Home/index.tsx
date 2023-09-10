import { useRef, useState, ChangeEvent } from 'react';
import Papa from 'papaparse';

import { IPricingData, IProduct } from '../../interfaces/pricing';
import PricingService from '../../services/PricingService';

import Logo from '../../assets/shoppermain.png';
import Button from '../Button';
import * as S from './styles';
import Card from '../Card';

const Home = () => {
  const [pricingData, setPricingData] = useState<IPricingData[] | null>(null);
  const [validatedProducts, setValidatedProducts] = useState<IProduct[] | null>(null);
  const [serverError, setServerError] = useState<boolean>(false);
  const [isDataOk, setIsDataOk] = useState<boolean>(false);
  const [wereProductsUpdated, setWereProductsUpdated] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadButtonClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const csv = event.target.files?.[0];

    if (csv) {
      const reader = new FileReader();
      reader.readAsText(csv);

      reader.onload = async (e) => {
        const csvContent = e.target?.result as string;

        Papa.parse(csvContent, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            if (result.data && result.data.length > 0) {
              setPricingData(result.data as IPricingData[]);
              setWereProductsUpdated(false);
              setIsDataOk(false);
              setValidatedProducts(null);
            }
          },
        });
      };
    }
  };

  const handleSubmitToValidation = async () => {
    if (pricingData) {
      try {
        const products = await PricingService.validateData(pricingData);
        setValidatedProducts(products);

        if (products.some((product: IProduct) => product.errors.length > 0)) {
          setIsDataOk(false);
        } else {
          setIsDataOk(true);
        }

        setWereProductsUpdated(false);
        setServerError(false);
      } catch {
        setServerError(true);
      }
    }
  };

  const handleUpdate = async () => {
    if (pricingData) {
      try {
        await PricingService.updatePricing(pricingData);

        setServerError(false);
        setIsDataOk(false);
        setPricingData(null);
        setValidatedProducts(null);
        setWereProductsUpdated(true);
      } catch {
        setServerError(true);
      }
    }
  };

  return (
    <S.Container>
      <header>
        <img src={Logo} alt="Shopper" />
      </header>

      <div className="instructions">
        <h2>
          Olá! Seja bem-vindo(a) à página de atualização de preços da Shopper!
        </h2>

        <p>Carregue um arquivo .csv no botão abaixo e, em seguida, clique em VALIDAR.</p>
        <p>
          Depois, você verá uma lista com os produtos que deseja atualizar. Produtos com erro
          estarão sinalizados em vermelho. Corrija os erros para prosseguir com a atualização.
        </p>
      </div>

      <div className="buttons">
        <div className="uploadButton">
          <Button onClick={handleUploadButtonClick}>
            Selecione o arquivo de precificação
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            onChange={handleUpload}
          />
        </div>

        <div className="action-buttons">
          <Button
            onClick={handleSubmitToValidation}
            disabled={!pricingData}
          >
            VALIDAR
          </Button>

          <Button disabled={!isDataOk} onClick={handleUpdate}>
            ATUALIZAR
          </Button>
        </div>
      </div>

      <div className="response">
        {serverError && (
        <p>A conexão com o servidor não foi possível. Tente novamente mais tarde!</p>
        )}

        {(validatedProducts && isDataOk && !serverError) && (
          <p>Produtos validados com sucesso! Clique em ATUALIZAR para finalizar o processo.</p>
        )}

        {(validatedProducts && !isDataOk && !serverError) && (
          <p>Seu arquivo contém erros. Corrija-os e tente novamente.</p>
        )}

        {wereProductsUpdated && (
          <p>Preços atualizados com sucesso!</p>
        )}
      </div>

      <S.ProductsContainer>
        {validatedProducts?.map((product) => (
          <Card
            key={product.product_code}
            product_code={product.product_code}
            name={product.name}
            new_price={product.new_price}
            sales_price={product.sales_price}
            errors={product.errors}
          />
        ))}
      </S.ProductsContainer>
    </S.Container>
  );
};

export default Home;

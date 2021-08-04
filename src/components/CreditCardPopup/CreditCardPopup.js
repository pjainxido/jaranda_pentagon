import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "styles/theme";

const CreditCardPopup = ({ onClose, saveCardInfo }) => {
  const [inputs, setInputs] = useState({
    card1: "",
    card2: "",
    card3: "",
    card4: "",
    month: "",
    year: "",
    cvc: "",
  });

  const [cautions, setCautions] = useState({
    0: "",
    1: "",
    2: "",
  });

  const cardNumberRefs = useRef([]);

  const { card1, card2, card3, card4, month, year, cvc } = inputs;

  const onChange = (e) => {
    let { value, name } = e.target;
    value = value.replace(/[^0-9]/g, "");

    const idx = cardNumberRefs.current.findIndex((ref) => ref === e.target);

    if (idx !== -1 && idx !== 3 && value.length === 4) {
      cardNumberRefs.current[idx + 1].focus();
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const cardNumberValidation = () => {
    if (
      cardNumberRefs.current.findIndex(({ value }) => value.length !== 4) !== -1
    ) {
      setCautions((prev) => {
        return { ...prev, 0: "카드번호를 확인하세요" };
      });
      return false;
    }

    setCautions((prev) => {
      return { ...prev, 0: "" };
    });

    return true;
  };

  const effectiveDateValidation = () => {
    if (month.length === 0 || year.length === 0) {
      setCautions((prev) => {
        return { ...prev, 1: "유효기간을 확인하세요" };
      });
      return false;
    }

    if (month <= 0 || month > 12) {
      setCautions((prev) => {
        return { ...prev, 1: "월은 1 ~ 12 사이의 값만 가능합니다" };
      });
      return false;
    }

    setCautions((prev) => {
      return { ...prev, 1: "" };
    });

    return true;
  };

  const CVCValidation = () => {
    if (cvc.length !== 3) {
      setCautions((prev) => {
        return { ...prev, 2: "CVC번호를 확인하세요" };
      });
      return false;
    }

    setCautions((prev) => {
      return { ...prev, 2: "" };
    });

    return true;
  };

  const format = (n) => (n.length === 1 ? `0${n}` : n);

  const onConfirmClick = () => {
    let result = cardNumberValidation();
    result &= effectiveDateValidation();
    result &= CVCValidation();

    if (result) {
      saveCardInfo((prev) => ({
        ...prev,
        ["cardNumber"]: `${card1} - ${card2} - ${card3} - ${card4}`,
        ["effectiveDate"]: `${format(month)} / ${format(year)}`,
        ["cvc"]: cvc,
      }));

      onClose();
    }
  };

  return (
    <Container onClick={({ target }) => !target.closest("table") && onClose()}>
      <Wrapper>
        <Table>
          <thead>
            <tr>
              <th>신용카드 정보 입력</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                카드번호
                {cautions[0] && <Caution>{cautions[0]}</Caution>}
              </td>
            </tr>
            <tr>
              <td>
                {[0, 1, 2, 3].map((i) => (
                  <React.Fragment key={i}>
                    <StyledInput
                      ref={(r) => (cardNumberRefs.current[i] = r)}
                      type='text'
                      name={`card${i + 1}`}
                      value={inputs[`card${i + 1}`]}
                      maxLength='4'
                      onChange={onChange}
                    />
                    {i !== 3 && <span>-</span>}
                  </React.Fragment>
                ))}
              </td>
            </tr>
            <tr>
              <td>
                유효기간
                {cautions[1] && <Caution>{cautions[1]}</Caution>}
              </td>
            </tr>
            <tr>
              <td>
                <StyledInput
                  type='text'
                  name='month'
                  value={month}
                  placeholder='월'
                  maxLength='2'
                  onChange={onChange}
                />
                <span>/</span>
                <StyledInput
                  type='text'
                  name='year'
                  value={year}
                  placeholder='년'
                  maxLength='2'
                  onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                CVC번호
                {cautions[2] && <Caution>{cautions[2]}</Caution>}
              </td>
            </tr>
            <tr>
              <td>
                <StyledInput
                  type='text'
                  name='cvc'
                  value={cvc}
                  maxLength='3'
                  onChange={onChange}
                />
                <Hint>카드 뒷면 마지막 3자리 숫자</Hint>
              </td>
            </tr>
            <tr>
              <td>
                <StyledButton onClick={onConfirmClick}>확인</StyledButton>
                <StyledButton onClick={onClose}>취소</StyledButton>
              </td>
            </tr>
          </tbody>
        </Table>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(80, 80, 80, 0.5);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Table = styled.table`
  background-color: #fff;
  border-radius: 10px;

  & > :first-child > tr > th {
    font-size: 18px;
    font-weight: 600;
    padding: 30px;
    text-align: center;
  }

  & > tbody > tr > td {
    padding: 10px 50px;
  }

  & > tbody > tr > td > span {
    padding: 0 10px;
  }

  & > tbody > :last-child > td {
    text-align: right;
    padding-bottom: 30px;
  }

  & > tbody > :last-child > td :first-child {
    margin-right: 20px;
    background-color: ${theme.colors.blue};
    color: #fff;
  }
`;

const Hint = styled.span`
  font-size: 13px;
  color: #808080;
`;

const Caution = styled.span`
  font-size: 14px;
  color: red;
`;

const StyledInput = styled.input`
  ${theme.common.input}
  width: 70px;
  padding: 10px 0 10px 10px;

  :focus {
    color: ${({ theme }) => theme.colors.blue};
    background-color: rgba(0, 133, 253, 0.1);
    border: 0.5px solid ${({ theme }) => theme.colors.blue};
  }
`;

const StyledButton = styled.button`
  ${theme.common.button}
  padding: 10px 30px;
`;

CreditCardPopup.propTypes = {
  onClose: PropTypes.func,
  saveCardInfo: PropTypes.func,
};

export default CreditCardPopup;

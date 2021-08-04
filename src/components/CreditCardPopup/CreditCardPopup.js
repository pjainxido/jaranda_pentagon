import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CreditCardPopup = ({ onClose }) => {
  const [inputs, setInputs] = useState({
    card1: "",
    card2: "",
    card3: "",
    card4: "",
    month: "",
    year: "",
    cvc: "",
  });

  const cardNumberRefs = useRef([]);

  const { month, year, cvc } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    const idx = cardNumberRefs.current.findIndex((ref) => ref === e.target);

    if (idx !== -1 && idx !== 3 && value.length === 4) {
      cardNumberRefs.current[idx + 1].focus();
    }

    setInputs({
      ...inputs,
      [name]: value.replace(/[^0-9]/g, ""),
    });
  };

  // 월 00 및 12 이상 검사, 빈칸 검사
  const onConfirmClick = () => {
    // .current.focus();
  };

  return (
    <>
      <Overlay />
      <Container>
        <Wrapper>
          <Table>
            <thead>
              <tr>
                <th>신용카드 정보 입력</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>카드번호</td>
              </tr>
              <tr>
                <td>
                  {[0, 1, 2, 3].map((i) => (
                    <React.Fragment key={i}>
                      <Input
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
                <td>유효기간</td>
              </tr>
              <tr>
                <td>
                  <Input
                    type='text'
                    name='month'
                    value={month}
                    placeholder='월'
                    maxLength='2'
                    onChange={onChange}
                  />
                  <span>/</span>
                  <Input
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
                <td>CVC 번호</td>
              </tr>
              <tr>
                <td>
                  <Input
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
                  <button onClick={onConfirmClick}>확인</button>
                  <button onClick={onClose}>취소</button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Wrapper>
      </Container>
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #808080;
  opacity: 0.5;
`;

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
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
    padding: 30px 0;
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
    margin-right: 30px;
  }
`;

const Hint = styled.span`
  font-size: 13px;
  color: #808080;
`;

const Input = styled.input`
  width: 70px;
`;

CreditCardPopup.propTypes = {
  onClose: PropTypes.func,
};

export default CreditCardPopup;

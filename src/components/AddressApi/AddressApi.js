import React, { useState } from "react";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import PropTypes from "prop-types";

const POST_WIDTH = 600;
const POST_HEIGHT = 450;
const POST_STYLE = {
  position: "absolute",
  zIndex: "100",
  border: "1px solid #dbdbdb",
};

const AddressApi = ({ inputs, setInputs }) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setInputs({
      ...inputs,
      address: fullAddress,
    });
  };

  const handleApiModal = () => {
    setInputs({ ...inputs, isDaumPost: false });
  };

  return (
    <ModalBox onClick={handleApiModal}>
      <DaumPostcode
        onComplete={handleComplete}
        autoClose
        width={POST_WIDTH}
        height={POST_HEIGHT}
        style={POST_STYLE}
      />
    </ModalBox>
  );
};
AddressApi.propTypes = {
  inputs: PropTypes.object,
  setInputs: PropTypes.func,
};

const ModalBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(14, 13, 13, 0.3);
  z-index: 99;
`;

export default AddressApi;

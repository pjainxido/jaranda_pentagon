import React from "react";
import DaumPostCode from "react-daum-postcode";

const POST_WIDTH = 600;
const POST_HEIGHT = 450;
const POST_STYLE = {
  position: "absolute",
  zIndex: "100",
  border: "1px solid #dbdbdb",
};

const AddressApi = () => {
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

    console.log(fullAddress);
  };

  return (
    <>
      <DaumPostcode
        onComplete={handleComplete}
        autoClose
        width={POST_WIDTH}
        height={POST_HEIGHT}
        style={POST_STYLE}
      />
    </>
  );
};

export default AddressApi;

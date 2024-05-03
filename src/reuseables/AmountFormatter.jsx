import React from "react";
import { FormattedNumber } from "react-intl";
import { FormatCorrect } from "../utils/format";

const AmountFormatter = ({ value, currency }) => {
  return FormatCorrect(value, currency);
};

export default AmountFormatter;

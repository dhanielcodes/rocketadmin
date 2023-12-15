export const kFormatter2 = (num) => {
    return `${num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  };
export function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
  return x;
}


  export const kFormatter3 = (num) => {
    return `₦${num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  };
  export const kFormatter4 = (val) =>  {
    return Math.abs(val) > 999999999
      ? `${Math.sign(val) * (Math.abs(val) / 1000000000).toFixed(1)}B`
      : Math.abs(val) > 999999
      ? `${Math.sign(val) * (Math.abs(val) / 1000000).toFixed(1)}M`
      : Math.abs(val) > 999
      ? `${Math.sign(val) * (Math.abs(val) / 1000).toFixed(1)}k`
      : Math.sign(val) * Math.abs(val);
  }

  export const kFormatter = (val) =>  {
    return Math.abs(val) > 999999999
      ? `₦ ${Math.sign(val) * (Math.abs(val) / 1000000000).toFixed(1)}B`
      : Math.abs(val) > 999999
      ? `₦${Math.sign(val) * (Math.abs(val) / 1000000).toFixed(1)}M`
      : Math.abs(val) > 999
      ? `₦${Math.sign(val) * (Math.abs(val) / 1000).toFixed(1)}k`
      : Math.sign(val) * Math.abs(val);
  }


export const removeDup = (array) => {
  if(array){
    return array
    .filter(
      (ele, ind) =>
        ind ===
        array
          .findIndex(
            (elem) => elem.value === ele.value && elem.text === ele.text
          )
    )
  }else{
    return []
    .filter(
      (ele, ind) =>
        ind ===
        []
          .findIndex(
            (elem) => elem?.value === ele?.value && elem?.text === ele?.text
          )
    )
  }

  }
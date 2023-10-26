/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import CountryFlag from 'react-country-flag';
import { styled } from 'styled-components'
const CountryDropdown = ({ value, onChange,style,defaultValue,option}) => {
  const options = option || countryList().getData();

  return (
    <CountyCont>

    <Select
      value={value}
      onChange={onChange}
      options={options}
      defaultValue={defaultValue}
      getOptionLabel={(country) => (
        <div className='dropdown' style={{style} || {display:"inline-flex",gap:"2px",alignItems:"center", borderColor: '#dadada !important',borderRadius:"8px"}}>
          <CountryFlag className='flag' countryCode={country.value} svg /> &nbsp;
         <span className='countryName' style={{fontSize:"10px"}}  >{country.label}</span> 
        </div>
      )}
      styles={{
        option: (styles) => ({
          ...styles,
          display: 'flex',
          alignItems: 'center',
          color:"#000",
          fontSize:"30px", 
        //   border:"0.1px solid #d8d8d8",
        //   backgroundColor:"#e4e4e4",
        //   borerRadius:"18px"
        }),
        menuList:(styles) => ({
            ...styles,
            display: 'flex',
            backgroundColor:"#FFF",
            flexDirection:"column",
            // gap:"10px",
            color:"#FFF",
            borerRadius:"18px",
            alignItems: 'center',
          
        }),
        
        singleValue: (styles) => ({
            ...styles,
            display: 'flex',
            color:"#000",
            alignItems: 'center',
            '> svg': {
              marginRight: '8px',
              borderRadius: '50%',
            },
          }),
         
      }}
      
    />
  </CountyCont>
  );

};


const CountyCont = styled.div`

  width: 20%;

    .flag{

        @media screen and (max-width: 40em){
            font-size: 20px;
            
        }
        font-size: 30px;
        border-radius: 50% !important;
        margin-top: 5px;
        /* border: 1px solid rgba(5, 142, 78, 1); */
    }
    .countryName{
        /* font-weight: bold !important ; */

    }
    .dropdown:focus{
        color: black;
    }

`

export default CountryDropdown;

import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const ErrorPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard'); // Change to dashboard
  };

  return (
    <div style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column", 
        height: '100vh',
    }}>
        <p style={{
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "38px",
            textAlign: "left",
            margin:"5px 0px",
        }}>Мы не можем найти эту страницу</p>
        <p style={{
            fontSize: "13px",
            fontWeight: "400",
            lineHeight: "23px",
            margin:"10px 0px",
        }}>Такой страницы не существует, или у вас нет прав для просмотра</p>
        <Button
            onClick={handleClick}
            sx={{
              width: "214px",
              height: "34px",
              border: "1px solid #7F56D9",
              backgroundColor: "#7F56D9",
              color:"#FFFFFF",
              fontSize: 13,
              fontWeight: 400,
              textTransform: "none",
              padding:"10px auto",
              boxShadow: '0px 1px 2px 0px #1018280D',
              margin:"45px 0px",
              "&:hover": {
                backgroundColor: "#602ece",
                border: "1px solid #602ece",
              },
            }}
          >Вернуться на главную страницу</Button>
    </div>
  )
}

export default ErrorPage
import { createContext } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'


const MovieContext = createContext();


function Provider({ children }) {
 // LOGİN PANEL KODLARI
 const [users, setUsers] = useState([]);
 const [userName, setUserName] = useState('');
 const [mail, setMail] = useState('');
 const [userPassword, setUserPassword] = useState('');
 const [successMessage, setSuccessMessage] = useState('');
 const [errorMessage, setErrorMessage] = useState('');

 const [checkedMail, setCheckedMail] = useState("");
 const [checkedPassword, setCheckedPassword] = useState("");
 const [activeTab, setActiveTab] = useState(0);
 const [isNameValid, setIsNameValid] = useState(true); // Ad soyad geçerli mi kontrolü için bir state

 const handleTabChange = (event, newValue) => {
     setActiveTab(newValue);
 };

 const handleNameChange = (event) => {
     const name = event.target.value;
     const isValid = name.split(' ').length >= 2;  // Ad soyadın en az iki kelime içerdiğini kontrol et
     setIsNameValid(isValid);
     setUserName(name);
 };


 const handleSubmit = async (event) => {
     event.preventDefault();  // form onsubmit olduğunda yenilenmemesi için kullanılmıştır.

     if (!userName || !mail || !userPassword) {
         setErrorMessage('Lütfen tüm alanları doldurun.');
         return;
     }

     if (!validateEmail(mail)) {
         setErrorMessage('Lütfen geçerli bir e-posta adresi girin.');
         return;
     }
     if (isNameValid) {
         try {
             const response = await axios.post('https://63ffe8979f84491029863dda.mockapi.io/apis', {
                 userName,
                 mail,
                 userPassword,
             });
             const createdUser = [...users, response.data];
             setUsers(createdUser);
             setSuccessMessage('Kayıt başarıyla tamamlandı.');
             setErrorMessage('');
             setActiveTab(0);
             resetForm();

         } catch (error) {
             setErrorMessage('Kayıt sırasında bir hata oluştu.');
             setSuccessMessage('');

         }
     }
     else {
         setErrorMessage('Ad ve soyadınızı boşluklu yazdığınızdan emin olun.');

     }

 };

 const validateEmail = (email) => { // mail yazım kontrolü
     const re = /\S+@\S+\.\S+/;
     return re.test(email);
 };

 const resetForm = () => {  // işlem bitiminden sonra formların resetlenmesi
     setUserName('');
     setMail('');
     setUserPassword('');
     const RegisterForm = document.getElementById('registration-form');
     if (RegisterForm) {
         RegisterForm.reset();
     }

     setCheckedMail();
     setCheckedPassword();
     const loginForm = document.getElementById('login-form');
     if (loginForm) {
         loginForm.reset();
     }


     const CreatedBlogForm = document.getElementById('CreatedBlogForm');
     if (CreatedBlogForm) {
         CreatedBlogForm.reset();
     }
 };



 const handleSubmitChecked = async (event) => {
     event.preventDefault();
     if (!checkedMail || !checkedPassword) {
         setErrorMessage('Lütfen tüm alanları doldurun.');
         return;
     }
     try {
         const response = await axios.get('https://63ffe8979f84491029863dda.mockapi.io/apis');
         const users = response.data;

         users.forEach((user) => {

             if (user.mail === checkedMail && user.userPassword === checkedPassword) {
                 setErrorMessage('');
                 setCheckedMail('');
                 setCheckedPassword('');
                 resetForm();
                 setSuccessMessage('Giriş Başarılı Hoşgeldiniz.');
                 setIsLoggined({ name: user.userName, mail: user.mail, id: user.id, check: true })

             }
             else {
                 setErrorMessage('Mail ya da Şifreniz Yanlış Olabilir.');
                 setSuccessMessage('');

             }
         });
     } catch (error) {
         setErrorMessage('Veri alınırken bir hata oluştu:', error);
         setSuccessMessage('');

     }
 };

    // USER İMAGE
    function stringToColor(string) {
        if (!string) {
            return '#000000'; // Varsayılan renk: siyah
        }

        let hash = 0;

        for (let i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (let i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }


    function stringAvatar(name) {
        if (!name || name.trim() === "") {
          return null; // İsim yoksa avatar döndürme
        }
      
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.toUpperCase().split(' ')[0][0]}${name[1] ? name.toUpperCase().split(' ')[1][0] : ''}`,
        };
      }
      
    // USER İMAGE END


 // Navbar 
 const [isLoggined, setIsLoggined] = useState({
    name: undefined,
    mail: "",
    id: "",
    check: false
})
// Navbar BİTİMİ

    const sharedValuesAndMethods = {
        handleTabChange,
        activeTab,
        setUserPassword,
        handleSubmit,
        setMail,
        successMessage,
        setSuccessMessage,
        setErrorMessage,
        errorMessage,
        handleSubmitChecked,
        setCheckedMail,
        setCheckedPassword,
        isLoggined,
        setIsLoggined,
        isNameValid,
        handleNameChange,
        stringAvatar,
    

    }

    return (
        <MovieContext.Provider value={sharedValuesAndMethods}>
            {children}
        </MovieContext.Provider>
    )

}

export { Provider }
export default MovieContext
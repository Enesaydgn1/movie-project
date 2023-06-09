import React, { useState, useContext, useEffect } from 'react';
import './comment.css';
import Rating from '@mui/material/Rating';
import MovieContext from '../../context/context';
import { Typography, Avatar, Stack } from '@mui/material';
import axios from 'axios';

function Comment({ currentMovieId }) {
  const [userComment, setUserComment] = useState('');
  const [userCommentTitle, setUserCommentTitle] = useState('');
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState(5);
  const [errorMessage, setErrorMessage] = useState('');
  const { isLoggined, stringAvatar } = useContext(MovieContext);

  useEffect(() => {
    // API'den mevcut filmin yorumlarını al
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/comments?movieId=${currentMovieId}`);
      console.log(response.data); // API'den gelen verileri konsola yazdır
      setComments(response.data);
    } catch (error) {
      console.error('Yorumları alırken bir hata oluştu:', error);
      setErrorMessage('Yorumları alırken bir hata oluştu.');
    }
  };

  const handleCommentChange = (event) => {
    setUserComment(event.target.value);
  };

  const submitComment = () => {
    if (isLoggined.check) {
      // Kullanıcı girişi yapıldıysa yorum gönderme işlemleri
    
        const newComment = {
          movieId: currentMovieId,
          author: isLoggined.name,
          title: userCommentTitle,
          content: userComment,
          rating: value,
        };
        setComments((prevComments) => [...prevComments, newComment]);
        setUserComment('');
        setUserCommentTitle('');
        setValue(2);
        console.log('Yorum gönderildi:', newComment);
        postComment(newComment); // Yorumu API'ye gönder
      
    } else {
      // Kullanıcı girişi yapılmadıysa uyarı verme
      setErrorMessage('Kullanıcı girişi yapmadınız.');
    }
  };

  const postComment = (comment) => {
    axios
      .post('http://localhost:3000/comments', comment)
      .then((response) => {
        console.log("Yorum API'ye başarıyla gönderildi.");
      })
      .catch((error) => {
        console.error('Yorumu gönderirken bir hata oluştu:', error);
      });
  };

  return (
    <div className='comment'>
      <p className='errormessage'>{errorMessage}</p>
      <div className='movie__addComment'>
        <Typography component='legend'>PUAN VERİN</Typography>
        <Rating
          name='simple-controlled'
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <input
          type='text'
          placeholder='Başlığınızı Girin'
          value={userCommentTitle}
          onChange={(event) => setUserCommentTitle(event.target.value)}
        />
        <textarea
          name=''
          id=''
          cols='30'
          rows='10'
          placeholder='Yorumunuzu girin'
          value={userComment}
          onChange={handleCommentChange}
        />
        <button onClick={submitComment}>Yorum Yap</button>
      </div>
      <br />

      <div className='movie__comments'>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index}>
              <hr />
              <div className='movie__comment_header'>
                <Stack direction='row' spacing={2} style={{ marginTop: 40 }}>
                  <Avatar className='avatar' {...stringAvatar(comment.author)} />
                </Stack>
                <h3>{comment.author}</h3>
                <Rating name='read-only' value={comment.rating} readOnly />
              </div>
              <div className='movie__Content'>
                <h2>{comment.title}</h2>
                <p>{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <h3>Henüz yorum bulunmamaktadır.</h3>
        )}
      </div>
    </div>
  );
}

export default Comment;

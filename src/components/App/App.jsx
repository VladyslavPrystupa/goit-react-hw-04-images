import { useEffect, useState } from 'react';
import { fetchApi } from '../../services/api';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Error } from 'components/Error/Error';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (searchQuery) {
      async function fetchData() {
        try {
          setStatus('pending');

          const response = await fetchApi(searchQuery, page);

          if (response.hits.length === 0) {
            setImages([]);
            return toast.error('No such value, please enter something valid', {
              autoClose: 2000,
            });
          }

          setImages(prevImages => [...prevImages, ...response.hits]);
        } catch (error) {
          setError(error);
        } finally {
          setStatus('idle');
        }
      }
      fetchData();
    }
  }, [searchQuery, page]);

  //   useEffect(() => {
  //     console.log(321);
  //     if (page !== 1) {
  //       console.log(123);
  //       const query = async () => {
  //         try {
  //           setStatus('pending');

  //           const response = await fetchApi(searchQuery, page);

  //           setImages(prevImages => {
  //             return [...prevImages, ...response.hits];
  //           });
  //         } catch (error) {
  //           setError(error);
  //         } finally {
  //           setStatus('idle');
  //         }
  //       };
  //       query();
  //     }
  //   }, [page, searchQuery]);

  const toggleModal = () => {
    setShowModal(prewShowModal => !prewShowModal);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSubmit = value => {
    setSearchQuery(value);
    setPage(1);
    setImages([]);
  };
  return (
    <>
      <ToastContainer />
      <Searchbar onSearch={handleSubmit} />

      <ImageGallery
        images={images}
        onClick={toggleModal}
        imgId={id => setSelectedImg(id)}
      />

      {status === 'pending' && <Loader />}
      {error && <Error error={error.message} />}
      {images.length > 0 && status !== 'pending' && (
        <Button loadMore={loadMoreImages} />
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={selectedImg} alt="" />
        </Modal>
      )}
    </>
  );
};

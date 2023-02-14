import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai'

const SavedMovies = () => {
    const [movies, setMovies] = useState([]);
    const { user } = UserAuth();

    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    };
    const slideRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedMovies);
        });
    }, [user?.email]);

    const movieRef = doc(db, 'users', `${user?.email}`);

    const deleteShow = async (passedID) => {
        try {
            const result = movies.filter((movie) => movie.id !== passedID)
            await updateDoc(movieRef, {
                savedMovies: result
            })
        } catch (err) {
          console.log(err)
      }
  }

    // Shrink the overview text
    const tuncateString = (str, num) =>{
        if(str?.length > num){
             return str.slice(0, num) + '...'
        }else {
            return str;
        }
    }
  return (
    <>
        <h2 className='text-white font-bold md:text-xl p-4'>My Movies</h2>
        <div className='relative flex items-center group'>
            <MdChevronLeft className='bg-white rounded-full absolute left-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' 
            size={40}
            onClick={slideLeft}
            />
            <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative' >
                {movies.map((movie, id)=>(
                    <div key={id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
                        <img
                            className='w-full h-auto block' 
                            src={`https://image.tmdb.org/t/p/w500/${movie?.img}`} 
                            alt={movie?.title} 
                        />
                        <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                            <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                                {tuncateString(movie?.title, 30)}
                            </p>
                            <p onClick={()=>{deleteShow(movie.id)}} className='absolute top-4 right-4 text-gray-400'><AiOutlineClose/></p>
                        </div>
                    </div>
                ))}
            </div>
            <MdChevronRight className='bg-white rounded-full absolute right-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' 
            size={40}
            onClick={slideRight}
            />
        </div>
    </>
  )
}

export default SavedMovies
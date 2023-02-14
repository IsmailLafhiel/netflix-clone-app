import React, {useState} from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';


const Movie = ( {movie} ) => {
    
    const [like, setLike]=useState(false);
    const [saved, setSaved]= useState(false);
    const {user}= UserAuth();

    const movieID = doc(db, 'users', `${user?.email}`)

    const savedMovie= async ()=>{
        if(user?.email){
            setLike(!like)
            setSaved(true)
            await updateDoc(movieID, {
                savedMovies: arrayUnion({
                    id: movie.id,
                    title: movie.title,
                    img: movie.backdrop_path
                })
            })
        }else{
            alert('You should logIn to save a movie')
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
    <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
        <img
            className='w-full h-auto block' 
            src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`} 
            alt={movie?.title} 
        />
        <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
            <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                {tuncateString(movie?.title, 30)}
            </p>
            <p onClick={savedMovie}>
                {like ? <FaHeart className='absolute top-4 right-4 text-gray-300'/> : <FaRegHeart className='absolute top-4 right-4 text-gray-300'/>}
            </p>
        </div>
    </div>
  )
}

export default Movie
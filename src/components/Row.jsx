import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import axios from 'axios'
import Movie from './Movie';
// import requests from '../Requests'
const Row = ({title, fetchURL, rowId}) => {

    const [movies, setMovies]= useState([])

    useEffect(()=>{
        axios.get(fetchURL).then((response)=>{
            setMovies(response.data.results);
        });
    }, [fetchURL]);
    // console.log(movies);

    const slideLeft =()=>{
        var slider= document.getElementById('slider' + rowId);
        slider.scrollLeft -= 500;
    }
    const slideRight =()=>{
        var slider= document.getElementById('slider' + rowId);
        slider.scrollLeft += 500;
    }

  return (
    <>
        <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
        <div className='relative flex items-center group'>
            <MdChevronLeft className='bg-white rounded-full absolute left-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' 
            size={40}
            onClick={slideLeft}
            />
            <div id={'slider' + rowId} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative' >
                {movies.map((movie, id)=>(
                    <Movie key={id} movie={movie}/>
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

export default Row
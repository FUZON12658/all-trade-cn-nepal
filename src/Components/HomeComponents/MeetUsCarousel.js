import React, { useEffect, useState } from 'react';
import abishekDai from '../../Images/facebook.png';
import whatsappDai from '../../Images/whatsapp.png'

export default function MeetUsCarousel() {

  useEffect(() => {
    const d = document;
    const $q = d.querySelectorAll.bind(d);
    const $g = d.querySelector.bind(d);
    const $prev = $g(".prev");
    const $next = $g(".next");
    const $continue = $g(".continue");
    const $list = $g(".carousel__list");
    let auto;
    let pauser;
    
    const getActiveIndex = () => {
        const $active = $g("[data-active]");
        return getSlideIndex($active);
    }
    
    const getSlideIndex = ($slide) => {
        return [...$q(".carousel__item")].indexOf( $slide );
    }
    
    const prevSlide = () => {
        const index = getActiveIndex();
        const $slides = $q(".carousel__item");
        const $last = $slides[$slides.length-1];
        $last.remove();
        $list.insertBefore($last, $slides[0]);
        activateSlide( $q(".carousel__item")[index] );
    }
    const nextSlide = () => {
        const index = getActiveIndex();
        const $slides = $q(".carousel__item");
        const $first = $slides[0];
        $first.remove();
        $list.appendChild($first);
        activateSlide( $q(".carousel__item")[index] );
    }
    
    const chooseSlide = (e) => {
        const max = (window.matchMedia("screen and ( max-width: 600px)").matches) ? 5 : 8;
        const $slide = e.target.closest( ".carousel__item" );
        activateSlide($slide);
    }
    
    const activateSlide = ($slide) => {
        if (!$slide) return;
        const $slides = $q(".carousel__item");
        $slides.forEach(el => el.removeAttribute('data-active'));
        $slide.setAttribute( 'data-active', true );
    }
    
    const autoSlide = () => {
        nextSlide();
    }
    const pauseAuto = () => {
        clearInterval( auto );
        clearTimeout( pauser );
    }
    
    const handleNextClick = (e) => {
        pauseAuto();
        nextSlide(e);
    }

    const handleContinueClick = (e) => {
        pauseAuto();
        startAuto();
    }
    
    const handlePrevClick = (e) => {
        pauseAuto();
        prevSlide(e);
    }
    
    const handleSlideClick = (e) => {
        pauseAuto();
        chooseSlide(e);
        startAuto();
    }
    
    const handleSlideKey = (e) => {
        switch(e.keyCode) {
            case 37:
            case 65:
                handlePrevClick();
                break;
            case 39:
            case 68:
                handleNextClick();
                break;
        }
    }
    const startAuto = () => {
      auto = setInterval(autoSlide, 3000);
    }

    startAuto(); 
    
    $next.addEventListener( "click", handleNextClick );
    $prev.addEventListener( "click", handlePrevClick );
    $list.addEventListener( "click", handleSlideClick );
    $list.addEventListener( "focusin", handleSlideClick );
    $list.addEventListener( "keyup", handleSlideKey );
    $continue.addEventListener("click",handleContinueClick);

    return()=> pauseAuto();
    
  },[]); // empty dependency array to ensure useEffect runs only once

  return (
    <section className="meet_us">
      <div className="top">
        <h1>Meet Us</h1>
      </div>
      <div className="meet_us_container">
        <section className="carousel">
          <ul className="carousel__list">
            <li className="carousel__item" tabIndex="0">
              <div className="carousel__box">
                <div className="carousel__image">
                  <img src={abishekDai} alt="Abhishek" width="480" height="720" />
                </div>
                <div className="carousel__contents">
                  <h2 className="user__name">Abhishek Khatiwada</h2>
                  <h3 className="user__title">Chief Executive Officer</h3>
                </div>
              </div>
            </li>
            <li className="carousel__item" tabIndex="0">
              <div className="carousel__box">
                <div className="carousel__image">
                  <img src={abishekDai} alt="Abhishek" width="480" height="720" />
                </div>
                <div className="carousel__contents">
                  <h2 className="user__name">Gulati Sheikh</h2>
                  <h3 className="user__title">Head Of Department</h3>
                </div>
              </div>
            </li>
            <li className="carousel__item" tabIndex="0">
              <div className="carousel__box">
                <div className="carousel__image">
                  <img src={abishekDai} alt="Abhishek" width="480" height="720" />
                </div>
                <div className="carousel__contents">
                  <h2 className="user__name">Bijul Shrestha</h2>
                  <h3 className="user__title">Remanager</h3>
                </div>
              </div>
            </li>
            <li className="carousel__item active" tabIndex="0">
              <div className="carousel__box">
                <div className="carousel__image">
                  <img src={abishekDai} alt="Abhishek" width="480" height="720" />
                </div>
                <div className="carousel__contents">
                  <h2 className="user__name">Rizul Poudel</h2>
                  <h3 className="user__title">Manager</h3>
                </div>
              </div>
            </li>
            <li className="carousel__item" tabIndex="0" data-active="data-active">
              <div className="carousel__box">
                <div className="carousel__image">
                  <img src={abishekDai} alt="Abhishek" width="480" height="720" />
                </div>
                <div className="carousel__contents">
                  <h2 className="user__name">Rizwan Sheikh</h2>
                  <h3 className="user__title">Chieftain</h3>
                </div>
              </div>
            </li>
            <li className="carousel__item" tabIndex="0">
              <div className="carousel__box">
                <div className="carousel__image">
                  <img src={whatsappDai} alt="Abhishek" width="480" height="720" />
                </div>
                <div className="carousel__contents">
                  <h2 className="user__name">Shyam Murthy</h2>
                  <h3 className="user__title">Pimpu Darling</h3>
                </div>
              </div>
            </li>
            <li className="carousel__item" tabIndex="0">
              <div className="carousel__box">
                <div className="carousel__image">
                  <img src={abishekDai} alt="Abhishek" width="480" height="720" />
                </div>
                <div className="carousel__contents">
                  <h2 className="user__name">Rizwan Pandey</h2>
                  <h3 className="user__title">Digital Manager</h3>
                </div>
              </div>
            </li>
            <li className="carousel__item" tabIndex="0">
              <div className="carousel__box">
                <div className="carousel__image">
                  <img src={abishekDai} alt="Abhishek" width="480" height="720" />
                </div>
                <div className="carousel__contents">
                  <h2 className="user__name">Bijul Shrestha</h2>
                  <h3 className="user__title">Remanager</h3>
                </div>
              </div>
            </li>
            <li className="carousel__item active" tabIndex="0">
              <div className="carousel__box">
                <div className="carousel__image">
                  <img src={abishekDai} alt="Abhishek" width="480" height="720" />
                </div>
                <div className="carousel__contents">
                  <h2 className="user__name">Rizul Poudel</h2>
                  <h3 className="user__title">Manager</h3>
                </div>
              </div>
            </li>
            <li className="carousel__item" tabIndex="0">
              <div className="carousel__box">
                <div className="carousel__image">
                  <img src={abishekDai} alt="Abhishek" width="480" height="720" />
                </div>
                <div className="carousel__contents">
                  <h2 className="user__name">Rizwan Sheikh</h2>
                  <h3 className="user__title">Chieftain</h3>
                </div>
              </div>
            </li>
            <li className="carousel__item" tabIndex="0">
              <div className="carousel__box">
                <div className="carousel__image">
                  <img src={abishekDai} alt="Abhishek" width="480" height="720" />
                </div>
                <div className="carousel__contents">
                  <h2 className="user__name">Shyam Murthy</h2>
                  <h3 className="user__title">Pimpu Darling</h3>
                </div>
              </div>
            </li>
            <li className="carousel__item" tabIndex="0">
              <div className="carousel__box">
                <div className="carousel__image">
                  <img src={abishekDai} alt="Abhishek" width="480" height="720" />
                </div>
                <div className="carousel__contents">
                  <h2 className="user__name">Rizwan Pandey</h2>
                  <h3 className="user__title">Digital Manager</h3>
                </div>
              </div>
            </li>
          </ul>
          <div className ="carousel__nav"><div className ="prev"><button className='carouselNav'>Previous</button>
                                    </div><div className ="continue"><button className='carouselNav'>Continue</button></div><div className ="next"><button className='carouselNav'>Next</button></div></div>
        </section>
      </div>
    </section>
  );
}

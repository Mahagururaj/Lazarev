function locomotiveAnime(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function navAnime() {
    var nav = document.querySelector("nav");
    nav.addEventListener("mouseenter", function () {
        let tl = gsap.timeline()

        tl.to(".nav-bottom", {
            height: "22.5vh",
            duration: 0.2,

        })
        tl.to(".nav-part h5", {
            display: "block",

        })
        tl.to(".nav-part h5 span", {
            y: 0,
            duration: 0.2,
            stagger: {
                amount: 0.7,
            },
        })
    })
    nav.addEventListener("mouseleave", function () {
        let tl = gsap.timeline();

        tl.to(".nav-part h5 span", {
            y: 25,
            duration: 0.2,
            stagger: {
                amount: 0.2,
            },
        })
        tl.to(".nav-part h5", {
            display: "none",
            duration: 0.1,
        })

        tl.to(".nav-bottom", {
            height: 0,
            duration: 0.1
        })


    })
}

function page2Anime() {

    var relems = document.querySelectorAll(".right-elem");
    relems.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            gsap.to(elem.childNodes[3], {
                opacity: 1,
                scale: 1
            })

        })
        elem.addEventListener("mouseleave", function () {
            gsap.to(elem.childNodes[3], {
                opacity: 0,
                scale: 0
            })

        })
        elem.addEventListener("mousemove", function (dets) {

            gsap.to(elem.childNodes[3], {
                x: dets.x - elem.getBoundingClientRect().x - 90,
                y: dets.y - elem.getBoundingClientRect().y - 185
            })
        })

    })
}

 function page3Anime() {
    var play = document.querySelector(".page3 svg");
    var video = document.querySelector(".page3 video");
    play.addEventListener("mouseenter", function () {
        gsap.to(".page3 h5", {
            y:20,
            opacity:1
        })
    })
    play.addEventListener("mouseleave", function () {
        gsap.to(".page3 h5", {
            opacity:0
        })
    })
    play.addEventListener("click", function(){
        video.play(),
        gsap.to(video, {
            transform:"scaleX(1) scaleY(1)",
            opacity:1,
            borderRadius:0
        })
    })
    video.addEventListener("click", function(){
        video.pause(),
        gsap.to(video, {
            transform:"scaleX(0.7) scaleY(0)",
            opacity:0,
            borderRadius:0
        })
    })
}


function page5Anime() {
    var page5Cont = document.querySelectorAll(".page5-right");

page5Cont.forEach(function(elem){
   elem.addEventListener("mouseenter", function(){
    elem.childNodes[3].style.opacity = 1;
    elem.childNodes[3].play()
   })
   elem.addEventListener("mouseleave", function(){
    elem.childNodes[3].style.opacity = 0;
    elem.childNodes[3].load()
   })
})
}

function page6Animations() {
    gsap.from(".btm6-parts h4", {
        x: 25,
        duration: 1,
        scrollTrigger: {
            trigger: "#page8-bottom",
            scroller: ".main",
            // markers:true,
            start: "top 80%",
            end: "top 10%",
            scrub: true
        }
    })
}
function loadingAnimation() {

    var tl = gsap.timeline()
    tl.from(".page1", {
        opacity: 0,
        duration: 0.2,
        delay: 0.2
    })
    tl.from(".page1", {
        transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
        borderRadius: "150px",
        duration: 2,
        ease: "expo.out"
    })
    tl.from("nav", {
        opacity: 0,
        delay: -0.2
    })
    tl.from(".page1 h1, .page1 p, .page1 div", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
    })
}



locomotiveAnime()
loadingAnimation()
navAnime()
page2Anime()
page3Anime()
page5Anime()
page6Animations()



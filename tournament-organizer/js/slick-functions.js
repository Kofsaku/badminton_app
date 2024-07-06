 $('.custom-slider1').slick({
         dots: true,
         infinite: true,
         speed: 300,
         slidesToShow: 3,
         slidesToScroll: 1,
         arrows: true,
         autoplay: true,
         focusOnSelect: false,
         pauseOnHover:false,
         autoplaySpeed: 2000,
         responsive: [
           {
             breakpoint: 1024,
             settings: {
               slidesToShow: 3,
               slidesToScroll: 1,
               infinite: true,
               dots: true
             }
           },
         
           {
             breakpoint: 768,
             settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               infinite: true,
               dots: true
             }
           },
         
           {
             breakpoint: 700,
             settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               infinite: true,
               dots: true
             }
           },
         
           {
             breakpoint: 600,
             settings: {
               slidesToShow: 1,
               slidesToScroll: 1
             }
           },
           {
             breakpoint: 480,
             settings: {
               slidesToShow: 1,
               slidesToScroll: 1
             }
           }
           // You can unslick at a given breakpoint now by adding:
           // settings: "unslick"
           // instead of a settings object
         ]
         });
         




          $('.custom-slider2').slick({
         dots: true,
         infinite: true,
         speed: 3000,
         slidesToShow: 4,
         slidesToScroll: 1,
         centerMode: true,
         arrows: true,
         autoplay: true,
         focusOnSelect: false,
         pauseOnHover:false,
         autoplaySpeed: 2000,
         responsive: [
           {
             breakpoint: 1024,
             settings: {
               slidesToShow: 3,
               slidesToScroll: 1,
               infinite: true,
               dots: true
             }
           },
         
           {
             breakpoint: 768,
             settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               infinite: true,
               dots: true
             }
           },
         
           {
             breakpoint: 700,
             settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               infinite: true,
               dots: true
             }
           },
         
           {
             breakpoint: 600,
             settings: {
               slidesToShow: 1,
               slidesToScroll: 1
             }
           },
           {
             breakpoint: 480,
             settings: {
               slidesToShow: 1,
               slidesToScroll: 1
             }
           }
           // You can unslick at a given breakpoint now by adding:
           // settings: "unslick"
           // instead of a settings object
         ]
         });
         
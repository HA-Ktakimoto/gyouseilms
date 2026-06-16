$(function () {
    for (let i = 0; i < 10; i++) {
        $("#statusProgress" + i).on("click", function () {
            for (let j = 0; j < 10; j++) {
                $("#statusProgress" + j).removeClass("active");
                $("#statusProgress" + j + "-sub").removeClass("active");
            }
            $("#statusProgress" + i).addClass("active");
            $("#statusProgress" + i + "-sub").addClass("active");
        });
    }
});

var AAA = 0;
$(function () {
    if (++AAA % 2 == 0) return;
    $(".subject__inner").on("click", function () {
        $(this).nextAll(".curriculum").slideToggle();
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
        } else {
            $(this).addClass("open");
        }
    });
});

$(function () {
    $(".curriculum__inner").on("click", function () {
        $(this).nextAll(".chapter").slideToggle();

        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
        } else {
            $(this).addClass("open");
        }
    });
});

$(function () {
    $(".js-accordion-trigger").on("click", function () {
        $(this).nextAll(".chapter__inner").slideToggle();

        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
        } else {
            $(this).addClass("open");
        }
    });
});

$(document).ready(function () {
    $(function () {
        var s, t, e, a;
        $(".js-topMainVisual").length &&
            (new Swiper(".js-topMainVisual-swiper", {
                autoplay: {
                    delay: 5e3,
                },
                loop: !0,
                simulateTouch: !1,
                freeMode: !0,
                breakpoints: {
                    1366: {
                        slidesPerView: "auto",
                        centeredSlides: !0,
                        freeMode: !0,
                    },
                },
                pagination: {
                    el: ".p-top-mainVisual__pagination",
                    type: "bullets",
                    clickable: !0,
                },
                navigation: {
                    nextEl: ".p-top-mainVisual__next",
                    prevEl: ".p-top-mainVisual__prev",
                },
            }),
            (t = !1),
            $(".js-topMainVisual-btn").on("click", function () {
                var e = $(".js-topMainVisual-btn-img");
                $(".p-top-mainVisual__container").toggleClass("is-close"),
                    e.toggleClass("is-show"),
                    e.hasClass("is-show")
                        ? e.attr(
                              "src",
                              "/assets/img/common/ico-arrow-black-up.svg"
                          )
                        : e.attr(
                              "src",
                              "/assets/img/common/ico-arrow-black-bottom.svg"
                          ),
                    (t =
                        !1 === t
                            ? ((s = $(".js-topMainVisual-swiper").height()),
                              $(".p-top-mainVisual .swiper-wrapper").animate({
                                  height: "29px",
                              }),
                              !0)
                            : ($(".p-top-mainVisual .swiper-wrapper").animate({
                                  height: s,
                              }),
                              $(window).one("resize", function () {
                                  $(".p-top-mainVisual .swiper-wrapper").css(
                                      "height",
                                      "auto"
                                  );
                              }),
                              !1));
            }));
    });
});

$(document).ready(function () {
    $(function () {
        var s, t;
        $(".js-ha-progress").length &&
            ((s = $(".js-ha-progress-swiper").children(
                ".js-ha-swiper-wrapper"
            )),
            (t = $(".js-ha-progress-swiper").find(".js-ha-swiper-slide")),
            App.func.onResponsive(function (e) {
                e ||
                    ($(".js-ha-progress-swiper").addClass("swiper"),
                    s.addClass("swiper-wrapper"),
                    t.addClass("swiper-slide"),
                    new Swiper(".js-ha-progress-swiper", {
                        spaceBetween: 18,
                        watchOverflow: !0,
                        navigation: {
                            nextEl: ".ha-top-studyProgress__next",
                            prevEl: ".ha-top-studyProgress__prev",
                        },
                    }));
            }));
    }),
        $(function () {
            $(".js-top-progress-left").length &&
                new Swiper(".js-top-progress-left", {
                    slidesPerView: "auto",
                    spaceBetween: 20,
                    simulateTouch: !1,
                    freeMode: !0,
                    initialSlide: 3,
                    breakpoints: {
                        896: {
                            freeMode: !1,
                            spaceBetween: 20,
                        },
                    },
                    navigation: {
                        nextEl: ".p-top-progress-left__next",
                        prevEl: ".p-top-progress-left__prev",
                    },
                }),
                $(".js-top-progress-right").length &&
                    new Swiper(".js-top-progress-right", {
                        slidesPerView: "auto",
                        spaceBetween: 20,
                        simulateTouch: !1,
                        freeMode: !0,
                        initialSlide: 3,
                        breakpoints: {
                            896: {
                                freeMode: !1,
                                spaceBetween: 20,
                            },
                        },
                        navigation: {
                            nextEl: ".p-top-progress-right__next",
                            prevEl: ".p-top-progress-right__prev",
                        }
                    });
        });
});

Array.prototype.insert = function(index, item) {
    this.splice(index, 0, item);
};


    //モーダルウィンドウを出現させるクリックイベント
    function password_reset_btn() {

        //キーボード操作などにより、オーバーレイが多重起動するのを防止する
        $( this ).blur() ;  //ボタンからフォーカスを外す
        if( $( "#modal-overlay" )[0] ) return false ;       //新しくモーダルウィンドウを起動しない (防止策1)
        //if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;     //現在のモーダルウィンドウを削除して新しく起動する (防止策2)

        //オーバーレイを出現させる
        $( "body" ).append( '<div id="modal-overlay"></div>' ) ;
        $( "#modal-overlay" ).fadeIn( "slow" ) ;

        //コンテンツをセンタリングする
        centeringModalSyncer() ;

        //コンテンツをフェードインする
        $( "#modal-content-pwd" ).fadeIn( "slow" ) ;

        //[#modal-overlay]、または[#modal-close]をクリックしたら…
        $( "#modal-overlay,.modal-close" ).unbind().click( function(){
            //[#modal-content-pwd]と[#modal-overlay]をフェードアウトした後に…
            $( "#modal-content-pwd,#modal-overlay" ).fadeOut( "slow" , function(){

                //[#modal-overlay]を削除する
                $('#modal-overlay').remove() ;

            });

            $('#validation_message').children().remove();
            $('#password').val('');
            $('#confirm_pwd').val('');
        });
    }

    //リサイズされたら、センタリングをする関数[centeringModalSyncer()]を実行する
    $( window ).resize( centeringModalSyncer ) ;

    //センタリングを実行する関数
    function centeringModalSyncer() {

        //画面(ウィンドウ)の幅、高さを取得
        var w = $( window ).width() ;
        var h = $( window ).height() ;

        // コンテンツ(#modal-content-pwd)の幅、高さを取得
        var cw = $( "#modal-content-pwd" ).outerWidth();
        var ch = $( "#modal-content-pwd" ).outerHeight();

        //センタリングを実行する
        $( "#modal-content-pwd" ).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;
    }

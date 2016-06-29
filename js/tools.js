(function($) {

    $(document).ready(function() {

        $.extend($.validator.messages, {
            required: 'Поле не заполнено',
            email: 'Введен некорректный e-mail',
            equalTo: "Введите такое же значение",
        });

        $('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});

        $('.form-checkbox span input:checked').parent().addClass('checked');
        $('.form-checkbox span').click(function() {
            $(this).toggleClass('checked');
            $(this).find('input').prop('checked', $(this).hasClass('checked')).trigger('change');
        });

        $('.form-radio span input:checked').parent().parent().addClass('checked');
        $('.form-radio').click(function() {
            var curName = $(this).find('input').attr('name');
            $('.form-radio input[name="' + curName + '"]').parent().parent().removeClass('checked');
            $(this).addClass('checked');
            $(this).find('input').prop('checked', true).trigger('change');
        });

        $('input[type="number"]').each(function() {
            var curBlock = $(this).parent();
            var curHTML = curBlock.html();
            curBlock.html(curHTML.replace(/type=\"number\"/g, 'type="text"'));
            curBlock.find('input').spinner();
            curBlock.find('input').keypress(function(evt) {
                var charCode = (evt.which) ? evt.which : event.keyCode
                if (charCode > 31 && (charCode < 43 || charCode > 57)) {
                    return false;
                }
                return true;
            });
        });

        $('.form-date input').datepicker();

        $('form').each(function() {
            $(this).validate({
                ignore: '',
                invalidHandler: function(form, validatorcalc) {
                    validatorcalc.showErrors();

                    $('.form-checkbox').each(function() {
                        var curField = $(this);
                        if (curField.find('input.error').length > 0) {
                            curField.addClass('error');
                        } else {
                            curField.removeClass('error');
                        }
                    });
                }
            });
        });

        $('.order-success-info-link a').click(function(e) {
            $.ajax({
                type: 'POST',
                url: $(this).attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                if ($('.window').length > 0) {
                    windowClose();
                }
                windowOpen(html);
            });
            e.preventDefault();
        });

    });

    function windowOpen(contentWindow) {
        var windowWidth     = $(window).width();
        var windowHeight    = $(window).height();
        var curScrollTop    = $(window).scrollTop();
        var curScrollLeft   = $(window).scrollLeft();

        var bodyWidth = $('body').width();
        $('body').css({'height': windowHeight, 'overflow': 'hidden'});
        var scrollWidth =  $('body').width() - bodyWidth;
        $('body').css({'padding-right': scrollWidth + 'px'});
        $(window).scrollTop(0);
        $(window).scrollLeft(0);
        $('body').css({'margin-top': -curScrollTop});
        $('body').data('scrollTop', curScrollTop);
        $('body').css({'margin-left': -curScrollLeft});
        $('body').data('scrollLeft', curScrollLeft);

        $('body').append('<div class="window"><div class="window-overlay"></div><div class="window-container"><div class="window-content">' + contentWindow + '<a href="#" class="window-close">Закрыть</a></div></div></div>')

        windowPosition();

        $('.window-overlay').click(function() {
            windowClose();
        });

        $('.window-close').click(function(e) {
            windowClose();
            e.preventDefault();
        });

        $('body').bind('keyup', keyUpBody);

    }

    function windowPosition() {
        var windowWidth     = $(window).width();
        var windowHeight    = $(window).height();

        if ($('.window-container').width() > windowWidth - 40) {
            $('.window-container').css({'left': 20, 'margin-left': 0});
            $('.window-overlay').width($('.window-container').width() + 40);
        } else {
            $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});
            $('.window-overlay').width('100%');
        }

        if ($('.window-container').height() > windowHeight - 40) {
            $('.window-overlay').height($('.window-container').height() + 40);
            $('.window-container').css({'top': 20, 'margin-top': 0});
        } else {
            $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2});
            $('.window-overlay').height('100%');
        }
    }

    function keyUpBody(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    }

    function windowClose() {
        $('body').unbind('keyup', keyUpBody);
        $('.window').remove();
        $('body').css({'height': '100%', 'overflow': 'visible', 'padding-right': 0, 'margin': 0});
        $(window).scrollTop($('body').data('scrollTop'));
        $(window).scrollLeft($('body').data('scrollLeft'));
    }

    $(window).resize(function() {
        if ($('.window').length > 0) {
            var windowWidth     = $(window).width();
            var windowHeight    = $(window).height();
            var curScrollTop    = $(window).scrollTop();
            var curScrollLeft   = $(window).scrollLeft();

            $('body').css({'height': '100%', 'overflow': 'visible', 'padding-right': 0, 'margin': 0});
            var bodyWidth = $('body').width();
            $('body').css({'height': windowHeight, 'overflow': 'hidden'});
            var scrollWidth =  $('body').width() - bodyWidth;
            $('body').css({'padding-right': scrollWidth + 'px'});
            $(window).scrollTop(0);
            $(window).scrollLeft(0);
            $('body').data('scrollTop', 0);
            $('body').data('scrollLeft', 0);

            windowPosition();
        }
    });

})(jQuery);
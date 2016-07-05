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

        $('.order-success-info-link a, .order-detail-paid-links a, .order-detail-operator-links a').click(function(e) {
            var windowId = $(this).attr('href');
            windowOpen($(windowId));
            e.preventDefault();
        });

        $('.window-cashback-rules-inner').jScrollPane();

        $('.window-overlay').click(function() {
            windowClose();
        });

        $('.window-close, .window-cashback-close a, .tariff-submits .btn').click(function(e) {
            windowClose();
            e.preventDefault();
        });

        $('body').bind('keyup', keyUpBody);

        $('.filter-toggle a').click(function(e) {
            $('#f1, #f2').toggleClass('filter-closed');
            var curText = $(this).html();
            $(this).html($(this).data('text'));
            $(this).data('text', curText);
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

        contentWindow.addClass('visible');

        windowPosition();
    }

    function windowPosition() {
        var windowWidth     = $(window).width();
        var windowHeight    = $(window).height();

        if ($('.visible .window-container').width() > windowWidth - 100) {
            $('.visible .window-container').css({'left': 50, 'margin-left': 0});
            $('.visible .window-overlay').width($('.visible .window-container').width() + 100);
        } else {
            $('.visible .window-container').css({'left': '50%', 'margin-left': -$('.visible .window-container').width() / 2});
            $('.visible .window-overlay').width('100%');
        }

        if ($('.visible .window-container').height() > windowHeight - 100) {
            $('.visible .window-overlay').height($('.visible .window-container').height() + 100);
            $('.visible .window-container').css({'top': 50, 'margin-top': 0});
        } else {
            $('.visible .window-container').css({'top': '50%', 'margin-top': -$('.visible .window-container').height() / 2});
            $('.visible .window-overlay').height('100%');
        }
    }

    function keyUpBody(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    }

    function windowClose() {
        $('.window').removeClass('visible');
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
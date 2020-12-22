// Видео youtube для страницы
// В html выглядит так
// <div class="video__wrapper js_youtube" id="Y2uDpiHRz2Q">
// 	<img src="img/путь_к_фоновому изображению" alt="" class="video__prev">
// </div>


console.log('script is run');
$(function () {

    // Проверяем наличие элемента с классом js_youtube
    if ($(".js_youtube")) {
    	// Перебираем все элементы js_youtube
        $(".js_youtube").each(function () {
            // Зная идентификатор видео на YouTube, легко можно найти его миниатюру и вывести фоном
            // $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');
            // $(this).css('background-image', 'img/prev_video.jpg');

            // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
            $(this).append($('<img src="img/play.svg" alt="Play" class="video__play">'));

        });

        // При клике на картинку-превьюшку или кнопку play
        $('.video__play, .video__prev').on('click', function () {
        	// Получаем ID youtube видео
            var videoId = $(this).closest('.js_youtube').attr('id');
            // создаем iframe со включенной опцией autoplay
            var iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";
            // Можно завести data-атрибуты для доп параметров. не обязательно.
            if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

            // Высота и ширина iframe должны быть такими же, как и у родительского блока
            var iframe = $('<iframe/>', {
                'frameborder': '0',
                'src': iframe_url,
                'allow': 'autoplay'
            });

            // Выводим HTML5 плеер с YouTube поверх превьюшек
            $(this).closest('.video__wrapper').append(iframe);

        });
    }

});

// отправка и проверка формы + модальное окно
function submitForm() {

    let modal = $('#info'),
        message = modal.find('.form__message');

    modal.on('hidden.bs.modal', function (e) {
        message.html('');
    });

    $('[type=submit]').on('click', function(e) {
        // Отменяем стандартное действие.
        // В данном случае отправку формы после нажатия унопки с type=submit
        e.preventDefault();
        // Можно отменить работу отельных библиотек и скриптов.
        // e.stopPropagination();
        console.log('push');


        // Можно почитать что входит в стандартный аргумент event срабатывающий при событии
        // console.log(e);

        // Объявляем набор переменных для того чтобы с крипт работал исключительно с формой к которому относится кнопка
        let form = $(this).closest('form'),
            // Ищем обязательные поля
            fields = form.find('[required]'),
            // Записываем значение атрибута формы action
            url = form.attr('action'),
            // Хаписываем значения полей форм. Обязателен атрибут name у полей с уникальным значением
            formData = form.serialize(),
            // Создаем переменную для счетчика пустых полей
            empty = 0;
        // console.log(fields);
        console.log(form);


        // console.log(url);
        console.log(formData);

        // Перебираем обязательные поля формы
        fields.each(function(index, el) {
            // Проверяем пустое ли поле
            // console.log("ioi");
            // console.log($(this).val());
            if ($(this).val() === '') {
                // Увеличиваем счетчик полей на 1
                empty++;
            }

            // Универсальная функция для проверки и визуализации пустых полей
            checkFiels($(this));
        });

        console.log(empty);

        if (empty > 0) {
            // hideLoader($('.eightSection'));
            // Если пустых полей больше 1, останавливаем работу скрипта
            return false;
        } else {
            showLoader($('.eightSection'));
            // Если пустых полей нет, отправляем форму
            // Либо стандартым методом с перезагрузкой страницы
            // form.submit();
            // Либо через аякс, без перезагрузки страницы
            $.ajax({
                // Ссылка на обработчик файла
                url: url,
                // Тип метода отправки
                type: "POST",
                // Тип данных
                dataType: "html",
                // Данные из формы
                data: formData,
                // Если все хорошо, то
                success: function (response) {
                    console.log('success');

                    // Пример с открытием окна
                    modal.modal('show');

                    // Пример с перенаправлением на другую страницу
                    // document.location.href = "js.html";

                    // Пример вывода текста в какой то блок
                    message.html('Ваша форма успешно отправлена. <br> Мы свяжемся с вами в ближайшее время.');
                    hideLoader($('.eightSection'));
                    // Дополнительно можно удалить текст из блока спустя какое то время
                    // setTimeout(function () {
                        //     message.html('');
                        // }, 5000);

                },

                // Тут можно выполнить действия если произошла ошибка отправки
                error: function (response) {
                    console.log('error');

                    // message.text('Произошла ошибка при отправке. <br> Попробуйте отправить форму позже.');
                    modal.modal('show');

                    message.html('Произошла ошибка при отправке. <br> Попробуйте отправить форму позже.');
                    hideLoader($('.eightSection'));
                    // setTimeout(function () {
                        //     message.html('');
                        // }, 5000);

                }
            });
        }

    });

    // Проверка заполненности полей на лету
    $('input').on('keyup', function() {
        checkFiels($(this));
    });


    function checkFiels(el) {
        // При разных условиях меняем классы и внешний вид полей
        if (el.val() === '') {
            el.addClass('invalid');
            el.removeClass('valid');
        } else {
            el.removeClass('invalid');
            el.addClass('valid');
        }
    }
}

submitForm();

// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
$('a[href^="#"]').click( function(e){
    e.preventDefault();
    console.log("work");
	var scroll_el = $(this).attr('href');
	if ($(scroll_el).length != 0) {
	$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
	}
	return false;
});

replaceElement($('.firstScreen__left').children('img'),$('.firstScreen__left'),$('.firstScreen__title'),768);
// Показать лоадер при загрузке товаров
function showLoader(el) {
    // el.addClass('loaded');
    // el.append('<div class="loader" />');
    // console.log('show is run');
    el.addClass('loadingio-spinner-blocks-a76og8p27y7');
    el.append(`<div class="ldio-pef4zo238oc">
        <div style='left:38px;top:38px;animation-delay:0s'></div>
        <div style='left:80px;top:38px;animation-delay:0.125s'></div>
        <div style='left:122px;top:38px;animation-delay:0.25s'></div>
        <div style='left:38px;top:80px;animation-delay:0.875s'></div>
        <div style='left:122px;top:80px;animation-delay:0.375s'></div>
        <div style='left:38px;top:122px;animation-delay:0.75s'></div>
        <div style='left:80px;top:122px;animation-delay:0.625s'></div>
        <div style='left:122px;top:122px;animation-delay:0.5s'></div>
    </div>`);
}

// Скрыть лоадер при загрузке товаров
function hideLoader(el, time = 10) {
    console.log('hide is run');
    setTimeout(function () {
        el.removeClass('loadingio-spinner-blocks-a76og8p27y7');
        $('.ldio-pef4zo238oc').remove();
    }, time);
}

function replaceElement(element, placeForDesctop, placeForMobile, width){

      let resized = false;

      let el = element, pd= placeForDesctop, pm = placeForMobile;
      $(window).resize(function(event) {
          let currentWidth = $(window).width()+scrollbarWidth();

          // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
          if (resized == currentWidth) { return; }
          resized = currentWidth;
          // console.log();

          if (currentWidth < width) {
              console.log("isMobile");
              pm.after(el);
          } else {
              console.log('isDesctop');
              pd.append(el);
          }

      });

}
function scrollbarWidth() {
    var block = $('<div>').css({'height':'50px','width':'50px'}),
        indicator = $('<div>').css({'height':'200px'});

    $('body').append(block.append(indicator));
    var w1 = $('div', block).innerWidth();
    block.css('overflow-y', 'scroll');
    var w2 = $('div', block).innerWidth();
    $(block).remove();
    return (w1 - w2);
}

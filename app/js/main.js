////////// Responsive
// Breackpoints
let	xl 	=  '(max-width: 1199px)',
		lg 	=  '(max-width: 991px)',
		md 	=  '(max-width: 767px)',
		sm 	=  '(max-width: 575px)',
		xsm	=  '(max-width: 374px)',
		MQ  =  $.mq.action;

// MediaQueries
// XSM
MQ(xl, function () {
	$('.advantages__bottom-content').append($('.warning-text--blue'));
}, function () {
	$('.advantages__col--right').append($('.warning-text--blue'));
});

// LG
MQ(lg, function () {
	$('.discount__col--left').append($('.discount__link'));
	collapse('.asking-content--main');
	$('.mobile-menu__row--center').append($('.header__nav'));
	$('.mobile-menu__row--center').append($('.header__user-panel-btn'));
	$('.mobile-menu__row--bottom').prepend($('.header__support-wrap'));
	$('.articles-single__bottom-line').append($('.editor'));
	$('.tab-content--car-checker .tab-content__wrap').after($('.sources'));
	// не меняйте место вызова функции (tableMenuMobileSmothScroll)
	// do not change the function call location (tableMenuMobileSmothScroll)
	tableMenuMobileSmothScroll();
	fineTableContentMove();
	carsGalleryMobileSlider();
	simpleListResponsive();
	fineNavMobileCollapse()
}, function () {
	$('.discount__wrap').append($('.discount__link'));
	$('.asking-nav').removeClass('asking-nav--scrolled')
	$('.header__bottom-line .header__container').append($('.header__nav'));
	$('.header__col:nth-child(4)').append($('.header__user-panel-btn'));
	$('.header__col:nth-child(3)').append($('.header__support-wrap'));
	$('.articles-single__top-line').append($('.editor'));
	$('.tab-content--car-checker .tab-content__form').append($('.sources'));
});

// MD
MQ(md, function () {
	$('.main__mobile-container').append($('.advantages-card'));
	$('.banner__btn').before($('.banner__desc'))
	$('.footer__col:nth-child(4)').prepend($('.footer-nav--right'))
	$('.footer__col:nth-child(4)').prepend($('.footer-nav--left'))
	$('.fines-cards').before($('.alert'))
	$('.contacts__mobile-feedback-board').append($('.feedback-board'))
}, function () {
	$('.check-main__alert-wrap').append($('.alert'))
	$('.main__col:last-child').append($('.advantages-card'));
	$('.banner__title-wrap').append($('.banner__desc'))
	$('.footer__col:nth-child(2)').append($('.footer-nav--left'))
	$('.footer__col:nth-child(3)').append($('.footer-nav--right'))
	$('.contacts__small-col--right').append($('.feedback-board'))
});

// SM
MQ(sm, function () {
	$('.author').append($('.author__small-title'));
	$('.news__container').append($('.news__link'));
	$('.info-text').removeClass('info-text--center');
	$('.penalty-table-main__center-line').prepend($('.penalty-table-main__small-title'));
}, function () {
	$('.author__right-content').append($('.author__small-title'));
	$('.news__title-wrap').append($('.news__link'));
	// $('.info-text').addClass('info-text--center');
	$('.penalty-table-main__bottom-line').prepend($('.penalty-table-main__small-title'));
});

function fineTableContentMove() {
	const links = $('.fine-nav__link');
	links.each(function (index, el) {
		const linksAttr = $(el).attr('href').replace('#', '');
		const tables = $(`.fine-table[data-id=${linksAttr}]`);
		
		$(el).siblings('.fine-nav__toggle-block')
			.append(tables)
			.find('.fine-table__content')
			.prepend(tables.find('.table-header__link'));
	})

	$('.fine-nav').append($('.fine-table--others'));
}

////////// Common functions

let validator;

jQuery.validator.setDefaults({
	rules:{
		name:{
			required: true,
			minlength: 3,
			cyrillic: true,
		},
		licensePlate :{
			required: true,
			// minlength: 11,
			licensePlate: true
		},
		licensePlateStart :{
			required: true,
			minlength: 6,
			licensePlateStart: true
		},
		licensePlateEnd :{
			required: true,
			minlength: 2,
			licensePlateEnd: true
		},
		certificate :{
			required: true,
			certificate: true,
			minlength: 12
		},
		receiptNumber :{
			required: true,
			receiptNumber: true
		},
		driverLicense :{
			required: true,
			driverLicense: true,
			minlength: 12
		},
		fullName :{
			required: true,
			fullName: true
		},
		email :{
			required: true,
			email: true
		},
		phone :{
			required: true,
			minlength: 18,
			phone: true
		},
		agreement :{
			required: true
		},
		confirmNumber :{
			required: true,
			confirmNumber: true
		},
		password :{
			required: true,
			minlength: 5,
		},
		vinNumber :{
			required: true,
			minlength: 17,
			vinNumber: true,
		},
		treatment :{
			required: true,
			minlength: 5,
		},
		carBody :{
			required: true,
			carBody: true,
		},
	},
	messages:{
		check: 'Обязательное поле',
		name: '',
		surname: '',
		phone: '',
		email: ''
	},
	errorPlacement: function(error, element) {
		
	},
	submitHandler: function(form) {
		// Write here your function Handler
		console.log('Submit');

		if ($(form).hasClass('tab-content__form')) {
			// checkFines();
		}
	}
});

// validator init
$('form').each( function() {
	validator = $(this).validate();
});

function addMethodValidator(methodName, regExp) {
	$.validator.addMethod(methodName, function(value, element) {
		return this.optional(element) || regExp.test(value);
	});
}
const inputsObj = {
	licensePlate: 'input[name="licensePlate"]',
	licensePlateStart: 'input[name="licensePlateStart"]',
	licensePlateEnd: 'input[name="licensePlateEnd"]',
	driverLicense: 'input[name="driverLicense"]',
	certificate: 'input[name="certificate"]',
	receiptNumber: 'input[name="receiptNumber"]',
	vinNumber: 'input[name="vinNumber"]',
	carBody: 'input[name="carBody"]',

}

const regexObject = {
	licensePlateCar: String.raw`[АВЕКМНОРСТУХавекмнорстух]{1} [0-9]{3} [АВЕКМНОРСТУХавекмнорстух]{2} [0-9]{2,3}`,
	licensePlateMotorcycle: String.raw`[0-9]{4} [АВЕКМНОРСТУХавекмнорстух]{2} [0-9]{2,3}`,
	licensePlateBus: String.raw`[АВЕКМНОРСТУХавекмнорстух]{2} [0-9]{3} [0-9]{2,3}`,
	licensePlateDefault: String.raw`[АВЕКМНОРСТУХавекмнорстух0-9]{2} [0-9]{3} [АВЕКМНОРСТУХавекмнорстух]{2} [0-9]{2,3}`,

	licensePlateStartCar: String.raw`[АВЕКМНОРСТУХавекмнорстух]{1} [0-9]{3} [АВЕКМНОРСТУХавекмнорстух]{2}`,
	licensePlateStartMotorcycle: String.raw`[0-9]{4} [АВЕКМНОРСТУХавекмнорстух]{2}`,
	licensePlateStartBus: String.raw`[АВЕКМНОРСТУХавекмнорстух]{2} [0-9]{3}`,
	licensePlateStartDefault: String.raw`[АВЕКМНОРСТУХавекмнорстух0-9]{2} [0-9]{3} [АВЕКМНОРСТУХавекмнорстух]{2}`,

	licensePlateEnd: String.raw`[0-9]{2,3}`,
	driverLicense: String.raw`[0-9]{2} [0-9а-яА-Я]{2} [0-9]{6}`,
	receiptNumber: String.raw`[0-9]{20}`,
	vinNumber: String.raw`[0-9a-zA-Z]{17}`,
	carBody: String.raw`[0-9a-zA-Z]{5}-[0-9]{7}`
}

function customMask(reg = regexObject.licensePlateCar, selector = inputsObj.licensePlate) {
	Inputmask({ regex: reg}).mask(selector);
}


function customInputMask(selector) {
	const licensePlate = $('input[name="licensePlate"]');
	const licensePlateStart = $('input[name="licensePlateStart"]');
	let isSelected = true;
	
	selector.on('input', function (e) {
		let value = e.target.value
		const car = value.match(/^[АВЕКМНОРСТУХавекмнорстух]{1}[0-9]{1}/);
		const motorcycle = value.match(/^[0-9]{1}/);
		const bus = value.match(/^[АВЕКМНОРСТУХавекмнорстух]{2}/);

		if ($(this).attr('name') === 'licensePlate') {

			if (car && isSelected) {
				licensePlate.inputmask('remove');
				customMask();
				isSelected = false;
			}
			if(motorcycle  && isSelected){
				licensePlate.inputmask('remove');
				customMask(regexObject.licensePlateMotorcycle)
				isSelected = false;
			}
			if(bus  && isSelected){
				licensePlate.inputmask('remove');
				customMask(regexObject.licensePlateBus)
				isSelected = false;
			}
			if(value === '' && !isSelected){
				licensePlate.inputmask('remove');
				customMask(regexObject.licensePlateDefault)
				isSelected = true;
			}
		}
		
		if ($(this).attr('name') === 'licensePlateStart') {
			if (car  && isSelected) {
				licensePlateStart.inputmask('remove');
				customMask(regexObject.licensePlateStartCar, inputsObj.licensePlateStart);
				isSelected = false;
			}
			if(motorcycle  && isSelected){
				licensePlateStart.inputmask('remove');
				customMask(regexObject.licensePlateStartMotorcycle, inputsObj.licensePlateStart);
				isSelected = false;
			}
			if(bus  && isSelected){
				licensePlateStart.inputmask('remove');
				customMask(regexObject.licensePlateStartBus, inputsObj.licensePlateStart);
				isSelected = false;
			}
			if(value === '' && isSelected){
				licensePlateStart.inputmask('remove');
				customMask(regexObject.licensePlateStartDefault, inputsObj.licensePlateStart);
				isSelected = true;
			}
		}

	})
}

// add method only licensePlate
addMethodValidator('licensePlate', /^[0-9]{4} [АВЕКМНОРСТУХавекмнорстух]{2} [0-9]{2,3}|[АВЕКМНОРСТУХавекмнорстух]{1} [0-9]{3} [АВЕКМНОРСТУХавекмнорстух]{2} [0-9]{2,3}|[АВЕКМНОРСТУХавекмнорстух]{2} [0-9]{3} [0-9]{2,3}\s?$/)

// add method only licensePlateStart
addMethodValidator('licensePlateStart', /^[0-9]{4} [АВЕКМНОРСТУХавекмнорстух]{2}|[АВЕКМНОРСТУХавекмнорстух]{1} [0-9]{3} [АВЕКМНОРСТУХавекмнорстух]{2}|[АВЕКМНОРСТУХавекмнорстух]{2} [0-9]{3}\s?$/)

// add method only licensePlateEnd
addMethodValidator('licensePlateEnd', /^[0-9]{2,3}\s?$/)

// add method only certificate
addMethodValidator('certificate', /^[0-9а-яА-Я]{2} [0-9а-яА-Я]{2} [0-9а-яА-Я]{6}\s?$/)

// add method only receiptNumber
addMethodValidator('receiptNumber', /^[0-9]{20}\s?$/)

// add method only driverLicense
addMethodValidator('driverLicense', /^[0-9а-яА-Я]{2} [0-9а-яА-Я]{2} [0-9а-яА-Я]{6}\s?$/)

// add method only cyryllic
addMethodValidator('cyrillic', /^[а-я\s?-\s?А-Я]*\s?\s?$/)


// add method only fullName
addMethodValidator('fullName', /^[А-ЯЁ][а-яё]{2,}(?:\s+[А-ЯЁ][а-яё]{2,})?(?:\s+[А-ЯЁ][а-яё]{2,})(?:\s+)*\r?$/)

// add method only phone
addMethodValidator('phone', /^.. [(][0-9]{3}[)] [0-9]{3}[-][0-9]{2}[-][0-9]{2}\s?$/)

// add method only confirmNumber
addMethodValidator('confirmNumber', /^[0-9]{4}\s?$/)

// add method only vinNumber
addMethodValidator('vinNumber', /^[0-9a-z]{17}\s?$/)

// add method only carBody
addMethodValidator('carBody', /^[0-9a-zA-Z]{5}-[0-9]{7}\s?$/)

// upperCase all strings

// default license plate
Inputmask({ regex: regexObject.licensePlateDefault }).mask(inputsObj.licensePlate);
Inputmask({ regex: regexObject.licensePlateStartDefault }).mask(inputsObj.licensePlateStart);
Inputmask({ regex: regexObject.licensePlateEnd }).mask(inputsObj.licensePlateEnd);
Inputmask({ regex: regexObject.driverLicense }).mask(inputsObj.driverLicense);
Inputmask({ regex: regexObject.driverLicense }).mask(inputsObj.certificate);
Inputmask({ regex: regexObject.receiptNumber }).mask(inputsObj.receiptNumber);
Inputmask({ regex: regexObject.vinNumber }).mask(inputsObj.vinNumber);
Inputmask({ regex: regexObject.carBody }).mask(inputsObj.carBody);


customInputMask($(inputsObj.licensePlateStart));
customInputMask($(inputsObj.licensePlate));
customInputMask($(inputsObj.driverLicense));
customInputMask($(inputsObj.certificate));

// Popup opener
$('.js-popup').click(function (event) {
	event.preventDefault();
	let popupID = $(this).attr('href');

	if ($.magnificPopup.instance.isOpen) {
		$.magnificPopup.close();
		
		setTimeout(function() {
			mfpPopup(popupID);
		}, 300);

	} else {
		mfpPopup(popupID);
	}
});

$('.js-get-popup-data').click(function (e) {
	e.preventDefault();

	const btn = $(this);
	const base = btn.siblings('.hide-img-block');
	const popupID = btn.attr('href');
	const images = base.find('.hide-img-block__item');
	const src = images.map((i, element) => element.dataset.src);

	const data = {
		img: src
	}
	mfpPopup(popupID, data);
})

// Popup opener
$('.mfp-popup-close').click(function (e) {
	e.preventDefault();
	$.magnificPopup.close();
});

$('.not-found__btn').click(function (e) {
	e.preventDefault();

	progressLoader.reInit();
})

$('.js-popup-close').click(function (e) {
	e.preventDefault();

	$(this).closest('.region-checker').addClass('region-checker--disabled');
});

function letterUpperCase() {
	const arr = Object.values(inputsObj);

	$(arr).each(function (i, el) {
		$(el).on('input', function () {
			let val = $(this).val().toUpperCase();
			$(this).val(val);
		})
	})
}
letterUpperCase();

// Mobile menu toggle
$('.js-menu').click(function () {
	$('.js-menu').toggleClass('is-active');
	$('.mobile-menu').toggleClass('opened');
});

$('.geo__link').click(function (e) {
	e.preventDefault();

	$('.mobile-menu__city-popup').toggle(300)
})

// Phone input mask
$('input[type="tel"]').inputmask({
	mask: '+7 (999) 999-99-99',
	showMaskOnHover: false,
});

$('input[name="confirmNumber"], input[name="promoCode"]').inputmask({
	mask: '9999',
	showMaskOnHover: false,
});

const progressLoader = {
	overlay: $('.btn-search-content__overlay'),
	interval: null,
	init: function (timeout) {
		let number = timeout;
		let progress = 100;
		let stagePercent = progress / number;
		let btn = $('.js-search-btn');
		let overlay = $('.btn-search-content__overlay');
		let content = btn.closest('.tab-content');

		btn.addClass('btn--search');
		content.addClass('tab-content--disable');
		this.interval = setInterval(() => {
			progress -= stagePercent;
			overlay.css('transform', `translate(-${progress}%, 0)`);
			if (number <= 0) {
				number = 0;
				clearInterval(this.interval);
				content.removeClass('tab-content--disable');
				btn.removeClass('btn--search');
				overlay.removeAttr('style');
				return false;
			}
			number--
		}, 1000);
	},
	reInit: function () {
		clearInterval(this.interval);
		this.init(0);
		$('.tab-content__form').find('input:not(input[name="email"])').val('').removeClass('valid');
	}
}

const pageLoader = {
	overlay: $('.page-loader__progress'),
	loaderPercent: $('.page-loader__percent span'),
	images: $('.page-loader__databases'),
	interval: null,
	init: function (timeout) {
		let number = timeout;
		let progress = 100;
		let startPercent = 0;
		let stagePercent = progress / number;
		this.loaderPercent.text(0);

		this.interval = setInterval(() => {
			progress -= Math.ceil(stagePercent);
			startPercent += Math.ceil(stagePercent);

			this.overlay.css('transform', `translate(-${progress}%, 0)`);
			this.loaderPercent.text(startPercent);
			number--;

			if (number <= 0) {
				number = 0;
				this.destroy();
			}
		}, 1000);
	},
	destroy: function () {
		clearInterval(this.interval);
		this.loaderPercent.text(100);
		this.overlay.css('transform', `translate(0, 0)`);
		this.images.removeClass('animate');
	},
	reInit: function () {
		this.destroy();
	}
}

$(window).on('load', function () {
	pageLoader.init(60);
});

// Faq collapse
function collapse(element) {
	$(`${element} .asking-content__title-wrap`).click(function () {
		let faqCurrentBtn = $(this);
		let faqItem = $(`${element} .asking-content__card`); 
		let faqCurrentItem = faqCurrentBtn.closest('.asking-content__card')
		let faqDesc = faqCurrentItem.find('.asking-content__desc');

		faqItem.not(faqCurrentItem).removeClass('show');
		faqCurrentItem.toggleClass('show');
		$(element).find('.asking-content__desc').not(faqDesc).hide(300);
		faqDesc.slideToggle(300);
	});
};
collapse('.asking-content--card');
collapse('.asking-content--mobile');
// Faq collapse
function faqTabCollapse(element) {
	$(`.asking-content--collapse ${element}`).not($(`.asking-content--mobile ${element}`)).click(function () {
		let faqCurrentBtn = $(this);
		let faqItem = $(`.asking-content--collapse .asking-content__card`); 
		let faqCurrentItem = faqCurrentBtn.closest('.asking-content__card')
		let faqDesc = faqCurrentItem.find('.asking-content__toggle-block');
		let id = faqCurrentBtn.closest('.asking-content__card').attr('data-contentId');
		let tabItem = $(`.faq-tabs__item[data-contentId=${id}]`);

		faqItem.not(faqCurrentItem).removeClass('show');
		faqCurrentItem.addClass('show');
		$('.asking-content--collapse ').find('.asking-content__toggle-block').not(faqDesc).hide(300);
		faqDesc.show(300);
		$('.faq-tabs__item').not($(tabItem)).hide(300).removeClass('faq-tabs__item--show');

		tabItem.show(300).addClass('faq-tabs__item--show');
		$('.faq-tabs__item .asking-content__card').removeClass('active');
		$('.asking-nav__item').removeClass('asking-nav__item--active');
	});
};
faqTabCollapse('.asking-content__title-wrap');

function scrollToLeft() {
	const tabNavList = $('.tab-nav__list');
	let item = document.querySelector('.tab-nav .tab--active');

	tabNavList.parent().animate({
		scrollLeft: item.offsetLeft
	}, 500);
}

const tabs = () => {
	const tabLinks = $('a[data-toggle="tab"]');
	const tabContent = $('.js-tab');

	$(tabLinks).click(function (e) {
		e.preventDefault();

		$(this).parent().parent().children().removeClass('tab--active');
		$(this).parent().addClass('tab--active');

		const tabs = tabContent;
		const attr = $(this).attr('href').replace('#', '.');
		const target = $(attr);
		const that = tabs.parent().find(attr);


		target.parent().find(tabContent).find('input').prop('disabled', false);
		target.parent().find(tabContent).not(target).hide().removeClass('tab--active');
		target.parent().find(tabContent).not(target).find('input').prop('disabled', true);
		that.addClass('tab--active').show(500);

		if ($(this).closest('.tab-card').length) {
			scrollToLeft();
		}
		
		if ($('input[name="notification"]').prop('checked')) {
			target.parent().find(tabContent).find('input').prop('disabled', false);
			target.parent().find(tabContent).not(target).find('input').prop('disabled', true);
		}else{
			target.parent().find(tabContent).not(target).find('input').prop('disabled', true);
		}
		return false;
	})
}
// // init tabs
tabs();

//uiScroll scroll bar
function uiScroll(rootCls, scroller) {
	if ($('body').find(rootCls).length > 0) {
		const settings = {
			scroller: scroller,
			bar: '.baron__bar',
			barOnCls: 'baron__scroll-bar',
			scrollingCls: 'baron__bar--scrolling',
			draggingCls: 'baron__bar--dragging',
		}
		const controlsBaronSettings = {
			track: '.baron__track',
			bar: '.baron__bar',
		}
		rootCls.baron(settings).controls(controlsBaronSettings)
		rootCls.baron(settings).update();
		$(window).on('resize', function () {
			rootCls.baron(settings).update();
		})
	}
}

// jQ form styler
function inputStyler(fn) {
	let elements = $('select');
	if (fn !== 'refresh') {
		elements.styler({
			selectSearch: false,
			selectSmartPositioning: false,
			onFormStyled: function(){
				$('.jq-selectbox__dropdown').each(function (i, el) {
					$(el).prepend(`<div class="baron__track"><div class="baron__bar"></div></div>`);
					uiScroll($(el), '.jq-selectbox__dropdown ul');
				})
			}
		});
	} else {
		elements.trigger('refresh');
	}
}
inputStyler();

$('.search-list-popup-wrap').each(function (i, el) {
	uiScroll($(el), '.search-list-popup');
})

if($('.check-main__col--small').length  && window.innerWidth > 768) uiScroll($('.check-main__col--small'), '.check-main__scrolling');
if($('.car-check-single__col--left').length  && window.innerWidth > 992) uiScroll($('.car-check-single__col--left'), '.car-check-single__scrolling');
// if($('.penalty-table__col--right').length  && window.innerWidth > 992) uiScroll($('.penalty-table__col--right'), '.penalty-table__scrolling');

// Smooth scroll 
$('.desc-nav__link, .js-smooth-scroll, .fine-nav__link').click(function (e) {
	e.preventDefault();
	let attr = $(this).attr('href').replace('#', '');
	let el = $(`[data-id="${attr}"]`);
	const headerHeight = 20;
	let isMobile = $('body').width() >= 992;

	$(window).on('resize', function () {
		isMobile = $('body').width() >= 992;
	})

	if ($(this).hasClass('fine-nav__link') && isMobile) {
		if (el.length) {
			$('body, html').animate({
				scrollTop: el.offset().top - headerHeight
			}, 700);
	
			return false;
		}
	}

	if ($(this).hasClass('desc-nav__link') || $(this).hasClass('js-smooth-scroll')) {
		if (el.length) {
			$('body, html').animate({
				scrollTop: el.offset().top - headerHeight
			}, 700);
	
			return false;
	
		}
	}
});

function smoothScroll(element) {
	element.click(function (e) {
		e.preventDefault();
		let el;
		const headerHeight = 10;
		let isMobile = $('body').width() >= 992;

		$(window).on('resize', function () {
			isMobile = $('body').width() >= 992;
		})

		if (isMobile) {
			if ($('.faq').length) {
				el = $(`.faq-tabs--desktop .faq-tabs__item--show .asking-content__card[data-id="${$(this).attr('href').replace('#', '')}"]`);
			}else{
				el = $(`.asking-content__card[data-id="${$(this).attr('href').replace('#', '')}"]`);
			}

			if (el.length) {
				$('body, html').animate({
					scrollTop: el.offset().top - headerHeight
				}, 700);
				return false;
			}
		}
		
	});
}
smoothScroll($('.asking-nav__link'));


function countrySwitcher(element, className) {
	$(element).click(function (e) {
		e.preventDefault();
		const city = $(this).text();
	
		$('.header__geo-link-text, .geo__link-text').text(city).closest('.header__geo-link-wrap').find('.region-checker').addClass('region-checker--disabled');
		$(`.${className}`).removeClass(`${className}--active`);
		$(this).parent().addClass(`${className}--active`);
		$.magnificPopup.close();
	})
}

countrySwitcher('.list__link', 'list__item');
countrySwitcher('.mfp--choose-country-popup .search-list-popup__link', 'search-list-popup__item');
// countrySwitcher('.list__link', 'list__item');

function validateNotification() {
	const currentForm = $('.tab-content__form');
	const notificationCheckbox = currentForm.find('input[name="notification"]');
	const inputs = ['email', 'phone'];

	if(notificationCheckbox.prop('checked')){
		$('.feedback-input__nav').removeClass('disabled');
		for (let i = 0; i < inputs.length; i++) {
			currentForm.find('input[name="'+ inputs[i] +'"]').rules('add', {required: true});
			currentForm.find('input[name="'+ inputs[i] +'"]').prop('disabled', false)
		}
	}else {
		$('.feedback-input__nav').addClass('disabled');
		for (let i = 0; i < inputs.length; i++) {
			currentForm.find('input[name="'+ inputs[i] +'"]').prop('disabled', true)
			currentForm.find('input[name="'+ inputs[i] +'"]').rules('remove');
			currentForm.find('input[name="'+ inputs[i] +'"]').removeClass('error');
		}
	}
}

$('input[name="notification"]').change(validateNotification)

function collapseItemClassSwitcher(card, link, smallCard, activeClass, cardWithActive) {
	let scrollTop = $(window).scrollTop();
	let activeElement;

	$(card).each(function (i, el) {
		let askingContentTopOffset = $(el).offset().top;

		if (scrollTop >= (askingContentTopOffset - 21)){
			$(this).prev().removeClass('active');
			$(this).addClass('active');
		} else{
			$(this).removeClass('active');
		}
	})

	$(cardWithActive).map((i, element) => {
		activeElement = $(element).attr('data-id');
	});


	
	$(link).each(function (i, el) {
		$(el).closest(smallCard).removeClass(activeClass)
		if ($(el).attr('href') === `#${activeElement}`) $(this).closest(smallCard).addClass(activeClass);
	})
}

if(window.innerWidth > 768) {

	$('.fine-card').click(function (e) {
	
		e.preventDefault();
		const thisCard = $(e.target).closest('.fine-card');
		const thislink = thisCard.find('.fine-card__link');
		const card = $(thislink).attr('href').replace('#', '');
		$('body, html').animate({
			scrollTop: $(`.fine[data-id='${card}']`).offset().top
		}, 700);
		return false;
	});
}

if(window.innerWidth < 576) {

	$('.fine-card').click(function (e) {
		e.preventDefault();
		e.stopPropagation();
		const thisCard = $(e.target).closest('.fine-card');
		const thislink = thisCard.find('.fine-card__link-big');
		const href = thislink.attr('href');
		window.location.href = href
	});
}

//fix header
function fixAsking(block, colLeft, colRight, list, active) {

	let scrollTop = $(window).scrollTop();
	let scrollBlock = $(block);
	let askingCol = $(colLeft);
	let askingColTopOffset = askingCol.offset().top - 30;
	const askingColHeight = $(colRight).outerHeight();
	const askingColRightOffset = $(colRight).offset().top;
	const askingNavListHeight = $(list).outerHeight();
	const askingNavListPosition = askingColHeight - askingNavListHeight;
	
	if (scrollTop > askingColTopOffset && askingNavListPosition > 0) {
		scrollBlock.addClass(active);
	} else {
		scrollBlock.removeClass(active);
	}
	// stop list

	if (scrollTop >= (askingColRightOffset + askingColHeight - askingNavListHeight - 20) && askingNavListPosition > 0) {
		scrollBlock.css('position', 'absolute');
		scrollBlock.css('top', askingNavListPosition);
	}else{
		scrollBlock.removeAttr('style')
	}
}

function closedMobileMenu() {
	const scrollTop = $(window).scrollTop();

	if (scrollTop > 100) {
		$('.mobile-menu').removeClass('opened');
		$('.hamburger').removeClass('is-active');
	}
}

function initFixCollapse() {
	// init fixAsking
	if ($('.asking').length) {
		fixAsking(
			'.asking-nav',
			'.asking__col--left',
			'.asking__col--right',
			'.asking-nav__list',
			'asking-nav--scrolled'
			);
			collapseItemClassSwitcher(
				'.asking-content__card',
				'.asking-nav__link',
				'.asking-nav__item',
				'asking-nav__item--active',
				'.asking-content__card.active'
				);
	}

	if ($('.faq').length) {
		fixAsking(
			'.asking-content--collapse',
			'.faq__col--left',
			'.faq__col--right',
			'.asking-content--collapse',
			'asking-nav--scrolled'
			);
			collapseItemClassSwitcher(
				'.faq-tabs__item--show .asking-content__card',
				'.asking-nav__link',
				'.asking-content__card.show .asking-nav__item',
				'asking-nav__item--active',
				'.asking-content__card.active'
			);
	}
	
	
	if ($('.check-main__scrolling').length  && window.innerWidth > 768)  {
		fixAsking(
			'.check-main__scrolling-wrap',
			'.check-main__row',
			'.check-main__col--big',
			'.check-main__scrolling-wrap',
			'check-main__scrolling-wrap--scroll'
			);
			collapseItemClassSwitcher(
			'.check-main__fine',
			'.fine-card__link',
			'.fine-card',
			'fine-card--active',
			'.check-main__fine.active'
			);
	}
	
	if ($('.check-main__alert').length && window.innerWidth > 992) {
		fixAsking(
			'.check-main__alert',
			'.check-main__row',
			'.check-main__col--big',
			'.check-main__alert',
			'alert--scroll'
			);
	}
	
	if ($('.fine-nav').length && window.innerWidth > 992) {
		fixAsking(
			'.car-check-single__scrolling-wrap',
			'.car-check-single__row',
			'.car-check-single__col--right',
			'.car-check-single__scrolling-wrap',
			'car-check-single__scrolling-wrap--scrolled'
		);
		collapseItemClassSwitcher(
			'.fine-table',
			'.fine-nav__link',
			'.fine-nav__item',
			'fine-nav__item--active',
			'.fine-table.active'
		);
	}
	
}

initFixCollapse()
// Scroll functions
$(window).on('scroll', function () {
	initFixCollapse();

	if($('.moving-up').length) {
		movingUp()
	}

	closedMobileMenu();
})

/////////// mfp popup - https://dimsemenov.com/plugins/magnific-popup/
let mfpPopup = function (popupID, data) {
	$.magnificPopup.open({
		items: {
			src: popupID,
		},
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		closeMarkup: '<button type="button" class="mfp-close"><svg class="icon icon--close"><use xlink:href="img/svg-sprite.svg#close"></use></svg></button>',
		mainClass: 'mfp-fade-zoom',
		callbacks: {
			open: function() {
				const popup = $(popupID);

				if (popupID === '#map-popup' && !$('#popup-map').children().length) {
					ymaps.ready(initPopupMap);
				}

				if (popupID === '#slider-popup') {
					let sliderItems = '';
					const slider = popup.find('.slider-popup');

					for (let i = 0; i < data.img.length; i++) {
						sliderItems += `<div class="slider-popup__item"><img src="${data.img[i]}" alt=""></div>`;
					}

					slider.html(sliderItems).owlCarousel(sliderPopupSettings).addClass('owl-carousel').trigger('refresh.owl.carousel');
				}
			},
			close: function () {
				const popup = $(popupID);
				if (popupID === '#slider-popup') {
					const slider = popup.find('.slider-popup');

					slider.trigger('destroy.owl.carousel').removeClass('owl-carousel');
					slider.html('');
				}
			}
		}
	});
};

function hideBlockHandler() {
	$('.link--js').click((e) => {
		e.preventDefault();
		const link = $(e.target);
		const parent = link.closest('.showHide');
		const text = parent.find('.link__text');
		const thisLink = parent.find('.link--js')
		const hideBlock = parent.find('.hide-block');
		hideBlock.slideToggle()
		hideBlock.toggleClass('show')
		thisLink.toggleClass('clicked')
		if(parent.hasClass('showHide--map')) {
			if(hideBlock.hasClass('show')) {
				text.text('Скрыть карту')
			} else {
				text.text('Посмотреть на карте')
	
			}
		}
		if(parent.hasClass('showHide--information')) {
			if(hideBlock.hasClass('show')) {
				text.text('Скрыть реквизиты')
			} else {
				text.text('Показать реквизиты получателя')
	
			}
		}
	});
	$('.link--show-text').click((e) => {
		e.preventDefault()
		const link = $(e.target)
		const parent = link.parents('.fine__group')
		const thisLink = parent.find('.link--show-text')
		const text = parent.find('.link__text')
		const mainText = parent.find('.overflow-text')
		if(mainText.hasClass('show')) {
			text.text('Полное описание штрафа')
		} else {
			text.text('Скрыть полное описание штрафа')

		}
		
		thisLink.toggleClass('clicked')
		mainText.toggleClass('show')
	});

}
hideBlockHandler()

$('.fine-card__icon').click((e) => {
	e.stopPropagation()
})

let startNumber = 25;
const countdown = $('.countdown span');
countdown.text(startNumber);

function countDown() {

	let number = startNumber

	let interval = setInterval(() => {
		if (number <= 0) {
			// countdown.text(0);
			$('.signup-popup__link').removeClass('signup-popup__link--disabled');
			$('.signup-popup__step--second input[name="phone"]').prop('disabled', false).removeClass('input--disabled');
			clearInterval(interval);
		}else{
			$('.signup-popup__link').addClass('signup-popup__link--disabled');
		}
		countdown.text(number--);
	}, 1000);
}

// validate Step
function validateStep(step) {
	let valid = {};
	let inputs = $(step).find('input, select');

	for (let i = 0; i < inputs.length; i++) {
		let input = inputs[i];
		valid[i] = validator.element(input);
	}
	for (let key in valid) {
		if (!valid[key]) {
			return false;
		}
	}
	return true;
}

function signinPopupSteps() {
	const steps = $('.signup-popup__steps');
	steps.owlCarousel({
		loop:false,
		nav: true,
		dots: true,
		// smartSpeed: 1000,
		// animateOut: 'fadeOut',
		navText: [],
		items: 1,
		autoHeight: false,
		mouseDrag: false,
		touchDrag: false,
		pullDrag: false,
		dotsEach: 1,
		// dotsContainer: '.signup-popup__dots',
		onInitialized: function (e) {
			const stepsSlider = $(e.target);

			$('.btn--next').click(function (e) {
				e.preventDefault();
				let currentStep = stepsSlider.find('.owl-item.active');
				
				if (validateStep(currentStep)) {
					stepsSlider.trigger('next.owl.carousel');
				}
			})

			$('.signup-popup__prev-btn').click(function (e) {
				e.preventDefault();
				stepsSlider.trigger('prev.owl.carousel');
			})
			
			$('.btn--submit').click(function (e) {
				e.preventDefault();
				let phoneInput = stepsSlider.find('.signup-popup__step--second input[name="phone"]');

				if (validator.element(phoneInput)) {
					$('input[name="confirmNumber"]').prop('disabled', false).focus();
					phoneInput.prop('disabled', true).addClass('input--disabled');
					countDown();
					$('.countdown').removeClass('disabled');
					$('.signup-popup__next-wrap').show(500).children().prop('disabled', false);
					$('.signup-popup__submit-wrap').hide(500);
				}
			});

			$('.signup-popup__link').click(function (e) {
				e.preventDefault();
				let phoneInput = stepsSlider.find('.signup-popup__step--second input[name="phone"]');

				$(this).addClass('signup-popup__link--disabled');
				phoneInput.prop('disabled', true).addClass('input--disabled');
				$('input[name="confirmNumber"]').focus();
				countDown();
			})

		},
		onTranslate: function (e) {
			let index = e.item.index + 1;
			$('.timeline').attr('data-step', index)
			$('.signup-popup__dots').attr('data-step', index)

			if (index > 1) {
				$('.signup-popup__footer-bottom-content').hide(500);
				$('.signup-popup__title-wrap').hide(500);
				$('.signup-popup__prev-btn-wrap').show(500);
			}else{
				$('.signup-popup__prev-btn-wrap').hide(500);
				$('.signup-popup__title-wrap').show(500);
				$('.signup-popup__footer-bottom-content').show(500);
			}

			if (index === 2) {
				$('.signup-popup__next-wrap').hide(500).children().prop('disabled', true);
				$('.signup-popup__submit-wrap').show(500);
			}else{
				$('.signup-popup__next-wrap').show(500).children().prop('disabled', false);
				$('.signup-popup__submit-wrap').hide(500);
			}

			if (index === 3) {
				$('.signup-popup__nav-wrap').hide(500);
				$('.signup-popup__agreement').show(500);
			}else{
				$('.signup-popup__agreement').hide(500);
				$('.signup-popup__nav-wrap').show(500);
			}
		}
	
	});

}
signinPopupSteps();
const sliderPopup = $('.slider-popup');
const owlArrow = '<svg class="icon icon--bread-crumbs-arrow"><use xlink:href="img/svg-sprite.svg#bread-crumbs-arrow"></use></svg>';
const sliderPopupSettings = {
	loop:true,
	nav: true,
	dots: false,
	items: 1,
	smartSpeed: 1000,
	navText: [owlArrow, owlArrow]
};


function movingUp() {
	const arrowUp = $('.moving-up')
	const arrowUpScroll = arrowUp.offset().top
	if (arrowUpScroll > window.innerHeight * 2) {
		arrowUp.addClass("moving-up--show")
	} else {
		arrowUp.removeClass("moving-up--show")
	}
	
}
if($('.moving-up').length) movingUp()

$('.moving-up').click((e) => {
	e.preventDefault()

	$('body, html').animate({
		scrollTop: 0
	}, 1000);
})

function addFineUi() {
	$('.btn-add').click((e) => {
		const btn = $(e.target).closest('.btn-add')
		const text = $(btn).find('.btn-add__text')

		if(!btn.hasClass('successful')) {
			if($(btn).hasClass('added')) {
				text.text('Добавить к оплате')
			} else {
				text.text('Добавлен к оплате')
			}
			$(btn).toggleClass('added')
		}
	})
}
addFineUi()


function finesToggle() {
	$('.fine-card__link').click((e) => {
		e.preventDefault()
		e.stopPropagation()
		const link = e.target
		const fine = $(link).attr('href')
		const card = $(link).closest('.fine-card')
		const btn = $(fine).find('.btn-add')
		const btnText =	btn.find('.btn-add__text')
		const body = $(fine).find('.fine__body')
		const footer = $(fine).find('.fine__footer')
			

		if($(fine).length) {
			if($(link).hasClass('fine-card__link--active')) {
				$(link).text('Уже оплачен?')
				btnText.text('Добавить к оплате')
			} else {
				btnText.text('Уже оплачен')
				$(link).text('Вернуть к оплате')
			}
			$(link).toggleClass('fine-card__link--active')
			card.toggleClass('fine-card--successful')
			$(fine).toggleClass('fine--succesful')
			btn.toggleClass('successful')
			body.slideToggle()
			footer.slideToggle()
		}
	})
	$('.fine .view__link').click((e) => {
		e.preventDefault()
		const thisLink = e.target
		const fine = $(thisLink).attr('href')
		$('.fine-card__link').each((i, link) => {
			if($(link).attr('href') === fine) {
				$(link).trigger('click')
			}
		})
	})
}
finesToggle();

const tableToggleItems = {
	container				: $('.toggle-container'),
	btn							: $('.js-toggle-items'),
	items						: $('.toggle-container').find('.simple-list__row'),
	showItemsQnty		: $('.toggle-container').attr('data-showItemsQnty'),
	itemsLength			: null,
	hideItemsCount	: null,
	counter: function () {
		this.itemsLength			= this.items.length;
		this.hideItemsCount		= this.itemsLength - this.showItemsQnty;
		this.btn.find('.light-blue-btn__qnty').text(`(${this.hideItemsCount})`);

		for (let i = this.showItemsQnty; i < this.items.length; i++) {
			this.items.eq(i).hide();
		}
	},

	toggle: function () {
		for (let i = this.showItemsQnty; i < this.items.length; i++) {
			this.items.eq(i).fadeToggle(300);
		}
	}
}
tableToggleItems.counter();

$('.js-toggle-items').click(function (e) {
	e.preventDefault();
	tableToggleItems.toggle();
	if ($(this).hasClass('show')) {
		$(this).find('.light-blue-btn__text').text('Показать остальные позиции')
	} else {
		$(this).find('.light-blue-btn__text').text('Скрыть позиции')
	}
	$(this).toggleClass('show');
})


$('.js-toggle').click(function (e) {
	e.preventDefault();

	const thisElement = $(this).parent().siblings('.toggle-block');
	const hideText = $(this).attr('data-hide-text');
	const showText = $(this).attr('data-show-text');
	const btn = $(this).closest('.toggle-parent').find('.js-toggle');

	$(this).parent().parent().parent().find('.toggle-block').not(thisElement).hide(300);
	thisElement.toggle(300);
	btn.not($(this)).removeClass('show');
	$(this).toggleClass('show');
	btn.not($(this)).find('.light-blue-btn__text').text(showText)

	if ($(this).hasClass('show')) {
		$(this).find('.light-blue-btn__text').text(hideText)
	} else {
		$(this).find('.light-blue-btn__text').text(showText)
	}
})

function fineNavMobileCollapse() {
	$('.fine-nav__link').click(function (e) {
		e.preventDefault();
	
		const thisElement = $(this).siblings('.fine-nav__toggle-block');
	
		$('.fine-nav__item').not($(this).parent()).removeClass('fine-nav__item--active');
		$(this).parent().toggleClass('fine-nav__item--active');
		$('.fine-nav__toggle-block').not(thisElement).hide(300);
		thisElement.toggle(300);
	})
}


$('.select--number').click(e => e.preventDefault());


function reverse() {
	const list = $('.fine-table-list--mobile-left-col');
	const listItems = list.find('.fine-table-list__row');

	list.each(function (index, el) {

		if ($(el).find(listItems).length % 2) {
			$(el).parent().siblings().find('.fine-table-list').addClass('fine-table-list--reverse')
		}
	})

}
reverse();

function carsGalleryMobileSlider() {
	setTimeout(() => {
		$('.cars-gallery__row').owlCarousel(carsSliderSettings).addClass('owl-carousel').trigger('refresh.owl.carousel');
		$('.announcement__images').owlCarousel(carsSliderSettings).addClass('owl-carousel').trigger('refresh.owl.carousel');
	}, 300);
}

const carsSliderSettings = {
	loop: true,
	nav: true,
	dots: false,
	items: 2,
	margin: 15,
	smartSpeed: 1000,
	navText: [owlArrow, owlArrow],
	responsiveClass:true,
	responsive:{
			0:{
					items:1,
					margin: 0
				},
				767:{
					items:2,
					margin: 15
			},
	}
};

function simpleListResponsive() {
	const listBoxLeftCol = $('.list-box-header__col:first-child').find('.list-box-header__title');
	const listBoxRIghtCol = $('.list-box-header__col:last-child').find('.list-box-header__title');
	$('.simple-list__col:first-child').prepend(listBoxLeftCol);
	$('.simple-list__col:last-child').prepend(listBoxRIghtCol);
}

function tableMenuMobileSmothScroll() {
	const item = $('.fine-nav__link').parent();
	let offsetTopNotUpdateArray = [];

	item.each(function (index, el) {
		offsetTopNotUpdateArray.push($(el).offset().top);
	})

	$('.fine-nav__link').click(function (e) {
		e.preventDefault();
		const index = $(this).parent().index();

		if ($(this).length) {
			$('body, html').animate({
				scrollTop: offsetTopNotUpdateArray[index]
			}, 700);
			return false;
		}
	})
}

$('.popular-penalty-icons__link').click(function (e) {
	e.preventDefault();

	$('.popular-penalty-icons__item').removeClass('popular-penalty-icons__item--active')
	$(this).parent().addClass('popular-penalty-icons__item--active');
})

$(window).on('scroll', function () {
	// scrollUpdate();
})
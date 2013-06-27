// Scripts for markup testing

// Clicking on content links does not scroll the page to top
// Click on navigation to switch between pages
$('.content a').on('click', function (e) {
    e.preventDefault();
});

// jQuery Datepicker
$('.date').datepicker();

// Mimic select behaviour for dropdowns
$('.dropdown-select').on('click', function (e) {
    e.preventDefault();
    $(this).children('ul').toggle();
})

// Replace dashed links with inputs
// Click on 'Заезд'/'Отъезд'
$('@show-input').on('click', function (e) {
    $(this).hide();
    $(this).next().show();
});

// Click on '3 номера'
$('@toggle-rooms').on('click', function (e) {
    $('@rooms').toggle();
});

// Click on 'Показать фильтры'
$('@toggle-filters').on('click', function (e) {
    $('@filters').toggle();
});



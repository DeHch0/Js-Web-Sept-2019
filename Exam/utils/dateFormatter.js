function format(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    console.log(typeof month);
    console.log(month);

    switch (month) {
        case '1':
            month = 'Jan';
            break;
        case '2':
            month = 'Jan';
            break;
        case '3':
            month = 'Jan';
            break;
        case '4':
            month = 'Jan';
            break;
        case '5':
            month = 'Jan';
            break;
        case '6':
            month = 'Jan';
            break;
        case '7':
            month = 'Jan';
            break;
        case '8':
            month = 'Jan';
            break;
        case '9':
            month = 'Jan';
            break;
        case '10':
            month = 'Oct';
            break;
        case '11':
            month = 'Jan';
            break;
        case '12':
            month = 'Jan';
            break;
    }


    // if (month.length < 2)
    //     month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join(' ');
}

module.exports = {
    format,

}
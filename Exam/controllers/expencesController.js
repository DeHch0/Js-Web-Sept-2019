const models = require('../models');
const { dateFormatter } = require('../utils/');

function getExpences(req, res) {
    res.render('create', { layout: 'create' })
}

function postExpences(req, res) {
    const { merchant, total, category, description } = req.body;

    let report = req.body.report === 'on' ? true : false;

    let date = dateFormatter.format(new Date());

    console.log(date);

    let creator = req.user._id;

    models.exprencesSchema.create({ merchant, total, description, category, report, date, creator }).then(e => {
        models.userSchema.findByIdAndUpdate(creator, { $push: { expences: e._id } }).then(data => {
            console.log('successfully')
        }).catch(e => {
            console.log('error due post exprence' + e);
        })
        console.log('expence successfully creared !')
        res.redirect('/');
    }).catch(e => {
        console.log('Errod due expence create !' + e);
        res.redirect('/create/expence');
    })
}

function postReffil(req, res) {
    let { refill } = req.body;

    let total = +refill + +req.user.amount;

    let id = req.user._id;

    console.log(id);


    models.userSchema.findByIdAndUpdate({ _id: req.user._id }, { amount: total }).then(data => {
        res.redirect('/')
    }).catch(e => {
        res.redirect('/')
        console.log('error due refill')
    })

}

function getReport(req, res) {
    let { id } = req.params;

    models.exprencesSchema.findById(id).then(data => {
        console.log(data)

        res.render('report', { layout: 'report', data });

    }).catch(e => {
        console.log('error due getreport !******' + e)
    })


    console.log(id);
}


function getRemove(req, res) {
    const { id } = req.params;

    models.exprencesSchema.findByIdAndRemove(id).populate('creator').then(res.redirect('/')).then((data) => {
            let currAmount = +req.user.amount - +data.total;
            let userId = req.user._id;

            models.userSchema.findByIdAndUpdate({ userId }, { 'amount': currAmount })
        })
        .catch(e => {
            res.redirect(`report/${id}`)
        })
}

module.exports = {
    getExpences,
    postExpences,
    postReffil,
    getReport,
    getRemove
}
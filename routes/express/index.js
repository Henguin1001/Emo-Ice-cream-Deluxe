module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('home',{
			title:"Emo Ice Cream Deluxe"
		});
	});
	app.get('/play', function(req, res) {
		res.render('play',{
			title:"play"
		})
	});

};
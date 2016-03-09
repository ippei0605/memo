/**
 * Memoアプリのルーティング
 *
 * @module routes/index
 * @author Ippei SUZUKI
 */

// モジュールを読込む。
var memo = require('../models/memo');

// package.json を読込む。(version、description の値をメモ一覧で使用するため)
var packageJson = require('../package.json');

/** メモ一覧を表示する。 */
exports.list = function(req, res) {
	memo.list(function(err, list) {
		res.render('index', {
			"packageJson" : packageJson,
			"list" : list
		});
	});
};

/** メモの新規作成ダイアログを表示する。 */
exports.createDialog = function(req, res) {
	res.render('dialog', {
		"doc" : null
	});
};

/** メモの更新ダイアログを表示する。 */
exports.updateDialog = function(req, res) {
	var _id = req.params._id;
	memo.get(_id, function(err, doc) {
		res.render('dialog', {
			"doc" : doc
		});
	});
};

/** メモをDBに新規作成して、メモ一覧を表示する。 */
exports.create = function(req, res) {
	var doc = {
		"content" : req.body.content,
		"updatedAt" : req.body.updatedAt
	};
	memo.save(doc, function() {
		res.redirect('/');
	});
};

/** メモをDBに更新して、メモ一覧を表示する。 */
exports.update = function(req, res) {
	var doc = {
		"_id" : req.params._id,
		"_rev" : req.params._rev,
		"content" : req.body.content,
		"updatedAt" : req.body.updatedAt
	};
	memo.save(doc, function() {
		res.redirect('/');
	});
};

/** メモをDBから削除して、メモ一覧を表示する。 */
exports.remove = function(req, res) {
	memo.remove(req.params._id, req.params._rev, function() {
		res.redirect('/');
	});
};


function DBHandler(aOption)
{
	var self = this;
	
	this.databaseOption = aOption;
	this.database = null;
	this.name = 'DBHandler';
	
	DBHandler.prototype.connectDB = function(){	
		try{
			self.database = openDatabase(
					self.databaseOption.fileName,
					self.databaseOption.version,
					self.databaseOption.displayName,
					self.databaseOption.maxSize
			);
		}
		catch(e){
			
		}
	};
	DBHandler.prototype.nullDataHandler = function(transaction, resultSet) {
		console.info('nullDataHandler');
	};
	
	DBHandler.prototype.AccountNullErrorHandler = function(transaction, resultSet){
		console.info('nullErrorHandler');
	};
	
	
	DBHandler.prototype.openSQL = function(aSql,dataHandler,errorHandler){		
		self.database.transaction(
			function (transaction){
				transaction.executeSql(aSql,[],dataHandler,errorHandler);
			}
		);
	};
	DBHandler.prototype.accSQL = function(aSql,dataHandler,errorHandler){			
		self.database.transaction(
			function (transaction){
				transaction.executeSql(aSql,[],dataHandler,dataHandler);
			}
		);
	};
	
	DBHandler.prototype.execSQLCommand = function(aSql, onSuccess, onFailure){		
		self.database.transaction(
			function(transaction){
				transaction.executeSql(aSql, [], onSuccess, onFailure);
			}
		);
	};
	
	DBHandler.prototype.execSQL = function(aSql) {
		self.execSQLCommand(aSql, self.nullDataHandler, self.nullErrorHandler);
	};

	
	DBHandler.prototype.dropTable = function(table_name) {		
		var sql1 = 'DROP TABLE '+table_name;		
		self.execSQL(sql1,self.nullDataHandler,self.nullErrorHandler);
	};
	
	DBHandler.prototype.createFriendsTable = function() {
		try{
			var sSql = 'CREATE TABLE IF NOT EXISTS friends'+
				'(user_id INTEGER NOT NULL PRIMARY KEY, '+
				' user_name TEXT, '+
				' user_phone TEXT, '+
				' user_address TEXT, '+
				' user_mail TEXT, '+
				' user_birth TEXT, '+
				' recommendation_count INTEGER DEFAULT "0", '+
				' contact_count INTEGER DEFAULT "0", '+
				' etc TEXT DEFAULT "");';
			self.execSQL(sSql);
		}
		catch(err){
			console.info('DBHandler.prototype.createFriendsTable = '+err.message)
		}
	}
	
	DBHandler.prototype.createSettingTable = function() {
		try{
			var sSql = 'CREATE TABLE IF NOT EXISTS setting'+
				'(setting_id INTEGER NOT NULL PRIMARY KEY, '+
				' user_id TEXT DEFAULT "0", '+
				' code TEXT DEFAULT "'+Constants.Boolean.False+'", '+
				' write TEXT DEFAULT "'+Constants.Boolean.False+'");';				
			self.execSQL(sSql);
		}
		catch(err){
			console.info('DBHandler.prototype.createFriendsTable = '+err.message)
		}
	}
	
	DBHandler.prototype.createRecommendTable = function() {
		try{
			var sSql = 'CREATE TABLE IF NOT EXISTS recommend'+
				'(recommend_id INTEGER NOT NULL PRIMARY KEY, '+
				' user_id INTEGER DEFAULT "0", '+				
				' date TEXT DEFAULT "'+Constants.False+'");';				
			self.execSQL(sSql);
		}
		catch(err){
			console.info('DBHandler.prototype.createFriendsTable = '+err.message)
		}
	}
	
}
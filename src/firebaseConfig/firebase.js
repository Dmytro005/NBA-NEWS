import * as firebase from 'firebase';

// Initialize Firebase
const config = {
	apiKey: 'AIzaSyBTLM9bKXRY29vOnKAlzGusvMtpKM8s9hE',
	authDomain: 'nba-news-97a2b.firebaseapp.com',
	databaseURL: 'https://nba-news-97a2b.firebaseio.com',
	projectId: 'nba-news-97a2b',
	storageBucket: 'nba-news-97a2b.appspot.com',
	messagingSenderId: '665061893459'
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();

const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = snapshot => {
	const news = [];
	snapshot.forEach(childSnapshot => {
		news.push({
			...childSnapshot.val(),
			id: childSnapshot.key
		});
	});
	return news;
};

export { firebaseArticles, firebaseTeams, firebaseVideos, firebaseLooper };

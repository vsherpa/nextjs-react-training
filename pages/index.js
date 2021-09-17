import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';

const HomePage = (props) => {

	return (
			<Fragment>
				<Head>
					<title>React Meetups</title>
					<meta name='description' content='Cool Meetups'/>
				</Head>
				<MeetupList meetups={props.meetups}/>
			</Fragment>
	);
}

export async function getStaticProps() {
	//fetch data from api
	const client = await MongoClient.connect('mongodb+srv://vsherpa:Darjeel1ng@clustergcloud1.yc0gj.mongodb.net/meetups?retryWrites=true&w=majority');
	const db = client.db();
	const meetupCollection = db.collection('meetups');
	const meetups = await meetupCollection.find().toArray();
	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
						title: meetup.title,
						address: meetup.address,
						image: meetup.image,
						id: meetup._id.toString()
					}
			))
		},
		revalidate: 1
	}
}

export default HomePage;
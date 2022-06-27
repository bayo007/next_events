import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;
    //this function could haver just been done on the eventsearch component too
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);  //[pushes the router to the events/year/month path
  }
//year===selectedYear and month ===selectedMonth that is being passed from the eventsearch.js file
  return (
    <Fragment>
      <Head>
        <title>All my events</title>
      </Head>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

// if events was not destructured
// <EventList items={props.events}/>

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60
  };
}

export default AllEventsPage;

//the onSubmit function of the eventsearch isa function that has an onsearch function in it as a property that also runs the findEventsHandler function

//when the year and month is selected and the form is clicked , it pushes the router to the /events/year/month...the year here is the selectedYear and the month is the SelectedMonth

//line 20  is not executed there but it is pointed out to and then later executefd when the form is being submitted
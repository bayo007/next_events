import { connectDatabase, insertDocument } from '../../helpers/db-util';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;  //line 15 of ../component/input/newsletter-registration

    if (!userEmail || !userEmail.includes('@')) { //if it does not include @
      res.status(422).json({ message: 'Invalid email address.' }); //return the status code of 422 with the message being this
      return;
    }

    let client;

    try {
      client = await connectDatabase(); //it will run thsi
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail }); //insert this object to the newsletter collection { email: userEmail }
      client.close(); //disconect the client,//it will run thsi
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }

    res.status(201).json({ message: 'Signed up!' }); //it will run thsi
  }
}

export default handler;

//this api is for newsletter registration

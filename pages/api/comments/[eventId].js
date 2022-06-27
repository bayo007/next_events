//this is only for comment.js section
import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '../../../helpers/db-util';

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') { //line 27 of components/input/comments....and this is gotten from line 31 of component/input/new-comment
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      client.close();
      return;
    }
//if all of this  is bypassed the newcomment includes all this properties
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;
//the new comment is then added to the comments collection and it is stored as comment key
    try { //THE _ID IS FROM THE DATABASE OF MONGODB
      result = await insertDocument(client, 'comments', newComment);  //line 11 of db-utils, add new comment to the comments collection
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Added comment.', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed!' });
    }
  }

  if (req.method === 'GET') {//this is for line 13 - 19 of comments and it does all this, the latest comment is displayed first though
    try {// get all the comments and store ina doccumnent and make that document a json data
      const documents = await getAllDocuments(client, 'comments', { _id: -1 }); //-1 os descending order, line 19 of db-utils
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed.' });
    }
  }

  client.close();
}

export default handler;
//this is only for comment.js section
//NB fetching API is a get method

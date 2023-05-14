import { NextApiHandler } from 'next';

const extractPdfTextHandler: NextApiHandler = async (req, res) => {
  console.log("req.body?.file : ", req.body?.file);
  const file = req.body;
  console.log('file on the backend : ', file);
  
  const response = await fetch('https://warpspeedapi.herokuapp.com/processPDF', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: JSON.stringify({
      file: file,
    }),
  }).catch((error) => {
    console.error('Error:', error);
  });
  console.log("response : ", response);

  if (!file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  res.status(200).json({ plainText: response });
};

export default extractPdfTextHandler;
